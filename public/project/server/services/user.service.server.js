/**
 * Created by amitv on 24-Mar-16.
 */

module.exports = function(app,userModel) {
    app.get("/api/project/user/:username/:password", findUserByCredentials);
    app.post("/api/project/register", createUser);
    app.put("/api/project/updateUser/:id",updateUser);


    function findUserByCredentials(req,res){

        var username=req.params.username;
        var password=req.params.password;

        var user = userModel.findUserByCredentials(username,password);
        res.json(user);
    };

    function createUser(req,res){
        //console.log(req.body);
        newUser = userModel.createNewUser(req.body);
        res.json(newUser);
    };

    function updateUser(req,res){
        var id = req.params.id;
        var updatedUserDetails = req.body;
        var updatedUser = userModel.updateUser(id,updatedUserDetails);
        res.json(updatedUser);
    };
}