import pool from '../config/db.js'
import HttpError from '../error/httpError.js';

//공연별 좌석 목록
export const showSeatByShow = async(req,res,next) => {
    const id = Number(req.params.id);

    if(isNaN(id)){
      return res.status(404).json({data : "There is no content"});
    }

    try{
        const [rows] = await pool.execute("SELECT * FROM seats WHERE venue_id = ?",[id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ data: "No reviews found for this seat" });
        }
        
        res.status(200).json({data : rows});
    }catch(err){
        next(new HttpError(500,"Internal Error"));
    }
}

//좌석별 리뷰 목록
export const showReviewBySeat = async(req,res,next)=>{
    const showId = Number(req.params.id);
    const seatId = Number(req.params.seatId);

    if(!showId || !seatId){
      return res.status(404).json({data : "There is no content"});
    }

    try{
        const [rows] = await pool.execute("SELECT * FROM reviews WHERE show_id = ? and seat_id  = ?",[showId,seatId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ data: "No seats found for this venue" });
        }

        res.status(200).json({data : rows});
    }catch(err){
        next(new HttpError(500,"Internal Error"));
    }
}


// ✅ [수정됨] 리뷰작성
export const writeSeatReview = async(req,res,next)=>{
    const userId = req.user?.id;
    const showId = Number(req.params.id);
    const seatId = Number(req.params.seatId);
    
    // 🚨 기존 코드: const {rating, comment} = req.body; 
    // 👉 수정 코드: 프론트엔드가 'content'로 보내므로 'content'로 받아야 합니다.
    const { rating, content } = req.body; 

    if (!userId || isNaN(showId) || isNaN(seatId)) {
        return next(new HttpError(400, "Invalid show or seat ID."));
    }

    // comment -> content 로 변경
    if (!rating && !content) {
        return next(new HttpError(400, "Review contents required."));
    }

    try{
        const [rows] = await pool.query("SELECT venue_id FROM seats WHERE id = ?",[seatId]);

        const venueId = rows[0].venue_id;

        // DB 쿼리 파라미터도 comment -> content 로 변경
        await pool.query("INSERT INTO reviews (user_id,show_id,venue_id,seat_id,rating,content) VALUES (?,?,?,?,?,?)"
            ,[userId,showId,venueId,seatId,rating,content]
        );

        return res.status(201).json({message : "Review created."});
    }catch(err){
        next(new HttpError(500,"Internal Server Error"));
    }
}


// ✅ [수정됨] 리뷰업데이트
export const updateSeatReview = async(req,res,next)=>{
    const reviewId = Number(req.params.id);
    const userId = req.user?.id;
    
    // 🚨 여기도 comment -> content 로 수정
    const { rating, content } = req.body;

    if (isNaN(reviewId)) {
        return next(new HttpError(400, "Invalid review ID."));
    }

    try {
        // 해당 리뷰 존재 및 작성자 확인
        const [rows] = await pool.query(
            "SELECT user_id FROM reviews WHERE id = ?",
            [reviewId]
        );

        if (rows.length === 0) {
            return next(new HttpError(404, "Review not found."));
        }

        if (rows[0].user_id !== userId) {
            return next(new HttpError(403, "You cannot edit this review."));
        }

        // 수정 쿼리 파라미터도 comment -> content 로 변경
        await pool.query(
            `
            UPDATE reviews
            SET rating = ?, content = ?, updated_at = NOW()
            WHERE id = ?
            `,
            [rating, content, reviewId]
        );

        return res.status(200).json({ message: "Review updated successfully." });

    } catch (err) {
        next(new HttpError(500, "Internal Server Error"));
    }
}

//리뷰 삭제
export const deleteSeatReview = async(req,res,next)=>{
    const reviewId = Number(req.params.id);
    const userId = req.user?.id;

    if (isNaN(reviewId)) {
        return next(new HttpError(400, "Invalid review ID."));
    }

    try {
        // 리뷰 존재 여부 및 작성자 확인
        const [rows] = await pool.query(
            "SELECT user_id FROM reviews WHERE id = ?",
            [reviewId]
        );

        if (rows.length === 0) {
            return next(new HttpError(404, "Review not found."));
        }

        if (rows[0].user_id !== userId) {
            return next(new HttpError(403, "You cannot delete this review."));
        }

        // 삭제
        await pool.query("DELETE FROM reviews WHERE id = ?", [reviewId]);

        return res.status(200).json({ message: "Review deleted successfully." });

    } catch (err) {
        next(new HttpError(500, "Internal Server Error"));
    }
}