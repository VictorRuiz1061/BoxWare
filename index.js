import bodyParser from 'body-parser';
import express from 'express';
import cors from "cors";
import "dotenv/config.js";

import centros from './src/routes/routeCentros_Jp.js'
import sedes from './src/routes/routeSedes_Jp.js'
import municipios from './src/routes/routeMunicipios_Jp.js';

const app = express();
app.use(  
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use((req, res, next) => {
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);
  console.log("Request Body:", req.body);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(centros);
app.use(sedes);
app.use(municipios);

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.listen(3002, () => {
    console.log('corriendo en el puerto 3002')
});