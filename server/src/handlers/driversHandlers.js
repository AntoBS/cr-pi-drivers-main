const { driverById, searchDriverByName, getAllDrivers, createDriverController } = require ('../controllers/driversControllers');

const getDriverById = async (req, res) => {
    const {id} = req.params;

    //ternario, al momento de asignar pregunta que tiene y donde dirige.
    const source = isNaN(id) ? "bdd" : "api";

    try {
        const driver = await driverById (id, source)
        res.status(200).json(driver)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getDrivers = async (req, res) => {
    const {name, offset, limit, team, source, alphabetically, birthday} = req.query;
    const filters = {team, source};
    const orden = {alphabetically, birthday};

    try {
        const results = name ? await searchDriverByName(name) : await getAllDrivers(parseInt(offset), parseInt(limit), filters, orden);

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json('Driver no encontrado');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createDriver = async (req, res) => {
    try {
      const { name, surname, description, image, nationality, dob, teams } = req.body
      const nerDriver = await createDriverController(name, surname, description, image, nationality, dob, teams);
      res.status(201).json(nerDriver)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
  }
  

module.exports = {
    getDriverById,
    getDrivers,
    createDriver
}