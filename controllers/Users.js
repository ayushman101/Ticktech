
const Users=require('../models/User');
const mongoose=require('mongoose')
const getAllUsers=async (req,res)=>{
    
    try {
        const allusers=await Users.find()
        res.status(200).json(allusers);
        
    } catch (error) {

        res.status(500).json({err: "Internal Server Error"});
        
    }
    
    res.end();
}

const getUser=async (req,res)=>{


    if(mongoose.Types.ObjectId.isValid(req.params.id)){

        
        try {
            
            const singleuser= await Users.findOne({_id:req.params.id});
        
            if(!singleuser)
            {
                res.status(404).json({msg:"User Not Found"});
            }
        
            
            else
                res.status(200).json(singleuser)
        
            } catch (error) {
                
                res.status(500).json({err:`Internal Server error : ${error}`});
        }

    }

    else{
        res.status(404).json({err:"Invalid ID"});
    }

}


const createUser=async (req,res)=> {
    console.log("creating user");

    try {
        const newUser= await Users.create(req.body);
        res.status(201).json({msg:"Job Created", User: newUser});
        
    } catch (error) {
        res.status(404).json(error);
    }

    res.end();
}



const updateUser= async (req,res)=>{

    const UserId=req.params.id;

    if(mongoose.Types.ObjectId.isValid(UserId)){
        
            try {
                
                console.log("updating User")
        
        
                
                const user=await Users.findByIdAndUpdate(
                {
                    _id:UserId
                },
                
                req.body,
                
                {new:true,runValidators:true}
                
                );
        
                if(!user)
                {
                    res.status(404).json({msg:`No item with ID: ${UserId}`});
                }
        
                else
                {
                    res.status(200).json(user);
                }
        
            } catch (error) {
                
                res.status(500).json(error);
        
            }
    }

    else{
        res.status(404).json({err:"Invalid UserID"});
    }
    res.end();
}

const deleteUser=async (req,res)=>{


    console.log("Deleting user");
    const UserId=req.params.id;

    if(mongoose.Types.ObjectId.isValid(UserId)){

        try {
            
            
            const user= await Users.findOneAndDelete({_id:UserId});
            
            if(!user)
            {
                return res.status(404).json({msg:`No Item with ID: ${UserId}`});
            }
            
            res.status(204).json({msg:`Record with ID: ${UserId} was Successfully Deleted`});
            
        } catch (error) {
            
            res.status(500).json({err: "Deletion Failed , Internal Server Error"});
            
        }
        
    }

    else{
        res.status(404).json({err:"Invalid UserID"});
    }

    res.end();
}


module.exports={
    getAllUsers,getUser,createUser,updateUser,deleteUser
};