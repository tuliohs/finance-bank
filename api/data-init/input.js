const fs = require('fs');
const moment = require('moment')
const UserModel = require('../app/models/user.model')

const addLog = (type, event, message) => {
    const separator = ' | '
    const newData = type + separator
        + event + separator
        + moment().locale('pt').format('LLLL') + separator
        //+ message.toString() 
        + "\r\n";

    fs.appendFile('log.txt', newData, function (err) {
        if (err) console.log('error in log generate ', err)
    })
}
//------primaryKey----Valor que será pesquisado para verificar duplicados---------------
//------duplicate-----Tratativa que deve ser feita com duplicados-----------------------
const createLote = async (Collection, event, array, primaryKeys = [], duplicate = "replace" | "ignore" | "duplicate") => {
    for (let ite of array) {
        let query = {} //colocando a query direto não deu certo
        for (let pk of primaryKeys)
            query[pk] = ite[pk];
        const exist = await Collection.findOne(query)
        if (!exist) {//verifica se existe
            await Collection.create(ite)
                .then(c => addLog('sucsess', event + " new file", c))
                .catch(e => addLog('error', event + " new file", e))
        }
        else {
            switch (duplicate) {
                case "replace":
                    await Collection.updateOne(query, ite)
                        .then(c => addLog('sucsess', event + " update file", c))
                        .catch(e => addLog('error', event + " update file", e))
                    break;
                case "ignore":
                    //...
                    break;
                case "duplicate":
                    await Collection.create(ite)
                        .then(c => addLog('sucsess', event + " new file", c))
                        .catch(e => addLog('error', event + " new file", e))
                    break;
            }
        }
    }
}

exports.init = async () => {

    //------------Modelo para criação de lote
    //let rawRout = fs.readFileSync(basePath.json + 'routes.json')
    //await createLote(RouteModel, 'Routes ', JSON.parse(rawRout), ["url"], "replace")

    //---------Criando um usuario chamado sense--------------
    //-------------------------------------------------------
    const queryUser = {
        name: "sense",
        email: "sense@gmail.com",
        password: '12345',
    }

    const userExist = await UserModel.findOne({ email: queryUser.email })
    if (!userExist) {
        await UserModel.create(queryUser)
            .then(c => addLog('sucsess', "create user admin", c))
            .catch(e => addLog('error', "create user admin", e))
    }
    else {
        await UserModel.updateOne({ name: queryUser['name'], email: queryUser['email'] })
            .then(c => addLog('warning', "Update user", c))
            .catch(e => addLog('error', "Update user", e))
    }
    const currentUser = await UserModel.findOne({ email: queryUser.email }).lean()
}