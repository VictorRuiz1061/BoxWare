import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import usuarios from './src/routes/usuarios_V.js'
import admin from './src/routes/adminis_V.js'
import tipo_permiso from './src/routes/tipos_permisos_V.js'
import permisos from './src/routes/permisos_V.js'
import permisosUsers from './src/routes/permisosUsers_V.js'

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

app.use(admin);
app.use(permisos);
app.use(permisosUsers);
app.use(tipo_permiso);
app.use(usuarios);

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.listen(3002, () => {
    console.log('corriendo en el puerto 3002')
});
