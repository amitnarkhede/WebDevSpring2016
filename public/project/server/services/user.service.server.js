/**
 * Created by amitv on 24-Mar-16.
 */
module.exports = function(app,userModel) {
    app.post("/api/project/user", findUserByCredentials);

    function findUserByCredentials(req,res){

        var credentials = req.body;

        var username=credentials.username;
        var password=credentials.password;
        var user = userModel.findUserByCredentials(username,password);
        //console.log(user);
        res.json(user);
    };

    /*function findUserByCredentials(req, res) {
        console.log(req.params.username);
        var credentials = req.body;
        console.log(credentials);
        res.send(200);
    }*/
}