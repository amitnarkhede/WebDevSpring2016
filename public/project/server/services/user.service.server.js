/**
 * Created by amitv on 24-Mar-16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app,userModel) {
    var auth = authorized;

    //app.get("/api/project/user/:username/:password", findUserByCredentials);

    app.post('/api/project/login', passport.authenticate('local'), login);
    app.get("/api/project/user/:userid", findUserById);
    app.post("/api/project/register", register);
    app.post("/api/project/addfollowing",addFollowing);
    app.delete("/api/project/removefollowing/:userID/:followingID",removeFollowing);
    app.get("/api/project/following/:userID/:followingID",checkIfFollowed);
    app.put("/api/project/updateUser/:id",auth,updateUser);
    app.get("/api/project/alluser",auth, getAllUsers);
    app.delete("/api/project/user/:id",auth,deleteUser);
    app.get("/api/project/getfollowing/:userID",getFollowing);
    app.get("/api/project/getfollowers/:userID",getFollowers);
    app.post('/api/project/logout',logout);
    app.get("/api/project/loggedin", loggedIn);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function findUserByCredentials(req,res){
        var username=req.params.username;
        var password=req.params.password;

        userModel
            .findUserByCredentials(username,password)
            .then(function(user){
                    req.session.currentUser = user;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                });
    };

    function findUserById(req,res){
        var userid=req.params.userid;

        userModel
            .findUserById(userid)
            .then(function(user){
                    //req.session.currentUser = user;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                });
    };


    function register(req,res){
        var user = req.body;
        user.roles = ['endUser'];
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

    function addFollowing(req,res){
        //console.log(req.body);
        var details = req.body;

        //console.log(details);

        userModel
            .addFollowing(details)
            .then(
                //login in promise resolved
                function( doc ){
                    //console.log(doc);
                    res.json(doc);
                },
                //send error if promise rejected
                function( err ){
                    //console.log(err);
                    res.status(400).send(err);

                }
            );
    }

    function removeFollowing(req,res){

        var userID = req.params.userID;
        var followingID = req.params.followingID;

        userModel
            .removeFollowing(userID,followingID)
            .then(
                //login in promise resolved
                function( doc ){
                    //console.log(doc);
                    res.json(doc);
                },
                //send error if promise rejected
                function( err ){
                    //console.log(err);
                    res.status(400).send(err);

                }
            );
    }

    function checkIfFollowed(req,res){
        var userID = req.params.userID;
        var followingID = req.params.followingID;

        userModel
            .checkIfFollowed(userID,followingID)
            .then(function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                });

    }

    function getFollowing(req,res){
        var userID = req.params.userID;

        userModel
            .getFollowing(userID)
            .then(function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function getFollowers(req,res){
        var userID = req.params.userID;

        userModel
            .getFollowers(userID)
            .then(function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                });
    }


    function updateUser(req,res){
        var id=req.params.id;
        var updatedUser = req.body;

        userModel
            .findUserByUsername(updatedUser.username)
            .then(function(user){

                    if(user[0]){
                        //check if the password was updated by user and handle accordingly
                        if(user[0].password != updatedUser.password){
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

    function getAllUsers(req,res){
        userModel
            .getAllUsers()
            .then(function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                });

    }

    function deleteUser(req,res){
        userModel
            .deleteUser(req.params.id)
            .then(function(success){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                });
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
                },
                function (err) {
                    console.log(err);
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
        req.login(user,function(err){
            if(err){
                res.status(400).send(err);
            }else{
                res.json(user);
            }
        });
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

    function logout(req,res){
        req.logOut();
        res.send(200);
    }

    function loggedIn(req,res){
        res.send(req.isAuthenticated() ? req.user[0] : null);
    }
}