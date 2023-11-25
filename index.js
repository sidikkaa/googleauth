//lets get started with api
import passport from "passport";
import express from "express";
import session from "express-session"
import dotenv from "dotenv";
import mongoose from "mongoose";
import './auth.js';
dotenv.config();
//to check whether user logged in or not(middleware)
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
//initialize our app
const app = express();
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
//connection to db
async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("sucessfully connected to db");
    }
    catch (error) {
        console.log(error);
    }
}
connectToDb();
app.get("/:id", async (req, res) => {
    res.send("the id i specified is" + req.params.id);
});
//create a route 
app.get('/', (req, res) => {
    res.sendFile("C:/Users/ADMIN/Desktop/passport js/dist/index.html");
})
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);
app.get('/auth/failure', (req, res) => {
    res.send('not authenticated user');

});

app.get('/protected', isLoggedIn, (req, res) => {
    res.send('hello sidikkaa!');
})
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('byee byee!');

});
app.listen(3000, () => {
    console.log('listening on 3000');
})