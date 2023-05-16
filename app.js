const express=require('express');
const connectDB=require('./db/connect');
const cluster=require('cluster');
require('dotenv').config();

const os=require('os');
const CPUs=os.cpus().length-1;

const port =process.env.PORT || 3000;



if(cluster.isPrimary){
    

    for(let i=0;i<CPUs;i++){
        
        let worker=cluster.fork();

    }


    cluster.on("exit",()=>{
        let worker=cluster.fork();
    })

}

else
{
    const UserRouter=require('./routes/userRoute');    
    const app= express(); 
    
    app.use(express.json());        // without this the incoming request will be undefined 
    
    app.use('/api/v1/users',UserRouter)
    
    const start= async()=>{
    
        try {
    
            //Connecting with Database,  Inside db folder
            await connectDB(process.env.MONGO_URI);
    
            
            app.listen(parseInt(port)+cluster.worker.id ,console.log(`Server is listening on port ${parseInt(port)+cluster.worker.id} on worker thread : ${cluster.worker.id}`));
    
        } catch (error) {
            console.log(error);
        }
    }
    
    //Start the server;
    start()
}


