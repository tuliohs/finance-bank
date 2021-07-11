const router = require('express').Router()

const auth = require("../controllers/user.controller.js");
const authorize = require('../middlewares/auth').verifyJwt

//NOT authorize routes
router.post("/register", auth.registro);
router.post("/authenticate", auth.autenticar);
router.post("/authenticate-google", auth.loginGoogle);

//authorize
router.put("/user", authorize, auth.changeProfile);
router.get("/user", authorize, auth.getUser);

// export
module.exports = router