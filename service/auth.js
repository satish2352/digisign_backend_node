const jwt=require('jsonwebtoken')
require('dotenv').config();
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
const JWT_EXPIRES=process.env.JWT_EXPIRES;

async function setUser(user){
    try {
        console.log(user)
        console.log(JWT_SECRET_KEY)
        const payload={_id:user._id,email:user.email};
        return jwt.sign(payload, JWT_SECRET_KEY);
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function verifyUser(token){
  try {
      if(!token)
          {
              return null;
          }
      return jwt.verify(token,JWT_SECRET_KEY);
  } catch (error) {
    console.log(error)
    return null;
  }
}

module.exports={
    setUser,verifyUser
}






