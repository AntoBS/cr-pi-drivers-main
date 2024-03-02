const { getApiTeams, getDbTeams } = require('../controllers/teamsControllers');

const getTeams = async (req, res) =>{
    try {
        const apiTeams = await getApiTeams();
        const dbTeams = await getDbTeams();
        const allTeams = [...apiTeams, ...dbTeams];
        res.status(200).json(allTeams)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getTeams }