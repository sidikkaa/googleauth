import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';
passport.use(new GoogleStrategy({
    clientID:"76022859828-96hec79esos6u1guuijl5ahjqep2npuu.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL:"http://localhost:3000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    
      return done(null, profile);
  }
));
passport.serializeUser(function(user,done){
    done(null,user);

});
passport.deserializeUser(function(user,done){
    done(null,user);

}); 
