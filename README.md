# Ticktech

# Running the Application

1. Setup MongoDB locally. Write the connection string in the .env file. (If database query doesn't work, Try replacing `localhost` to `127.0.0.1` in the connection String.
2. In case you want to setup the DB on Mongo Atlas, just change the connection string in .env file.
3. Run `npm install` to install all the dependencies
4. Run `npm start:dev` to start the server. But this primary server is just for redirecting incoming request to other instances (Load Balancing)
5. Run `npm start:multi` to start cluster mode for running worker threads.
6. Go through the following for each endpoint:
    a. `api/v1/users`:  Method: GET
                        body: None
                        resonse: An array of all the Users
    b. `api/v1/users/:id`: Method: GET 
                           body: None
                           response: One User Object of the Form: 
                                                                   {
                                                            "Username": "Aman Singh",
                                                            "email": "xyz@gmail.com",
                                                            "password": "password123",
                                                            "age": 22,
                                                            "hobbies": [
                                                                "cubing",
                                                                "cricket"
                                                            ],
                                                            "_id": "6463853a95dc1fb48fdc30a2",
                                                            }
                                                            
                                                            
   # Similar for DELETE method as well. But in case of PUT method there will be body.
   
   c.`api/v1/users`: Method: POST
                      body:  {  "Username": "Aman Singh",
                                "email": "xyz@gmail.com",
                                "password": "password123",
                                 "age": 22,
                                 "hobbies": [
                                              "cubing",
                                              "cricket"
                                             ],
                             }       
    
    
# Load Balancing:
        
        The npm script  `start:dev`  starts server.js file which creates a PROXY SERVER acting as a LOAD BALANCER.
        This server redirects incoming requests to CLUSTER WORKER THREADS using Round Robin Algorithm.
        
        REFER TO LINE 33 IN SERVER.JS FILE FOR  ROUND ROBIN ALGO.
        
        
# CLUSTER :
        
        We use node:cluster for creating worker threads equal to number of LOGICAL CPUs in our Machine.
        Each worker thread starts a server listening on the PORT+n , where n = worker.id
 
# DATABASE: 
          
        We are using MongoDB as our Database. It is setup locally. But it can be changed by modifying the .env file. 
        
# .env
        Using the .env file to store PORT number and DataBase Connection String.
                             
    
