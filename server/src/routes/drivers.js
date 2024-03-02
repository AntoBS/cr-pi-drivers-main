const { Router } = require("express");
const {
    getDriverById, 
    getDrivers,
    createDriver,
} = require('../handlers/driversHandlers');

const router = Router();

router.get('/:id', getDriverById)
router.get('/', getDrivers)
router.post('/', createDriver)

module.exports = router;