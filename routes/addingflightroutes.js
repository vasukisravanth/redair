const express=require('express');

const router=express.Router();


const flightaddingcontroller=require('../controllers/addingflightcontroller');





router.post('/addingflights', (req,res)=>{
    flightaddingcontroller.addflight});

module.exports=router;