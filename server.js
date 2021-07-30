const express = require('express')
const app = express()
const customerRouter=require('./routes/customer.js')
const indexRouter=require('./routes/index.js')
const mongoose=require('mongoose')
require('dotenv').config() //goi env
const methodOverride=require('method-override')  //goi override
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method')) //dung override
const connectFunc=async()=>{ //ket noi DB qua env
    try{
        await mongoose.connect(process.env.STR_CONNECT)
        console.log("SUCCESSFUL")
    }catch(e){
        console.log("FAILEDDD")
    }
}
connectFunc()
app.use('/customer/', customerRouter)
app.use('/', indexRouter)
app.listen(process.env.PORT||3000) //chon gate
