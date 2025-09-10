import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(process.cwd(), 'config/.env')});

import prisma from './prisma.js'
import authRouter from './routing/auth/authRouter.js';
import userRouter from './routing/user/userRouter.js';
import blockRouter from './routing/user/block/blockRouter.js';

const PORT  = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/', userRouter); 
app.use('/auth', authRouter); 
app.use('/user', blockRouter); 

const start = async () => {
  try {
    await prisma.$connect()
    app.listen(PORT, () => console.log(`server started localhost:${PORT}`));
  }
  catch (e) {
    console.log(e);
  }

}

start();