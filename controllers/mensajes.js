const Mensaje = require('../models/mensaje');
const obtenerChat = async(req,res)=>{
  const miId = req.uid;
  const mensajesDe = req.params.de;
  //console.log('de:'+ miId);
  //console.log('para:'+ mensajesDe);
  const last30 = await Mensaje.find({
    //$or: [{$and:[{de:miId},{para:mensajesDe}]},{$and:[{de:mensajesDe,para:miId}]}]
    $or: [{de:miId,para: mensajesDe}, {de: mensajesDe, para: miId}]
  })
  .sort({createdAt: "desc"})
  .limit(30);
  //console.log(last30);
  res.json({
    ok:true,
    mensajes: last30
  })
}

module.exports={
    obtenerChat
}