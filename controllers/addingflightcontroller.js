const flightinfo=require('../models/flightmodel');

var addflight=async (req,res)=>{

     console.log('adding');
     let flightnew=new flightinfo();
    // let addf=new flightinfo({
    //      flightid: req.body.fid,
    //      airlineid: req.body.aid,
    //      From:req.body.bp,
    //      To:req.body.dp,
    //      Dtime:req.body.dtime,
    //      Atime:req.body.atime,
    //      duration:req.body.dur,
    //      availableseats:req.body.aseats,
    //      eprice:req.body.eprice,
    //      bprice:req.body.bprice,
    //  })
    //  addf.save();
    flightnew.flightid=req.body.fid;
    flightnew.airlineid=req.body.aid;
    flightnew.From=req.body.bp;
    flightnew.To=req.body.dp;
    flightnew.Dtime=req.body.dtime;
    flightnew.Atime=req.body.atime;
    flightnew.duration=req.body.dur;
    flightnew.availableseats=req.body.aseats;
    flightnew.eprice=req.body.eprice;
    flightnew.bprice=req.body.bprice;

    await flightnew.save((err,data)=>{
        if(err){
            console.log(err);
        }
        else
        {
            res.status(200).send({msg:"Insert"});
        }
    })

}

module.exports=addflight;