var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app,userModel) {
    var auth = authorized;

    //app.get("/api/assignment/user/:username/:password", findUserByCredentails);
    app.post("/api/assignment/register", register);
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
            .findUserByUsername(user.username)
            .then(function(newUser){
                if(newUser[0]){
                    res.json(null);
                }else{
                    user.password = bcrypt.hashSync(user.password);
                    return userModel.createNewUser(user);
                }
            })
            .then(function(user){
                    if(user){
                        req.login(user,function(err){
                            if(err){
                                res.status(400).send(err);
                            }else{
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                });
    }


    function updateUser(req,res){
        var id=req.params.id;
        var updatedUser = req.body;

        console.log("Debug on server update");

        userModel
            .findUserByUsername(updatedUser.username)
            .then(function(user){

                    if(user[0]){
                        //check if the password was updated by user and handle accordingly
                        if(user[0].password != updatedUser.password && !bcrypt.compareSync(user[0].password, updatedUser.password)){
                            updatedUser.password = bcrypt.hashSync(updatedUser.password);
                        }

                        userModel
                            .updateUser(id,updatedUser)
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
                            )
                    }else{
                        res.status(400).send(err);
                    }
                },
                function(err){
                    res.status(400).send(err);
                });
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
        //console.log(bcrypt.hashSync(password));
        userModel.findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user[0].password)) {
                        //console.log(user[0]);
                        return done(null, user[0]);
                    }else {
                        //console.log("False");
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
        //console.log("This is "+ user);
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