const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = require('../models/user')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {

        //console.log(jwt_payload)
        
        try {
            let user = await User.findById(jwt_payload.id)  //search user by id in db
            
            if(user){ return done(null, user) }             //if user exists, pass user to controller

            return done(null, false)                        //if user doesn't exist, pass false

        } catch (error) {
            console.log(error)                              //log error
        }

    }))
}