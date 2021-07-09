const OperationModel = require('../models/operacao.model')

const generatePayClass = (type) => {
    switch (type) {
        case 'deposit': return 'saida';
        case 'transfer': return 'saida';
        case 'pay': return 'entrada';
    }
}
exports.registro = async (req, res) => {
    const reqBody = req.body;
    const classe = generatePayClass(reqBody?.type)
    const newOperacao = { ...reqBody, class: classe, sender: req.userId }
    try {
        const resultado = await OperationModel.create(newOperacao)
        return res.status(200).send({ message: 'Operação realizada com sucesso', data: resultado })

    }
    catch (err) {
        return res.status(400).send({ message: 'Error in Operation ' + err })
    }
}
exports.getAllOperations = async (req, res) => {
    try {
        const operations = await OperationModel.find()
        return res.status(200).send({ operations })
    }
    catch (err) {
        return res.status(400).send({ message: 'Error in get operations ' + err })
    }
}