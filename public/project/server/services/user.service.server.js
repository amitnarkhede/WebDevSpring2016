/**
 * Created by amitv on 24-Mar-16.
 */

module.exports = function(app,userModel) {
    app.get("/api/project/user/:username/:password", findUserByCredentials);
    app.get("/api/project/user/:userid", findUserById);
    app.post("/api/project/register", createUser);
    app.post("/api/project/addfollowing",addFollowing);
    app.delete("/api/project/removefollowing/:userID/:followingID",removeFollowing);
    app.get("/api/project/following/:userID/:followingID",checkIfFollowed);
    app.put("/api/project/updateUser/:id",updateUser);
    app.get("/api/project/alluser", getAllUsers);
    app.delete("/api/project/user/:id",deleteUser);
    app.get("/api/project/getfollowing/:userID",getFollowing);
    app.get("/api/project/getfollowers/:userID",getFollowers);

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

    function createUser(req,res){
        //console.log(req.body);
        var user = req.body;

        userModel
            .createNewUser(user)
            .then(
                //login in promise resolved
                function( doc ){
                    //console.log(doc);
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                //send error if promise rejected
                function( err ){
                    //console.log(err);
                    res.status(400).send(err);

                }
            );
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
        var id = req.params.id;
        var updatedUserDetails = req.body;

        //console.log(id);
        //console.log(updatedUserDetails);

        userModel
            .updateUser(id,updatedUserDetails)
            .then(function(doc){
                    userModel
                        .findUserById(id)
                        .then(function(user){
                            //console.log(user);
                            req.session.currentUser = user;
                            res.send(user);
                        })
                },
                function (err) {
                    res.status(400).send(err);
                });
    };

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
}