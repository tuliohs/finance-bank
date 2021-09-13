const OperationModel = require('../models/operacao.model')

const businessPanding = (reqBody, userId) => {
    switch (reqBody?.type) {
        case 'deposit':
            return { ...reqBody, class: 'saida', receiver: userId, category: 'Deposito', creator: userId }
        case 'transfer':
            return { ...reqBody, class: 'saida', sender: userId, category: 'Transferencia', creator: userId }
        case 'pay':
            return { ...reqBody, class: 'entrada', sender: userId, creator: userId }
    }
}
exports.registro = async (req, res) => {
    const reqBody = req.body;
    let newOperacao = businessPanding(reqBody, req.userId)
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
        let operations = await OperationModel
            .find()
            .sort({ createdAt: -1 })
            .populate("receiver")
            .populate("sender")
            .populate("creator")
            .lean()

        //---------adicionado o nome banco as operações sem destinatario um remetente
        const banco = { name: "BancoF" }

        for (var el of operations) {
            el['tipo'] = el.receiver?._id?.toString() === req.userId ? "entrada" : el.sender?._id?.toString() !== req.userId ? "Outros Usuários" : "saída"
            el.transation = el.type === "deposit" ? "Depósito" : el.type === "transfer" ? "Transferência" : "Pagamento"
            if (!el?.receiver)
                el.receiver = banco
            if (!el?.sender)
                el.sender = banco
        }
        return res.status(200).send({ operations })
    }
    catch (err) {
        return res.status(400).send({ message: 'Error in get operations ' + err })
    }
}