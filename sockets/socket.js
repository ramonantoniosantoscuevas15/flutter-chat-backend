const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {usuarioConectado,usuarioDesconectado} = require('../controllers/socket');
//mensajes de sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');
    const [valido,uid]= comprobarJWT(client.handshake.headers['x-token'])
    //verificar autenticacion
    if(!valido){return client.disconnect();}
    //cliente autenticado
    usuarioConectado(uid);
    
    
    client.on('disconnect', () => {
        usuarioDesconectado(uid);
     });
    
   // client.on('mensaje', ( payload)=>{
       // console.log('mensaje',payload);
        //io.emit('mensaje', {admin: 'Nuevo Mensaje'});

    //});
  });