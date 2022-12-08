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
const comprobarJWT = (token = '')=>{
    try {
        const { uid} = jwt.verify(token, process.env.JWT_KEY);
        return [true,uid];
        
    } catch (error) {
        return [false,null]
        
    }

}

module.exports = {
    generalJWT,
    comprobarJWT
}