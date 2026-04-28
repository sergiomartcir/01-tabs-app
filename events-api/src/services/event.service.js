/*
    Servicio con toda la lógica de negocio de la api
    
    Funciones CRUD de la api:
    1. Leer todos los eventos (tab de eventos)
    2. Leer un evento específico (page de details)
    3. Crear un nuevo evento
    4. Modificarlo
    5. Eliminarlo
*/
const eventRepository = require('../repositories/event.repository');

const getAllEvents = async () => {
    return await eventRepository.readItems();
};

const getEventById = async (id) => {
    const items = await eventRepository.readItems();
    
    return items.find(i => i.id === id);
};

const createEvent = async (eventData) => {
    const items = await eventRepository.readItems();
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;  // id incremental
    
    // creamos un objeto nuevo forzando que el id sea la primera propiedad
    const newItem = {
        id: newId,
        name: eventData.name,
        description: eventData.description || '',
        image: eventData.image || '',
        calendarEvents: eventData.calendarEvents || []
    };
    
    items.push(newItem);
    await eventRepository.writeItems(items);
    
    return newItem;
};

const updateEvent = async (id, eventData) => {
    const items = await eventRepository.readItems();
    const index = items.findIndex(i => i.id === id);
    let result = null;
    
    if (index !== -1) {
        // creamos un objeto nuevo forzando que el id sea la primera propiedad
        items[index] = {
            id: id,
            name: eventData.name,
            description: eventData.description || '',
            image: eventData.image || '',
            calendarEvents: eventData.calendarEvents || []
        };
        
        await eventRepository.writeItems(items);
        result = items[index];
    }
    
    return result;
};

const deleteEvent = async (id) => {
    const items = await eventRepository.readItems();
    const index = items.findIndex(i => i.id === id);
    let result = null;
    
    if (index !== -1) {
        const deletedItem = items.splice(index, 1);
        await eventRepository.writeItems(items);
        
        result = deletedItem[0];
    }
    
    return result;
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};