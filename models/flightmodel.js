const mongoose=require("mongoose");

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
    type:String,
required:true},
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

module.exports=flight;