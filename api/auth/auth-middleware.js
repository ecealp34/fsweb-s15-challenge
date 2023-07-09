const { HASH_ROUND } = require('../../secrets');
const userModel = require('../users/user-model');
const bcrypt = require('bcryptjs')


async function usernameVarMi(req,res,next) {
    const { username } = req.body;
    const user = await userModel.getByFilter({ username: username})
    if(!user) {
        res.status(401).json({ message: 'User tanımlı degil'})
    } else {
        req.user = user;
        next()
    }
}

async function usernameBosMu(req,res,next) {
    const { username, password } = req.body;
    const user = await userModel.getByFilter({ username: username})
    if(user) {
        res.status(422).json({ message: 'Username alınmış'})
    } else {
        const hashedPassword = bcrypt.hashSync(password, HASH_ROUND);
        req.hashedPassword = hashedPassword;
        next()
    }
}

module.exports = { usernameVarMi, usernameBosMu }
