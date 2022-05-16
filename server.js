const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs');

const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '1234',
    database : 'mydb'
  }
});


// db.select('*').from('login').then(data => {
//     console.log(data);
// });
app.use(bodyParser.json());
app.use(cors());
const dataBase = {
    users :[
        {
            id: 124,
            name: 'feza',
            password: '1234',
            email: 'fatimafeza04@gmail.com'
        },
        {
            id: 125,
            name: 'asiya',
            password: '12345',
            email: 'fatimaasiya04@gmail.com'
        }
    ]
}


app.get('/', (req,res) => {
    res.json(dataBase.users);
})

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db,bcrypt)})

app.put('/image',(req,res) => {image.handleImage(req,res,db,bcrypt)})


app.listen(process.env.PORT || 5000,()=> {
    console.log('app is running on port 5000');
})

/*
planning
ro-utes(end-points)
/ --> res = this is working
/signin --> post = success/fail
/register --> post = user
/profile/:userid --> get
/image --> put = to update the rank


*/