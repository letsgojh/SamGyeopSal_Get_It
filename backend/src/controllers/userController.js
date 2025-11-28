import pool from '../config/db.js';
import HttpError from '../error/httpError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//회원가입
export const signup = async (req, res, next) => {
    console.log(req.body);
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
        return next(new HttpError(400, "이름, 이메일, 비밀번호는 필수 항목입니다."));
    }

    try {
        //유효성 검사
        const [existingUsers] = await pool.query("SELECT email FROM users WHERE email = ?", [email]);
        if (existingUsers.length > 0) {
            return next(new HttpError(409, "이미 존재하는 이메일입니다."));
        }

        //비밀번호 해시(10번이 기본)
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            "INSERT INTO users (name,email,password) values (?,?,?)",
            [name, email, hashedPassword]);

        res.status(201).json({
            message: "회원가입이 성공적으로 완료되었습니다.",
            user_id: result.insertId
        });
    } catch (err) {
        console.error("signup error: ", err);
        next(new HttpError(500, "Internel Server Error"));
    }
}

//로그인
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("email : ", email);
    console.log("password : ", password);


    if (!email || !password) {
        return next(new HttpError(400, "이메일과 비밀번호를 입력해주세요."));
    }

    try {
        //id 비교
        const [rows] = await pool.execute("SELECT id,email, password FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return next(new HttpError(401, "이메일이 일치하지 않습니다."));
        }

        const user = rows[0]; //첫번째 index data 값 가져오기 ex) {email : .. , psasword_hash : ...}


        /* isMatch : 회원가입 기능 만들경우, 윗 줄 주석을 풀고, 아랫 줄 삭제 */
        //const isMatch = await bcrypt.compare(password,user.password);
        const isMatch = (password === user.password); // 👈 임시 수정!


        if (!isMatch) {
            return next(new HttpError(401, "비밀번호가 일치하지 않습니다."));
        }


        //토큰 발급 -> auth.js에서 decode하여 req.user로 사용가능. 어떤 값을 보낼지
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } //토큰 유효시간 1시간
        )

        res.json({
            message: "로그인 성공",
            user_id: user.id,
            token
        });

    } catch (err) {
        console.error("login error: ", err);
        next(new HttpError(500, "Internel Server Error"));
    }
}


//본인 정보 조회
export const getMe = async (req, res, next) => {
    try {
        const userId = req.user?.id; //?는 옵셔널 체이닝. req.user 값 존재할때만 가져오기

        if (!userId)
            return next(new HttpError(401, "인증이 필요합니다."));

        const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);

        if (rows.length === 0)
            return next(new HttpError(404, "사용자를 찾을 수 없습니다."));

        res.json(rows[0]);
    } catch (err) {
        console.error("getMe error: ", err);
        next(new HttpError(500, "Internal Server Error"));
    }
}

//공연 찜 추가
export const addFavoriteShow = async (req, res, next) => {
    const userId = req.user?.id;
    const showId = Number(req.body.show_Id);


    if (!userId || isNaN(showId)) {
        return next(new HttpError(400, "Invalid data"));
    }

    try {
        // 이미 찜했는지 확인
        const [exist] = await pool.query(
            "SELECT * FROM favorite_shows WHERE user_id = ? AND show_id = ?",
            [userId, showId]
        );

        if (exist.length > 0) {
            return next(new HttpError(409, "Already added to favorites."));
        }

        await pool.query(
            "INSERT INTO favorite_shows (user_id, show_id) VALUES (?, ?)",
            [userId, showId]
        );

        res.status(201).json({ message: "Added to favorites." });
    } catch (err) {
        console.error("addFavoriteShow error: ", err);
        next(new HttpError(500, "Internal Server Error"));
    }
}

//유저가 찜한 공연 목록 조회
export const seeUserFavoriteShows = async (req, res, next) => {
    const userId = req.user?.id;

    if (!userId) {
        return next(new HttpError(401, "Authentication required."));
    }

    try {
        const [rows] = await pool.query(
            `
            SELECT s.*
            FROM shows s
            JOIN favorite_shows f ON f.show_id = s.id
            WHERE f.user_id = ?
            `,
            [userId]
        );

        res.status(200).json({ data: rows });
    } catch (err) {
        console.error("seeUserFavoriteShows error: ", err);
        next(new HttpError(500, "Internal Server Error"));
    }
}

//찜 제거
export const deleteUserFavoriteShows = async (req, res, next) => {
    const userId = req.user?.id;
    const showId = Number(req.params.showId);

    if (!userId || isNaN(showId)) {
        return next(new HttpError(400, "Invalid data"));
    }

    try {
        const [result] = await pool.query(
            "DELETE FROM favorite_shows WHERE user_id = ? AND show_id = ?",
            [userId, showId]
        );

        if (result.affectedRows === 0) {
            return next(new HttpError(404, "Favorite not found."));
        }

        res.status(200).json({ message: "Favorite removed." });
    } catch (err) {
        console.error("deleteUserFavoriteShows error: ", err);
        next(new HttpError(500, "Internal Server Error"));
    }
}