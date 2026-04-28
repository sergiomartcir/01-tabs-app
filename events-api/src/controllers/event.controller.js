/*
    Controlador encargado de recibir la petición HTTP (req), 
    llamar al servicio correspondiente, 
    y devolver la respuesta HTTP (res) con su código de estado
*/
const eventService = require('../services/event.service');

const getAll = async (req, res) => {
    try {
        const items = await eventService.getAllEvents();
        
        res.json(items);
    
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al leer los datos' 
        });
    }
};

const getOne = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const item = await eventService.getEventById(id);
        
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ 
                message: 'Elemento no encontrado' 
            });
        }
    
    } catch (error) {
        res.status(500).json({ 
            message: 'Error en el servidor' 
        });
    }
};

const create = async (req, res) => {
    try {
        const newItem = await eventService.createEvent(req.body);
        
        res.status(201).json(newItem);
    
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al guardar el elemento' 
        });
    }
};

const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedItem = await eventService.updateEvent(id, req.body);
        
        if (updatedItem) {
            res.json(updatedItem);
        } else {
            res.status(404).json({ 
                message: 'Elemento no encontrado' 
            });
        }
    
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al actualizar' 
        });
    }
};

const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedItem = await eventService.deleteEvent(id);
        
        if (deletedItem) {
            res.json({ 
                message: 'Elemento borrado con éxito', 
                deleted: deletedItem 
            });
        } else {
            res.status(404).json({ 
                message: 'Elemento no encontrado' 
            });
        }
    
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar' 
        });
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};