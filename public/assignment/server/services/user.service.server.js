module.exports = function(app,userModel) {
    app.get("/api/assignment/user/:username/:password", findUserByCredentails);
    app.post("/api/assignment/register", register);
    app.put("/api/assignment/updateUser/:id",updateUser);
    app.delete("/api/assignment/deleteUser/:id",deleteUser);
    app.get("/api/assignment/getAllUsers/",getAllUsers);
    app.get("/api/assignment/getUserByUserName/:username",getUserByUserName);
    app.get("/api/assignment/getUserById/:id",getUserById);


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
        var id=rq.params.id;
        var user=userModel.getUserById(id);
        return user;
    }
}