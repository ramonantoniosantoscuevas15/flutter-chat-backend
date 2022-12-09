const {Schema, model} = require('mongoose');

const MensajeSchema = Schema({
    de:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        requiered: true
    },
    para:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        requiered: true
    },
    mensaje:{
        type: String,
        require: true
    }
    

},{
    timestamps: true
});
MensajeSchema.method('toJSON', function(){
    const {__v,_id, ...Object} = this.toObject();
    return Object;

});
module.exports = model('Mensaje', MensajeSchema);