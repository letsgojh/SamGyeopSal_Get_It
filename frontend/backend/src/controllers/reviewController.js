import pool from '../config/db.js'
//전체조회
import pool from '../db.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json({ data: rows });
  } catch (err) {
    next(err);
  }
};



//단일 조회
export const getProductById = async (req,res,next)=>{
    const id = Number(req.params.id);
    try{
        const [rows] = await pool.query(`SELECT * FROM users WHERE id=?`,[id]);
        res.status(200).json({data : rows});
    }catch(err){
        next(err);
    }
}

//상품 생성
export const createProduct = async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  try {

    const [existing] = await pool.execute(`SELECT id FROM users WHERE email = ?`,[email]);

    if(existing.length > 0)
        return res.status(409).json({error : `Email already exists`});

    const [result] = await pool.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    const insertedId = result.insertId;
    res.status(201).json({ data: { id: insertedId, name, email } });
  } catch (err) {
    next(err);
  }
};


//상품 정보 업데이트
export const updateAllProduct =  async (req,res, next)=>{
    const id = Number(req.params.id); //id로 수정하기
    const {name,email} = req.body;

    const [rows] = await pool.query(`UPDATE users SET name = ?,email = ? WHERE id = ?`,[name,email,id]); //몇번째 index에 있는지 찾기

    res.status(201).json({data : {id : rows}});
}

// //상품 정보 부분 업데이트
// export const updatePartProduct =  (req,res)=>{
//     const id = Number(req.params.id);
//     const product = products.find(p => p.id === id);
//     if(!product){
//         return res.status(404).json({data : `Name and price are required`});
//     }
//     const {name, price} = req.body;
//     //둘 중에 아무거나 수정해도된다.(입력 안하면 그냥 넘어가도록)
//     if(name) product.name = name;
//     if(price) product.price = price;

//     res.json({data : product});
// }


export const deleteProduct = async (req,res,next)=>{
    const id = Number(req.params.id);
    if(!id){
        return res.status(404).json({data : "There is no content"});
    }
    try{
        const [rows] = await pool.query(`DELETE FROM users WHERE id=?`,[id]);
    }catch(err){
        next(err);
    }
}