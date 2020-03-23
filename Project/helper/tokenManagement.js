const jwt=require('jsonwebtoken');

function encode(data){
    return jwt.sign(data,"SuperSecretKey",{expiresIn:'1h'});
}

function verify(token){
    return jwt.verify(token,"SuperSecretKey")
}

module.exports={
    encode,
    verify
}