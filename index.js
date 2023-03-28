const express = require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const path=require('path');
const md5=require('md5');
//const flightinfo=require('../models/flightmodel');

const dburi="mongodb+srv://vas:sravan@cluster0.n7bw0.mongodb.net/redair?retryWrites=true&w=majority";


const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
};

mongoose.connect(dburi,connectionParams).then(()=>{
    console.log('database connected');
}).catch((e)=>{
    console.log(e);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//const addflightroutes=require('./routes/addingflightroutes');

//app.use(addflightroutes);

const flightSchema=new mongoose.Schema({
    flightid:{
      type:String,
      required:true}
    ,
    airlineid:{
      type:String,
  required:true},
    From:{
      type:String,
  required:true},
    To:{
      type:String,
      required:true},
    Dtime:{
      type:String,
      required:true},
    Atime:{
      type:String,
      required:true},
    duaration:{
      type:String},
    availableseats:{
      type:String,
      required:true},
    eprice:{
      type:String,
      required:true},
    bprice:{
      type:String,
      required:true}
  
  
  
  });
 const flight=new mongoose.model("flight",flightSchema);

 const passengerSchema=new mongoose.Schema({
    pname:{
      type:String,
      required:true}
    ,
    pphone:{
      type:String,
  required:true},
    pemail:{
      type:String,
  required:true},
    pflightid:{
      type:String,
      required:true},
    psource:{
      type:String,
      required:true},
    pdest:{
      type:String,
      required:true},
    pprice:{
      type:String,
    required:true}

   
  
  
  
  });
 const passenger=new mongoose.model("passenger",passengerSchema);
 const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
 });

const user=new mongoose.model("user",userSchema);

app.post('/registeruser',(req,res)=>{
    res.render('register');
});

app.post('/registeringuser',(req,res)=>{

    var userid=req.body.username;
    let userf=new user({
        username:req.body.username,
        password:md5(req.body.password)
    });

    userf.save();

    res.redirect(`/searchingflights/${userid}`)
});

app.get('/searchingflights/:userid',(req,res)=>{
    res.render('searchingflights');
})

app.get('/',(req,res)=>{
    res.render('home');
});

app.post('/addingflights', (req,res)=>{
   
    let addf=new flight({
        flightid:req.body.fid,
        airlineid:req.body.aid,
        From:req.body.bp,
        To:req.body.dp,
        Dtime:req.body.dtime,
        Atime:req.body.atime,
        duration:req.body.dur,
        availableseats:req.body.aseats,
        eprice:req.body.eprice,
        bprice:req.body.bprice
    })
     addf.save();

     res.render('flightadding');

    });


    app.post('/pasengerinfo/:pfid/:pfrom/:pto/:pamount',(req,res)=>{

        var pafid=req.params.pfid;
        var pfro=req.params.pfrom;
        var pt=req.params.pto;
        var pmon=req.params.pamount;
       let paddf=new passenger({
        pname:req.body.pname,
        pphone:req.body.pphone,
        pemail:req.body.pemail,
        pflightid:pafid,
        psource:pfro,
        pdest:pt,
        pprice:pmon


       })
       paddf.save();
    })

// app.deleteOne(`/deleteflight`,(req,res)=>{
//     let id=req.body._id;
//     flight.findByIdAndRemove(id);
//     console.log('Removed');
//     res.render('flightadding');
// });

app.post('/deleteflight',async (req,res)=>{
  var fid=req.body.fid;
 let articles = await flight.findOne({flightid:fid });
//    // res.send(articles);

//    flight.deleteOne(articles);
//    console.log('removed');
//     console.log(articles);
try{
    await flight.findByIdAndDelete(articles._id);
    res.render('flightadding');

}catch(err){
    console.log(err);
}
});



app.get('/displayingflights',(req,res)=>{
  res.render('searchingflights');
})

app.post('/displayingflights',async (req,res)=>{
    const flightdata= await flight.find({From:req.body.bop,To:req.body.dop});

    console.log(flightdata);

      if(flightdata){
        // let flights=[];
        // flights.push(flightdata);
        res.render('flightlist',{flightlist:flightdata});
      }

    });


    app.post('/paye/:flighti/:flightep/:flightfr/:flightto',(req,res)=>{

        var idflight=req.params.flighti;
        var priceflight=req.params.flightep;
        var fromflight=req.params.flightfr;
        var toflight=req.params.flightto;

        console.log(idflight);
        console.log(priceflight);
        console.log(fromflight);
        console.log(toflight);
        res.render('passenger',{flightid:idflight,from:fromflight,to:toflight,price:priceflight});

    });


app.post('/updateflight',async(req,res)=>{
    const flightdat= await flight.find({flightid:req.body.flid});
    var property=req.body.prop;
    var valu=req.body.val;

    try{
        await flight.findOneAndUpdate({_id:flightdat._id},{property:valu});
        res.render('flightadding');
    
    }catch(err){
        console.log(err);
    }

})

app.post('/signinuser',async(req,res)=>{
    var useri=req.body.username;
    const userData = await user.findOne({username:req.body.username})

        if(userData.password==md5(req.body.password)){
           res.redirect(`/searchingflights/${useri}`);
        }

})
app.post('/admin',(req,res)=>{
    res.render('admin');

})
app.post('/adminlogin',async (req,res)=>{
    var userad=req.body.username;
   if(userad=='vasuki' && req.body.password=='vasuki'){
    res.render('flightadding');
   }
})
app.post('/userlogin',(req,res)=>{
    res.render('user');
})

app.post('/admin',(req,res)=>{
    res.render('flightadding');
})

app.listen(3000,(req,res)=>{
    console.log('server');
})

