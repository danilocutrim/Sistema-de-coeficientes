const Icrud = require('../interfaces/interfaceCrud')
class ContextStrategy extends Icrud {
    // falar no constructor qual a minha estratégia de banco de dados
    constructor(database){
        super()
        this._database = database
    }
    isConnected(){
        return this._database.isConnected()
    }
    create(item){
        return this._database.create(item)
    }
    read(item,skip,limit){
        return this._database.read(item,skip,limit)
    }
    update(id, item){
        return this._database.update(id, item)
    }
    delete(item){
        return this._database.delete(item)
    }
    addToArray(id,item){
        return this._database.addToArray(id,item)
    }

    static connect(){
        return this._database.connect()
    }
}

module.exports = ContextStrategy