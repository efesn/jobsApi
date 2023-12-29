# Jobs API
### You can check/test this API here:
[Jobs-API](https://jobs-api-02-55e4f411eca1.herokuapp.com/api-docs/)

## Setup
1. Create a `.env` file in the root directory. 
2. Configure the following environment variables: 
- `JWT_LIFETIME`:  Recommended value is 30d for JWT token validity. 
- `JWT_SECRET`: Recommended value is a 256-bit encryption key.
- `MONGO_URI`: To establish database conncetion
4. Run the following commands in the terminal:

       npm install
       npm start

#### Swagger UI
- Used to create API documentation
#### Security Packages
- helmet
- cors
- xss-clean
- express-rate-limit
