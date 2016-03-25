/**
 * Created by amitv on 24-Mar-16.
 */

module.exports = function(app,userModel) {
    app.get("/api/project/user/:username/:password", findUserByCredentials);


    function findUserByCredentials(req,res){

        var username=req.params.username;
        var password=req.params.password;

        var user = userModel.findUserByCredentials(username,password);
        res.json(user);
    };
}