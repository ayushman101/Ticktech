const mongoose=require('mongoose');

const connectDB= (url)=>{
    
    mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("DB connected"))

};

module.exports = connectDB;
