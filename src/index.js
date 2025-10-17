
 import express from 'express'
import connectDb from './config/database.js'
import authrouter from './routes/Auth.route.js'
import todorouter from './routes/Todo.route.js';


 const app = express();
  app.use (express.json())

  connectDb();

app.use("/auth",authrouter)

app.use("/todo",todorouter)

  app.listen(5000,()=>{
    console.log("server is running on port 5000");
  })
