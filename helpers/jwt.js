const jwt = require('jsonwebtoken');

const generalJWT = (uid) =>{
    return new Promise((resolve, reject)=> {
        const payload = { uid};
        jwt.sign(payload, process.env.JWT_KEY,{
        expiresIn: '24h'
        }, (err,token)=> {
        if(err){
            // no se pudo crear el token
            reject('No se pudo general el JWT');
        }
        else{
            //Token
            resolve(token);
        }
    })
    });

}

module.exports = {
    generalJWT
}