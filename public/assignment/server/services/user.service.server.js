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
        var user=userModel.findUserByCredentials(username,password);
        res.json(user);
    }

    function register(req,res){
        var userDetails = req.body;
        var newUser=userModel.createNewUser(userDetails);
        res.json(newUser);

    }

    function updateUser(req,res){
        var id=req.params.id;
        var updatedUserDetails = req.body;
        var updatedUser=userModel.updateUser(id,updatedUserDetails);
        res.json(updatedUser);
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