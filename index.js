import bodyParser from 'body-parser';
import express from 'express';
import sitios from './src/routes/sitios_B.js'
import materiales from './src/routes/materiales_B.js'
import categoria_elementos from './src/routes/categoriasMateriales_B.js';
import tiposMateriales from './src/routes/tiposMateriales_B.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sitios);
app.use(materiales);
app.use(categoria_elementos);
app.use(tiposMateriales);


app.listen(3000, () => {
    console.log('corriendo en el puerto 3001')
});
