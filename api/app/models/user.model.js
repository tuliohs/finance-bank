const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, unique: true, require: true, lowercase: true },
        password: { type: String, require: false, select: false },//'SELECT FALSE SIGNIFICA QUE NÃO SERÁ RETORNADO
        authType: {
            type: String,
            enum: ['default', 'facebook'],
            default: 'default',
            require: false
        }, //'facebook' |'' |
        phone: { type: String, require: false },

        //address block
        address: { type: String, require: false },
        postalNumber: { type: String, require: false },
        complement: { type: String, require: false },
        district: { type: String, require: false },
        city: { type: String, require: false },
        state: { type: String, require: false },
        country: { type: String, require: false },
        landmark: { type: String, require: false },

        postalCode: { type: String, require: false },
        profileImage: { type: mongoose.Types.ObjectId, ref: 'Media' },
        resetPass: { type: Boolean, },
        lastAcess: { type: Date, default: Date.now },
        //update user example
        //db.User.updateOne({_id: ObjectId("5fef940f7fb00934aae69d0a")},{$set: { authType: "default",active: true,firstName: "123",email: "123",password: "$2a$10$WthcOeIMUB.yTK6i4r5iS.mohsGQzblIRUf.k5D.vKGvnZ7QKaVIy", role: "admin"}})
        //Search user email db.User.find({},{email :1})
        //TORNAR USUARIO ADMIN db.User.update({email:'41'},{$set:{"role":"admin"}})
        active: { type: Boolean, default: true, },
        companies: [
            {
                company: { type: mongoose.Types.ObjectId, ref: 'Company' },
                profiles: [{ type: mongoose.Types.ObjectId, ref: 'Profiles' }]
            }],
        profiles: [{ type: mongoose.Types.ObjectId, ref: 'Profiles' }],
        routes: [{ type: mongoose.Types.ObjectId, ref: 'Routes' }]
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
