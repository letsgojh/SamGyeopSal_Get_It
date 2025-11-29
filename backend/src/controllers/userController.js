import pool from '../config/db.js';
import HttpError from '../error/httpError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 회원가입
export const signup = async (req,res,next)=>{
    const {name,email,password} = req.body;
    if (!name || !email || !password) return next(new HttpError(400, "필수 항목 누락"));
    try{
        const [existing] = await pool.query("SELECT email FROM users WHERE email = ?",[email]);
        if(existing.length > 0) return next(new HttpError(409, "이미 존재하는 이메일"));
        const hashedPassword = await bcrypt.hash(password,10);
        const [result] = await pool.query("INSERT INTO users (name,email,password) values (?,?,?)", [name,email,hashedPassword]);
        res.status(201).json({message: "가입 성공", user_id : result.insertId});
    }catch(err){ next(new HttpError(500,"Server Error")); }
}

// 로그인
export const login = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password) return next(new HttpError(400, "입력 누락"));
    try{
        const [rows] = await pool.execute("SELECT id, name, email, password FROM users WHERE email = ?", [email]);
        if(rows.length === 0) return next(new HttpError(401,"이메일 불일치"));
        const user = rows[0];
        // 비밀번호 확인 (평문/해시 모두 호환)
        const isMatch = await bcrypt.compare(password, user.password).catch(()=>false);
        if(password !== user.password && !isMatch) return next(new HttpError(401,"비번 불일치"));
        
        const token = jwt.sign({ id : user.id, email : user.email }, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({ message: "로그인 성공", token, user: { id: user.id, name: user.name, email: user.email } });
    }catch(err){ next(new HttpError(500,"Server Error")); }
}

// 내 정보 조회
export const getMe = async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return next(new HttpError(401, "로그인 필요"));
    try {
        const [rows] = await pool.query("SELECT id, name, email FROM users WHERE id = ?", [userId]);
        if (rows.length === 0) return next(new HttpError(404, "유저 없음"));
        res.status(200).json({ message: "성공", user: rows[0] });
    } catch (err) { next(new HttpError(500, "Server Error")); }
};

// ✅ [1] 찜 추가 (테이블명: favorites)
export const addFavoriteShow = async (req, res, next) => {
    const userId = req.user?.id;
    const showId = Number(req.params.showId);
    if (!userId || isNaN(showId)) return next(new HttpError(400, "데이터 오류"));

    try {
        const [existing] = await pool.query("SELECT id FROM favorites WHERE user_id = ? AND show_id = ?", [userId, showId]);
        if (existing.length > 0) return res.status(200).json({ message: "이미 찜함" });

        await pool.query("INSERT INTO favorites (user_id, show_id) VALUES (?, ?)", [userId, showId]);
        res.status(201).json({ message: "찜 추가 완료" });
    } catch (err) {
        console.error(err);
        next(new HttpError(500, "테이블 이름(favorites)을 확인하세요."));
    }
};

// ✅ [2] 찜 목록 조회 (테이블명: favorites)
export const seeUserFavoriteShows = async(req,res,next) =>{
    const userId = req.user?.id;
    if (!userId) return next(new HttpError(401, "로그인 필요"));
    try {
        const [rows] = await pool.query(
            `SELECT s.* FROM shows s JOIN favorites f ON f.show_id = s.id WHERE f.user_id = ?`,
            [userId]
        );
        res.status(200).json({ data: rows });
    } catch (err) {
        console.error(err);
        next(new HttpError(500, "테이블 이름(favorites)을 확인하세요."));
    }
}

// ✅ [3] 찜 삭제 (테이블명: favorites)
export const deleteUserFavoriteShows = async(req,res,next) =>{
    const userId = req.user?.id;
    const showId = Number(req.params.showId); 
    if (!userId || isNaN(showId)) return next(new HttpError(400, "데이터 오류"));
    try {
        await pool.query("DELETE FROM favorites WHERE user_id = ? AND show_id = ?", [userId, showId]);
        res.status(200).json({ message: "찜 삭제 성공" });
    } catch (err) { next(new HttpError(500, "Server Error")); }
}