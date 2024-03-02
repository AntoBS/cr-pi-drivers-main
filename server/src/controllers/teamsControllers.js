const axios = require('axios');
const { Team } = require('../db');

const getApiTeams = async () => {
  // Obtener los datos de la API de Drivers
  const response = await axios.get("http://localhost:5000/drivers/");
  const drivers = response.data;

  // Crear un conjunto para almacenar los nombres únicos de los teams
  const teamNames = new Set();

  // Iterar sobre la lista de Drivers
  drivers.forEach((driver) => {
    // Verificar si driver.teams existe y no es undefined
    if (driver.teams !== undefined) {
      // Dividir la cadena de teams en una matriz y eliminar espacios en blanco
      const driverTeams = driver.teams.split(",").map((team) => team.trim());

      // Agregar cada nombre de equipo único al conjunto
      driverTeams.forEach((team) => teamNames.add(team));
    }
  }); 

  // Convertir el conjunto de nombres de teams a un array de objetos
  const teams = Array.from(teamNames).map((name) => ({ name }));

  return teams;
};

const getDbTeams = async () => {
    
    const dbTeams = await Team.findAll(); 
    return dbTeams;
};


module.exports = { getApiTeams, getDbTeams };