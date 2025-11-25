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
            return res.status(404).json({ data: "No seats found for this venue" });
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

    if(!id || !seatId){
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


//리뷰작성
export const writeSeatReview = async(req,res,next)=>{
    const userId = req.user?.id;
    const showId = Number(req.params.id);
    const seatId = Number(req.params.seatId);
    const {rating, comment} = req.body;

    if (!userId || isNaN(showId) || isNaN(seatId)) {
        return next(new HttpError(400, "Invalid show or seat ID."));
    }

    if (!rating && !comment) {
        return next(new HttpError(400, "Review contents required."));
    }

    try{
        const [rows] = await pool.query("SELECT venue_id FROM seats WHERE id = ?",[seatId]);

        const venueId = rows[0].venue_id;

        await pool.query("INSERT INTO reviews (user_id,show_id,venue_id,seat_id,rating,content) VALUES (?,?,?,?,?,?)"
            ,[userId,showId,venueId,seatId,rating,comment]
        );

        return res.status(201).json({message : "Review created."});
    }catch(err){
        next(new HttpError(500,"Internal Server Error"));
    }
}


//리뷰업데이트
export const updateSeatReview = async(req,res,next)=>{
    const reviewId = Number(req.params.id);
    const userId = req.user?.id;
    const { rating, comment } = req.body;

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

        // 수정
        await pool.query(
            `
            UPDATE reviews
            SET rating = ?, content = ?, updated_at = NOW()
            WHERE id = ?
            `,
            [rating, comment, reviewId]
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

//리뷰 좋아요 증가
// export const addReviewLike = async(req,res,next)=>{
    
// }