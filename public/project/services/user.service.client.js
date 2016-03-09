(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService(){

        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        var service = {
            findUserByCredentials:findUserByCredentials,
            findAllUsers:findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser
        };

        return service;

        function findUserByCredentials(username, password, callback){
            loggedInUser = null;
            for(index = 0; index < users.length; index++){

                if (users[index].username == username && users[index].password == password){
                    loggedInUser = users[index];
                    break;
                }
            }
            //console.log(users);
            callback(loggedInUser);
        };

        function findAllUsers(callback){

            callback(users);

        };

        function createUser(user, callback){
            var newUser = {
                "_id":(new Date).getTime(),
                "firstName": "",
                "lastName":"",
                "username":user.username,
                "password":user.password,
                "email": user.email,
                "roles": "student"
            };

            users.push(newUser);

            callback(newUser);
        };

        function deleteUserById(userId, callback){

            for(index = 0; index < users.length; index++){

                if (users[index]._id == userId){
                    users.splice(i,1);
                }
            }

            callback(users);
        };

        function updateUser(userId, user, callback){
            for(index = 0; index < users.length; index++){

                if (users[index]._id == userId){
                    users[index] = user;
                    break;
                }
            }
            //console.log(users);
            callback(users[index]);
        };
    }
})();