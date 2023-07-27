const dbPassword:any = process.env.DB_PASS;
const dbUser:any =  process.env.DB_USER

export default {
  port: 3000,
  dbUrl: `mongodb+srv://${dbUser}:${dbPassword}@restfulapi.0kzidwr.mongodb.net/?retryWrites=true&w=majority`,
  env: 'development'
};
