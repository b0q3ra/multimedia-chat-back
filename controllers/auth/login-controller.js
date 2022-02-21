const bcrypt = require("bcrypt");
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {//login function
    try {

        /*Extract and Validate Data */
        let email = req.body.email//get data
        let password = req.body.password     
        
        if(!email || !password) throw "All params are required"//validate data

        /*Pocess Data */
        let user = await User.findOne({ email })

        if(!user) throw "Error with the db"

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) throw "The password is not valid"

        /*Generate JWT token */
        const payload = {id: user._id, email: user.email, hash: user.password}//create payload and sign it
        let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600*24})
        
        if(!token) throw 'Error while generating the JWT token'
        user.token = token
        user.save()

        /*Retrun Data */
        user = user.toJSON()
        res.json({
            status: 'success',
            data: user
        })

    } catch (error) {
        res.json({
            status: 'failed', 
            error: error
        })
    }
}

module.exports = login