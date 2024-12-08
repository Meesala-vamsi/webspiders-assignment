const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require('./app');

mongoose.connect(process.env.CONN_STR)
.then(()=>{
  console.log("Connected to database....");
})
.catch((error)=>{
  console.error(error);
});


const port = process.env.PORT||3000;
app.listen(port,()=>{
  console.log("Server listening on port "+port);
});