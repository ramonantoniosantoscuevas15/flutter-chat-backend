const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        requiered: true
    },
    email:{
        type: String,
        requiered: true,
        unique: true
    },
    password:{
        type: String,
        requiered: true
    },
    online:{
        type: Boolean,
        default: false
    },

});
UsuarioSchema.method('toJSON', function(){
    const {__v,_id,password, ...Object} = this.toObject();
    Object.uid = _id;
    return Object;

});
module.exports = model('Usuario', UsuarioSchema);