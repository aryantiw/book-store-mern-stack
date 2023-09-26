import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { router } from './routes/bookksRoutes.js';
import  cors from 'cors';

const app = express();


app.use(express.json());


//option 1: allow all origins with default of cors(*)
//app.use(cors());

//option2: allow custom origins

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);



//middleware for parsing request body
app.use('/books', router);


app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send('i dont know what this is')
});

//connecting mongoose server
mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`)
    });
    
})
.catch((error) =>{
    console.log(error);
});