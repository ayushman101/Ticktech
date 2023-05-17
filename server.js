const http = require('http');
require('dotenv').config();



const os=require('os');

const { createProxyServer } = require('http-proxy');

const CPUs=os.cpus().length-1;

let backendServers=[];

for(let i=0;i<CPUs;i++)
{
    let server={host: 'localhost', port: parseInt(process.env.PORT)+1+i}
    backendServers.push(server);

}

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
const loadBalancerPort = process.env.PORT;
loadBalancer.listen(loadBalancerPort, () => {
  console.log(`Server started on port ${loadBalancerPort}`);
});
