var mock = require("./user.mock.json");

module.exports= function(){

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        createNewUser :createNewUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        getUserByUserName:getUserByUserName,
        getUserById:getUserById
    }
        return api;

    function findUserByCredentials(username,password) {
        for(var u in mock) {
                      if( mock[u].username == username &&
                                mock[u].password == password) {
                               return mock[u];
                            }
                   }
                return null;
        }

    function findUserByUsername(userName){
        for(var u in mock){
            if(mock[u].username=== userName){
                return mock[u];
            }
            return null;
        }
    }

    function createNewUser(userDetails){
        var oldUser= findUserByUsername(userDetails.username);
        if(oldUser== null){
            userDetails._id =  (new Date()).getTime();
            mock.push(userDetails);
                    return userDetails;
        }
        return null;
    }

    function updateUser(id,updatedUserDetails) {

        //we need to check if userName is unique here
        for (var u in mock) {
            if (mock[u]._id == id) {
                mock[u] = updatedUserDetails;
                mock[u].email = updatedUserDetails.email;
                return mock[u];
            }
        }
    }

        function deleteUser(id) {
            for (var u in mock) {
                if (mock[u]._id == id) {
                    mock.splice(u, 1);
                }
            }
        }

    function getAllUsers(){
        return mock;
    }

    function getUserByUserName(username){
        for (var u in mock) {
            if (mock[u].username == username) {
                return mock[u];
            }
        }
        return null;
    }

    function getUserById(id){
        for (var u in mock) {
            if (mock[u]._id == id) {
                return mock[u];
            }
        }
        return null;
    }


}


