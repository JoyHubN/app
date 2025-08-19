import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(process.cwd(), 'config/.env')});

import prisma from './prisma.js'
import authRouter from './auth/authRouter.js';

const PORT  = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/auth', authRouter); 

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