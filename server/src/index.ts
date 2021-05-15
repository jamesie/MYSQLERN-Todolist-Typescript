import express from 'express';
import connectRedis from "connect-redis";
import Redis from 'ioredis';
import { createConnection } from "typeorm";
import session from "express-session";
import cors from 'cors';
import { MyContext } from './types';
import { User } from './models/user';
import swaggerUi from "swagger-ui-express";
import UserRouter from './routes/user.router';
import swaggerDocument from '../public/swagger.json';

const main = async () => {

  const conn = await createConnection({
    type: "mysql",
    database: "todolist",
    username: "root",
    password: "password",
    logging: true,
    synchronize: true,
    entities: [
      User,
    ],
  });
  

  await conn.runMigrations()

  const app = express()
  app.use(express.json());

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(cors(corsOptions));

  const sessionMiddleWare = session({
    name: "connect4c",
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
    saveUninitialized: false,
    secret: "newSecret",
    resave: false,
  });

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  ); 

  app.use(sessionMiddleWare);

  app.get('/', (context: MyContext) => {
    context.res.send("hello world")
  })

  const router = express.Router();

  router.use("/users", UserRouter);

  app.use('/', router)
  
  const PORT = 4001
  app.listen(PORT, () => console.log(`server running on port: ${PORT}`))

}

main().catch((err) => {
  console.log(err)
})
