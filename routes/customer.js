const express=require('express')
const customerModel = require('../models/customer.model')
const router=express.Router()
router.get('/',async(req,res)=>{
   try{
    const customers= await customerModel.find()
    res.render('customers/list', {customers:customers})
   }catch(e){
       console.log(e)
       res.redirect('/')
   }
})
router.get('/add',(req,res)=>{
    res.render('customers/add')
})
router.post('/add',async(req,res)=>{
    try{
        const newCus=customerModel({
            name:req.body.name,
            old:req.body.old
        })
        await newCus.save()
        res.redirect('/customer')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.get('/edit/:id',async(req,res)=>{
    try{
        const customer=await customerModel.findById(req.params.id)
        res.render('customers/edit', {customer:customer})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.post('/edit/:id',async(req,res)=>{
    try{
        const customer=await customerModel.findById(req.params.id)
        customer.name=req.body.name
        customer.old=req.body.old
        await customer.save()
        res.redirect('/customer')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.put('/edit/:id',async(req,res)=>{ //edit = phuong thuc put
    try{
        const customer=await customerModel.findById(req.params.id)
        customer.name=req.body.name
        customer.old=req.body.old
        await customer.save()
        res.redirect('/customer')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.get('/delete/:id',async(req,res)=>{
    try{
        await customerModel.findByIdAndDelete(req.params.id)
        res.redirect('/customer')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.delete('/delete/:id',async(req,res)=>{ //xoa bang phuong thuc delete
    try{
        await customerModel.findByIdAndDelete(req.params.id)
        res.redirect('/customer')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})

module.exports=router