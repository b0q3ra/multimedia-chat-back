const bcrypt = require("bcrypt");
const User = require('../../models/user')

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