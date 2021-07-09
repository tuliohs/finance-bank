const mongoose = require('mongoose')

const OperacaoSchema = mongoose.Schema(
    {
        class: {
            type: String,
            enum: ['saida', 'entrada'],
            require: true
        },
        type: {
            type: String,
            enum: ['transfer', 'deposit', 'pay'],
            require: true
        },
        valor: { type: String, require: true },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        category: { String, required: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Operacao', OperacaoSchema, 'Operacao')
