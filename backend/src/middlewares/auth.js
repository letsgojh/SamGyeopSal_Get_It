import jwt from "jsonwebtoken";
import HttpError from "../error/httpError.js";

export const authMiddleware = (req,res,next) =>{
    //Bearer 토큰 가져오기 ex) Authorization : Bearer <토큰값> 으로 구성
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return next(new HttpError(401,"토큰이 필요합니다."));
    }

    //토큰은 1번 index에
    const token = authHeader.split(" ")[1];

    try{
        //JWT_SECRET : header_payload_signature를 만들때 서버만 알고있는 비밀 키(아무 문자열이나 가능)
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
        req.user = {
            id : decoded.id,
            email : decoded.email,
        }
        
        next();
    }catch(err){
        return next(new HttpError(401,"유효하지 않은 토큰입니다."));
    }
    


}

