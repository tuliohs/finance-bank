const User = require('../models/user.model')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth.config");
const depure = require("../config/mode.config").isDev

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: authConfig.timeExpireToken
    })
}
exports.generateToken = generateToken

const UpdLastAcess = async (userId) => {
    try {
        await User.findOneAndUpdate({ "_id": userId }, { $set: { lastAcess: new Date() } })
    } catch (e) { console.log('err', e) }
}
exports.registro = async (req, res) => {
    const reqUser = req.body;
    if (!reqUser.email)
        return res.status(400).send({ message: 'fill in all fields' })
    try {
        let user = await User.findOne({ email: reqUser.email }).lean()
        if (!user) {
            user = await User.create(reqUser);
            user.password = undefined;
        }
        else
            return res.status(400).send({ message: 'Usuario já existe' })
        return res.send({
            user,
            token: generateToken({ id: user._id }),
        })
    }
    catch (err) {
        return res.status(400).send({ message: 'registration error', err: depure ? err.message : null })
    }
}
exports.autenticar = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email }).select('+password')

        if (!user)
            return res.status(400).send({ message: 'User Not Found' })

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ message: 'Invalid Password' })

        if (!user.active)
            return res.status(400).send({ message: 'User Disable, Click on forgot password to retrieve the user.' })

        user.password = undefined;
        await UpdLastAcess(user?._id)

        user = await User.findOne({ email: email })
            .lean()

        user.password = undefined;

        res.send({
            user,
            token: generateToken({ id: user._id }),
        })
    }
    catch (err) {
        return res.status(400).send({ message: 'login error', err: depure ? err.message : null })
    }
}
exports.getUser = async (req, res) => {
    try {
        const users = await User.find()//({ email: email }).lean()
        return res.send({ users })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.changeProfile = async (req, res) => {
    if (req.body != null) {
        //para alteração de senha
        if (req.body?.password)
            req.body.password = await bcrypt.hash(req.body?.password, 10)
        const filter = { _id: req.userId }
        try {
            const user = await User.findByIdAndUpdate(req.userId,
                ///VERIFICAR SE Quando é passado apenas o context então são alterados apenas os items existentes
                req.body
            ).lean()
            const message = "Chage Successufly"
            return res.send({ user, message })
        }
        catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}

exports.loginGoogle = async (req, res) => {
    const { email, name, photo, provider, token, uid } = req.body

    try {
        if (!email)
            return res.status(400).send({ message: 'Erro durante a comunicação com o google.' })

        let user = await User.findOne({ email: email })

        if (!user) {
            user = await User.create({
                name: name,
                email: email,
                authType: 'google',
                photo: photo,
            })
        }

        if (!user.active)
            return res.status(400).send({ message: 'User Disable, Click on forgot password to retrieve the user.' })

        await UpdLastAcess(user?._id)

        user.password = undefined;

        res.send({
            user,
            token: generateToken({ id: user._id }),
        })
    }
    catch (err) {
        return res.status(400).send({ message: 'login error', err: depure ? err.message : null })
    }
}