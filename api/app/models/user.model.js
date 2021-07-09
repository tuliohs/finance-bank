const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, unique: true, require: true, lowercase: true },
        password: { type: String, require: false, select: false },//'SELECT FALSE SIGNIFICA QUE NÃO SERÁ RETORNADO
        authType: {
            type: String,
            enum: ['default', 'google'],
            default: 'default',
            require: false
        }, //'facebook' |'' |
        profileImage: { type: mongoose.Types.ObjectId, ref: 'Media' },
        lastAcess: { type: Date, default: Date.now },
        //update user example
        //db.User.updateOne({_id: ObjectId("5fef940f7fb00934aae69d0a")},{$set: { authType: "default",active: true,firstName: "123",email: "123",password: "$2a$10$WthcOeIMUB.yTK6i4r5iS.mohsGQzblIRUf.k5D.vKGvnZ7QKaVIy", role: "admin"}})
        //Search user email db.User.find({},{email :1})
        //TORNAR USUARIO ADMIN db.User.update({email:'41'},{$set:{"role":"admin"}})
        active: { type: Boolean, default: true, },
    },
    { timestamps: true }
);

//-----PARA ALTERAR O NOME DO CAMPO DE "_ID" PARA "ID"
//UserSchema.method("toJSON", function () {
//    const { __v, _id, ...object } = this.toObject();
//    object.id = _id;
//    return object;
//});

//mongoose function used to execute actions before saved
UserSchema.pre('save', async function (next) {
    //se for autenticação externa então não faz nada com a senha
    if (this.authType !== 'default') return
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
})

module.exports = mongoose.model('User', UserSchema, 'User')
