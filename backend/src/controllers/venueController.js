import pool from '../config/db.js'
import HttpError from '../error/httpError.js';

//전체 공연장 리스트 조회
export const showVenuesList = async(req,res,next)=>{
    try{
        const [rows] = await pool.execute("SELECT * FROM venues");
        res.status(200).json({data : rows});
    }catch(err){
        next(new HttpError(500,"Invalid Server Error"));
    }
}

//공연장 상세 조회
export const showDetailVenue = async(req,res,next)=>{
    const id = Number(req.params.id);

    if(isNaN(id)){
        return next(new HttpError(404,"There is no contents"));
    }

    try{
        const [rows] = await pool.execute("SELECT * FROM venues WHERE id = ? ", [id]);
        
        if(rows.length === 0){
            return next(new HttpError(404,"There is no contents"))
        }
        res.status(200).json({data : rows});
    }catch(err){
        next(new HttpError(500,"Invalid Server Error"));
    }
}


//공연이 열리는 공연장 정보 조회
export const showVenuebyshow = async(req,res,next)=>{
    const showId = Number(req.params.id);

    if(isNaN(showId)){
        return next(new HttpError(404,"There is no contents"));
    }

    try{
        //N:1에서 1을 참조할때는 대부분 join 사용, N을 참조할경우는 WHERE절만 사용해도 OK
        
        const [rows] = await pool.execute(
            `SELECT v.*
            FROM venues v
            JOIN shows s ON s.venue_id = v.id
            WHERE s.id = ?`
            , [showId]
        );

        if(rows.length === 0){
            return next(new HttpError(404, "No Value found for this show"));
        }
        res.status(200).json({data : rows[0]});

    }catch(err){
        next(new HttpError(500,"Invalid Server Error"));
    }

}
// 공연장 평점 및 리뷰 개수 통계
export const getVenueStats = async (req, res, next) => {
    const venueId = Number(req.params.id);

    if (isNaN(venueId)) {
        return next(new HttpError(400, "Invalid venue ID"));
    }

    try {
        // reviews 테이블에서 venue_id가 일치하는 모든 항목의 개수와 평점 평균 계산
        const sql = `
            SELECT 
                COUNT(*) as reviewCount, 
                IFNULL(AVG(rating), 0) as averageRating 
            FROM reviews 
            WHERE venue_id = ?
        `;
        
        const [rows] = await pool.execute(sql, [venueId]);
        
        // 결과 반환 (배열의 첫 번째 요소)
        res.status(200).json({ data: rows[0] });

    } catch (err) {
        next(new HttpError(500, "Internal Server Error"));
    }
};