const express=require('express');
const connectDB=require('./db/connect');
const cluster=require('cluster');
require('dotenv').config();

const os=require('os');
const CPUs=os.cpus().length;

const port =process.env.PORT || 3000;

var exitId=0;


if(cluster.isPrimary){
    
    for(let i=0;i<CPUs;i++){
        
        let worker=cluster.fork();

    }

    cluster.on("exit",(worker,code,signal)=>{
        exitId=worker.id;
        let newworker=cluster.fork();
        // newworker.id=worker.id;     //On forking new worker we don't want to increment the id but rather use the older id.
    })

}

else if(cluster.Worker.id===1)
{

    const http = require('http');
    
    const os=require('os');
    
    const { createProxyServer } = require('http-proxy');
        
    let backendServers=[];
    
    for(let i=1;i<CPUs;i++)
    {
        let server={host: 'ticktech.onrender.com', port: parseInt(port)+i+1}
        backendServers.push(server);
    
    }
    
    console.log("Load Balancer Server");
    console.log(backendServers);
    
    // Backend server instances
    // const backendServers = [
    //   { host: 'localhost', port: 3001 },
    //   { host: 'localhost', port: 3002 },
    //   { host: 'localhost', port: 3003 },
    //   { host: 'localhost', port: 3004 },
    //   { host: 'localhost', port: 3005 },
    //   { host: 'localhost', port: 3006 },
    //   { host: 'localhost', port: 3007 },
    
    // ];
    
    // Initialize the load balancer
    const proxy = createProxyServer();
    
    // Track the current server index
    let currentServerIndex = 0;
    
    // Create the load balancer server
    const loadBalancer = http.createServer((req, res) => {
      // Get the next server from the backendServers array
      const { host, port } = backendServers[currentServerIndex];
      
      // Proxy the request to the selected server
      proxy.web(req, res, { target: `http://${host}:${port}` });
    
      // Increment the server index for the next request
      currentServerIndex = (currentServerIndex + 1) % backendServers.length;
    });
    
    // Start the load balancer server
    // const loadBalancerPort = process.env.PORT;
    loadBalancer.listen(port, () => {
      console.log(`Load balancer started on port ${port}`);
    });
    

}

else
{
    const UserRouter=require('./routes/userRoute');    
    const app= express(); 
    
    app.use(express.json());        // without this the incoming request will be undefined 
    
    app.use('/api/v1/users',UserRouter)

    let addtoport=cluster.Worker.id<=CPUs? cluster.Worker.id:exitId;
    
    const start= async()=>{
    
        try {
    
            //Connecting with Database,  Inside db folder
            await connectDB(process.env.MONGO_URI);
    
            
            app.listen(parseInt(port)+addtoport,console.log(`Server is listening on port ${parseInt(port)+addtoport} on worker thread : ${cluster.Worker.id}`));
    
        } catch (error) {
            console.log(error);
        }
    }
    
    //Start the server;
    start()
}


