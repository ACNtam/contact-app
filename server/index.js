import express from "express";
import cors from "cors";
import contactsRouter from "./routes/contacts.js";

import bodyparser from 'body-parser';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyparser.json());
app.use("/contacts", contactsRouter);

app.get('/', function(req,res){
    res.json("Server running");
})


app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));
