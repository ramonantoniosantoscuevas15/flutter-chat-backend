const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {usuarioConectado,usuarioDesconectado, grabarMensaje} = require('../controllers/socket');
//mensajes de sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');
    const [valido,uid]= comprobarJWT(client.handshake.headers['x-token'])
    //verificar autenticacion
    if(!valido){return client.disconnect();}
    //cliente autenticado
    usuarioConectado(uid);

    //ingresar al usuario a una sala en particular
    //sala global
    client.join(uid);
    //escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async(payload)=>{
      //grabar mensaje
      await grabarMensaje(payload);
      io.to(payload.para).emit('mensaje-personal', payload);
      
    })
    
    
    client.on('disconnect', () => {
        usuarioDesconectado(uid);
     });
    
   // client.on('mensaje', ( payload)=>{
       // console.log('mensaje',payload);
        //io.emit('mensaje', {admin: 'Nuevo Mensaje'});

    //});
  });