var passport = require('passport'),
	 Credential = require('../model/credential'),
	 LocalStrategy = require('passport-local').Strategy;

//passport.use(Credential.createStrategy());
passport.use(new LocalStrategy(Credential.authenticate()));
passport.serializeUser(Credential.serializeUser());
passport.deserializeUser(Credential.deserializeUser());
module.exports = passport;