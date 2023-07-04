import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import indexRouter from './routes/index.router.js';

import handlebars from 'express-handlebars';

const app = express();
const PORT = process.env.PORT||8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://coderhouse:coder123456@coderhouse.z88zdi9.mongodb.net/test?retryWrites=true&w=majority';

const connection = mongoose.connect(MONGO_URL)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.engine('.hbs', handlebars.engine({ extname: '.hbs', defaultLayout: 'main.hbs'}))
app.set('view engine', '.hbs')
app.set('views', __dirname + '/views')

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/', indexRouter)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
