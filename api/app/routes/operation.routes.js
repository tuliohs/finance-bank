const router = require('express').Router()

const controller = require("../controllers/operation.controller");
const authorize = require('../middlewares/auth').verifyJwt

//authorize
router.post("/", authorize, controller.registro);
router.get("/", authorize, controller.getAllOperations);

// export
module.exports = router