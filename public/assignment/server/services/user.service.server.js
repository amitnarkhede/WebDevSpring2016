module.exports = function(app) {

    app.get("/api/assignment/username=:username&password=:password", findUserByCredentials);

    function findUserByCredentials(req, res) {

        var username = req.param.username;
        var password = req.param.password;

        var credentials = {"username" : username, "password" : password};
        console.log(credentials);
        res.send(200);
    }
};