const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generalJWT } = require('../helpers/jwt');


const crearUsuario = async (req,res = response) => {
    const{email, password} = req.body;
    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El Correo Ya Esta Registrado'
            });
        }
        const usuario = new Usuario(req.body);
        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        //general mi JWT
        const token =await generalJWT(usuario.id);
        
        res.json({
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
   
}

const login = async(req,res=response)=>{
    const{email, password} = req.body;
    try {
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }
        //validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'contraseña no es valida'
            })
            

        }
        //general jwt 
        const token = await generalJWT(usuarioDB.id);
        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }


    

}
const renewToken = async (req, res = response) =>{
    //const uid uid del ususario
    const uid= req.id;
    //general un nuevo jwt
    const token= await generalJWT(uid);
    //obtener el usuario por el uid
    const usuario = await Usuario.findById(uid);
    res.json({
        ok:true,
        usuario,
        token
    })

}

module.exports = {
    crearUsuario,
    login,
    renewToken
}