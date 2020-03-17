import express from 'express';
import {pubName} from "./config";

const app = express();
const port : string|number= process.env.PORT || 5000;

app.set('view engine', 'squirrelly');
app.set('views', 'views');

app.use("*",(req, res) =>{
    res.render('index', { pageTitle: `Welcome to ${pubName}`, pubName: pubName });
});

//create a server object:
app.listen(port,() => console.log(`hosting @${port}`));

