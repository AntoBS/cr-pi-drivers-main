const { Router } = require("express");
const { getTeams } = require('../handlers/teamsHandlers');

const router = Router();

router.get('/', getTeams);

module.exports = router;