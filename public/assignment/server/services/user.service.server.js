var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app,userModel) {
    var auth = authorized;

    //app.get("/api/assignment/user/:username/:password", findUserByCredentails);
    app.post("/api/assignment/register",auth, register);
    app.put("/api/assignment/updateUser/:id",auth,updateUser);
    app.delete("/api/assignment/deleteUser/:id",auth,deleteUser);
    app.get("/api/assignment/getAllUsers/",auth,getAllUsers);
    app.get("/api/assignment/getUserByUserName/:username",getUserByUserName);
    app.get("/api/assignment/getUserById/:id",getUserById);
    app.post('/api/assignment/login', passport.authenticate('local'), login);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



    function findUserByCredentails(req,res){
        var username=req.params.username;
        var password=req.params.password;

        userModel
            .findUserByCredentials(username,password)
            .then(
                //login if promise resolved
                function( doc ){
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                //send error if promise rejected
                function( err ){
                    res.status(400).send(err);

                }
            );
    }

    function register(req,res){
        var user = req.body;
        user.roles = ['student'];
        userModel
            .createNewUser(user)
            .then(
                //login if promise resolved
                function( doc ){
                    //console.log(doc);
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                //send error if promise rejected
                function( err ){
                    res.status(400).send(err);

                }
            );
    }


    function updateUser(req,res){
        var id=req.params.id;
        var updatedUserDetails = req.body;

        userModel
            .updateUser(id,updatedUserDetails)
            .then(
                //login in promise resolved
                function( doc ){
                    //console.log(doc);
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                //send error if promise rejected
                function( err ){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req,res){
        var id=req.params.id;
        userModel.deleteUser(id);
    }

    function getAllUsers(req,res){
        userModel.getAllUsers(id);
    }

    function getUserByUserName(req,res){
        var username=req.params.username;
        var user = userModel.getUserByUserName(username);
        res.json(user);
    }

    function getUserById(req,res){
        var id=req.params.id;
        var user=userModel.getUserById(id);
        res.json(user);
    }

    //Changes for integrating PassportJS

    function localStrategy(username, password, done) {
        //console.log(username,password);
        userModel.findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user[0].password)) {
                        return done(null, user[0]);
                    }else {
                        return done(null, false);
                    }
                } ,
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true;
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
}