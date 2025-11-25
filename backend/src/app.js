import dotenv from "dotenv";
dotenv.config();;

import express from 'express';
import indexRouter from "./routes/index.js";
import {logger} from "./middlewares/logger.js";
import { delay } from './middlewares/delay.js';
import cors from 'cors'; //request accept/cancel
import morgan from 'morgan'; //print http request one line
import helmet from 'helmet'; //attatch http request header automatically
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger); //모든 요청에 로깅 적용
app.use('/test',delay); //test 경로에만 지연적용
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());
app.use('/api',indexRouter);

app.listen(PORT,() =>{
    console.log(`Server is Running on http://localhost:${PORT}`);
})