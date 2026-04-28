/*
    Capa repositorio que se encarga del acceso a datos (lectura/escritura)
*/
const fs = require('fs/promises');  // Módulo nativo de node para interactuar con archivos
const path = require('path');  // módulo nativo para manejar rutas de archivos

const DATA_FILE = path.join(__dirname, '../../data', 'data.json'); // Ruta al json con datos

/*
    Funciones para leer o guardar los datos en el json (persistencia)
*/
const readItems = async () => {
    try {
        // Lee el archivo como texto y lo convierte a objeto js
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const parsedData = JSON.parse(data);
        
        return parsedData.events;
    
    } catch (error) {
        if (error.code === 'ENOENT' || error.name === 'SyntaxError') {
            return [];
        }
        throw error;
    }
};

const writeItems = async (items) => {
    /* Convierte el objeto a texto json formateado y lo guarda
    Se vuelve a envolver en un objeto con la propiedad "events" antes de guardar
    */
    await fs.writeFile(DATA_FILE, JSON.stringify({ events: items }, null, 2));
};

module.exports = {
    readItems,
    writeItems
};