const { Driver } = require('../db');
const axios = require('axios');
const { Op } = require("sequelize");

const default_image = "https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg";

const mapDriver = (driver) => {
  return {
    id: driver.id,
    name: driver.name.forename || driver.name,
    surname: driver.name.surname || driver.surname,
    description: driver.description,
    image: driver.image.url || default_image,
    nationality: driver.nationality,
    birthdate: driver.dob,
    teams: driver.teams,
  };
}


const createDriverController = async ( name, surname, description, image, nationality, dob, teams ) => {

  const newDriver = await Driver.create({
    name,
    surname,
    description,
    image,
    nationality,
    dob,
    teams,
  });

  return newDriver
};


// Funcion para obtener la info de un Driver desde la API por ID
const getDriverApi = async (id) => {
    const response = await axios.get(`http://localhost:5000/drivers/${id}`) 
    const data = response.data;

    return mapDriver(data);
}

// Función para obtener un Driver por su ID desde la base de datos o la API
const driverById = async (id, source) => {
    if (source === 'bdd') {
        const driver = await Driver.findByPk(id);
        if(driver) {
            return driver; // Si encuentra en la base de datos, devuelve
        }
    }

    // Si no encuentra en la base de datos o source no es "bdd", busca en la API
    const apiDriver = await getDriverApi(id);
    return apiDriver;
}

// Funcion para obtener la info de todos los Drivers desde Api
const getAllDrivers = async (offset, limit, filter, orden) => {
  const {source, team} = filter;
  const {alphabetically, birthday} = orden;

  if (!offset) {
    offset = 0
  }

  if (!limit) {
    limit = 9
  }

  let drivers =  []

  if (source === 'api' || !source) {
    const apiDrivers = (await axios.get(`http://localhost:5000/drivers`)).data; 
    drivers = drivers.concat(apiDrivers);
  }

  if (source === 'created' || !source) {
    const dbDrivers = await Driver.findAll();
    drivers = drivers.concat(dbDrivers);
  }

  if (team){
    drivers = drivers.filter((e) => e.teams?.toLowerCase().includes(team.toLowerCase()));
  }

  if (alphabetically) {
    drivers = drivers
        .filter(driver => driver.name) // Filtra los elementos con 'name' definido
        .sort((a, b) => a.driver.name.localeCompare(b.driver.name));
}

// if (alphabetically) {
//   drivers = drivers
//       .filter(driver => driver.name) // Filtra los elementos con 'name' definido
//       .sort((a, b) => {
//         if(a.name < b.name) { return -1; }
//   if(a.name > b.name) { return 1; }
//       });
// }

  if(birthday) {
    drivers = drivers.sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
  }

  return drivers.slice(offset, offset + limit)
      .map(driver => mapDriver(driver)); 
}

const getAllDriversApi = async () => {
  const apiDrivers = (await axios.get(`http://localhost:5000/drivers`)).data; 

  return apiDrivers.map(driver => mapDriver(driver)); 
}

// Función para buscar un Driver por su nombre en la base de datos
const searchDriverByName = async (name) => {

    const dbDrivers = (await Driver.findAll({ where: { name: {[Op.iLike]: name} } }))
        .map(driver => mapDriver(driver));

    const apiDrivers = (await getAllDriversApi())
        .filter(driver => driver.name.toLowerCase().includes(name.toLowerCase()));

    return [...apiDrivers, ...dbDrivers];
}





module.exports = {
    driverById,
    getAllDriversApi,
    searchDriverByName,
    createDriverController,
    getAllDrivers
}