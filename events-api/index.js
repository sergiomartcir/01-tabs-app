/*
    Punto de entrada de la api y de confi del servidor express
*/

const express = require('express');  // Servicio utilizado en la api
const cors = require('cors');
const eventRoutes = require('./src/routes/event.routes');

const app = express();
const PORT = 3000;  // puerto que en el funcionará

app.use(cors());  // permite peticiones desde la app
app.use(express.json()); // Permite leer datos enviados en JSON (los eventos)

// Montamos las rutas de eventos
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
    console.log(`Servidor API funcionando en http://localhost:${PORT}`);
});