(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http){

        var model = {

            setCurrentUser : setCurrentUser,
            updateUser : updateUser,
            //  deleteUserById : deleteUserById,
            findAllUsers : findAllUsers,
            findUserByCredentials:findUserByCredentials,
            login:login,
            logout:logout,
            register: register,
            getAllUsers:getAllUsers,
            getUserById:getUserById,
            deleteUser:deleteUser
        };
        return model;

        function setCurrentUser(user){

            $rootScope.currentUser=user;
        }

        function findAllUsers(callback) {
            callback(users);
        }


        function findUserByCredentials(credentials){
            return $http.get("/api/assignment/user/"+credentials.username+"/"+credentials.password);
        }

        function login(credentials){
            return $http.post("/api/assignment/login",credentials);
        }

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function register(user){
            return $http.post("/api/assignment/register", user);
        }

        function updateUser(user){
            return $http.put("/api/assignment/updateUser/"+user._id,user);
        }

        function deleteUser(userId){
            //console.log("DELETE" + user);
            return $http.delete("/api/assignment/deleteUser/"+userId);
        }

        function getAllUsers(){
            return $http.get("/api/assignment/getAllUsers/");
        }

        function getUserByUserName(username){
            return $http.get("/api/assignment/getUserByUserName/"+username);
        }

        function getUserById(id){
            return $http.get("/api/assignment/getUserById/"+id);
        }
    }
})();


