import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import fichas from './src/routers/fichasCV.js'
import area from './src/routers/area_CV.js'
import programas from './src/routers/programas_CV.js'

const app = express();
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Request url: ", req.url);
    console.log("Request method: ", req.method);
    console.log("Request body: ", req.body);
    next();
});

app.use(fichas);
app.use(area);
app.use(programas);

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })  
)


app.listen(3002, () => {
    console.log('servidor en el puerto 3002');
});