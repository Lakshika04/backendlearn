
 import express from 'express'
import connectDb from './config/database.js'
import router from './routes/Auth.route.js'


 const app = express();
  app.use (express.json())

  connectDb();

app.use("/auth",router)

app.use("/todo",router)

  app.listen(5000,()=>{
    console.log("server is running on port 5000");
  })
