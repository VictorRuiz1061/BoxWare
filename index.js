import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import Seguridad from './src/routes/seguridad.route.js';
import usuarios from './src/routes/usuarios_V.js'
import modulo from './src/routes/modulos_V.js' 
import permisos from './src/routes/permisos_V.js' 
import movimientos from './src/routes/movimientos_T.js';
import tiposMovimiento from './src/routes/tipoMovimiento_T.js';
import tiposSitio from './src/routes/tipoSitio_T.js';
import roles from './src/routes/roles_v.js';
import fichas from './src/routes/fichasCV.js'
import area from './src/routes/area_CV.js'
import programas from './src/routes/programas_CV.js'
import centros from './src/routes/Centros_Jp.js'
import sedes from './src/routes/Sedes_Jp.js'
import municipios from './src/routes/Municipios_Jp.js';
import sitios from './src/routes/sitios_B.js'
import materiales from './src/routes/materiales_B.js'
import categoria_elementos from './src/routes/categoriasMateriales_B.js';
import tiposMateriales from './src/routes/tiposMateriales_B.js';

const app = express();
app.use(  
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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

app.use(Seguridad)
app.use(usuarios);
app.use(modulo); 
app.use(permisos);
app.use(movimientos);
app.use(tiposMovimiento);
app.use(tiposSitio);
app.use(roles);
app.use(fichas);
app.use(area);
app.use(programas);
app.use(centros);
app.use(sedes);
app.use(municipios);
app.use(sitios);
app.use(materiales);
app.use(categoria_elementos);
app.use(tiposMateriales);


app.listen(3000, () => {
    console.log('corriendo en el puerto 3000')
});
