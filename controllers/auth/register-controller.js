const bcrypt = require("bcrypt");
const User = require('../../models/user')

const register = async (req, res) => {//register controller
    try {

        /*Extract and Validate Data */
        let email = req.body.email//get data
        let password = req.body.password
        let confirmPassword = req.body.confirmPassword       
        
        if(!email || !password || !confirmPassword) throw "All params are required"//validate data
        if(password !== confirmPassword) throw "Passwords must be equal"

        /*Pocess Data */
        let user = await User.create({
            email: email,
            password: await bcrypt.hash(password, 10)
        })

        if(!user) throw "Error with the db"

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

module.exports = register