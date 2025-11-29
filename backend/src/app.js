import dotenv from "dotenv";
dotenv.config();;

import pool from './config/db.js';
import express from 'express';
import { specs, swaggerUi } from "./swagger.js";
import indexRouter from "./routes/index.js";
import { logger } from "./middlewares/logger.js";
import { delay } from './middlewares/delay.js';
import cors from 'cors'; //request accept/cancel
import morgan from 'morgan'; //print http request one line
import helmet from 'helmet'; //attatch http request header automatically
import { errorHandler } from './middlewares/errorHandler.js';
import path from 'path';

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(logger); //모든 요청에 로깅 적용
app.use('/test', delay); //test 경로에만 지연적용
app.use(helmet({
    crossOriginResourcePolicy: false    // 그림 허용해주는 코드!
}));

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(cors());
app.use(morgan('tiny'));
app.use(express.static("public"));
app.use(express.json());
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
})