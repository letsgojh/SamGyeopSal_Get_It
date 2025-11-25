import pool from '../config/db.js'
import HttpError from '../error/httpError.js';


//전체 쇼 조회
export const showAllShows = async (req,res,next)=>{
    try{
        const [rows] = await pool.query("SELECT * FROM shows");
        res.status(200).json({data : rows});
    }catch(err){
        console.log("Error : ", err);
        next(new HttpError(500,"Internal Error"));
    }
}


//특정 쇼 상세 조회
export const showDetailshow = async (req,res,next)=>{
    
    const id = req.params.id;

    try{
        const [rows] = await pool.query("SELECT * FROM shows WHERE id = ?",[id]);
        
        
        if(rows.length === 0){
            return next(new HttpError(404,"해당 공연을 찾을 수 없습니다."));
        }
        res.status(200).json({data : rows});
    }catch(err){
        next(new HttpError(500,"Internal Error"));
    }
}

//카테고리별 쇼 조회
export const checkCategoricalShow = async(req,res,next)=>{
        const category = req.query.category; // 예: /shows/category/musical

    try {
        const [rows] = await pool.query(
            "SELECT * FROM shows WHERE category = ?",
            [category]
        );

        res.status(200).json({ data: rows });
    } catch (err) {
        next(new HttpError(500, "Internal Error"));
    }
}

//추천 쇼
export const showRecommendShow = async(req,res,next)=>{
    const limit = req.query.limit || 5; // 기본값 5개 추천

    try {
        const [rows] = await pool.query(
            "SELECT * FROM shows ORDER BY rating DESC LIMIT ?",
            [Number(limit)]
        );

        res.status(200).json({ data: rows });
    } catch (err) {
        next(new HttpError(500, "Internal Error"));
    }
}


//공연 검색
export const searchShow = async(req,res,next)=>{
    const keyword = req.query.keyword;

    if (!keyword) {
        return next(new HttpError(400, "검색어(keyword)를 입력해주세요."));
    }

    try {
        const [rows] = await pool.query(
            "SELECT * FROM shows WHERE title LIKE ?",
            [`%${keyword}%`]
        );

        res.status(200).json({ data: rows });
    } catch (err) {
        next(new HttpError(500, "Internal Error"));
    }
}
