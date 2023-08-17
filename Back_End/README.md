# Using Polygon ID VC Verifier Server

This repo contains the backend server code you'll need to set up a VC (Verifiable Credential) gated website with Polygon ID. Complete local server setup below, then hook this verification server up to a frontend so you can limit access based on holding a VC that satisifies your requirements.

Steps:  
1. Run "ngrok http <backend_port_number>"  
2. Update the  
https://b2a5-2001-f40-976-46c-810f-4a7c-c675-a2f5.ngrok-free.app
in .env  
3. Run "npm run start" to start backend  