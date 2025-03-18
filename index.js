import express from 'express';
import bodyParser from 'body-parser';

import movimientos from './src/routes/movimientos_T.js';
import tiposMovimiento from './src/routes/tipoMovimiento_T.js';
import tiposSitio from './src/routes/tipoSitio_T.js';
import roles from './src/routes/roles_T.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(movimientos);
app.use(tiposMovimiento);
app.use(tiposSitio);
app.use(roles);

app.listen(3001, () => {
    console.log('corriendo en el puerto 3001')
});