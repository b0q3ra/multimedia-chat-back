const User = require('../../models/user')

exports.getAllChats = async (req, res) => {
    try {

        let users = await User.find({})//return all users
        
        if(!users) throw 'Error, no users finded'
        
        res.json({//return response
            status: 'success',
            data: users
        })

    } catch (error) {//Error
        res.json({
            status: 'failed',
            data: error
        })
    }


}

