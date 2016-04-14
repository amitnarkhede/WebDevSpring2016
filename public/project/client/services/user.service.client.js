(function(){
    angular
        .module("TheFilmDBApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope){

        var service = {
            findUserByCredentials:findUserByCredentials,
            findAllUsers:findAllUsers,
            createUser:createUser,
            setCurrentUser : setCurrentUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            addMovieLike:addMovieLike,
            getMovieLike:getMovieLike
        };

        return service;

        function findUserByCredentials(username,password){

            return $http.get("/api/project/user/" + username + "/" + password);
        }

        function findAllUsers(callback){

            var users = $http("/api/project/alluser");
            callback(users);

        };

        function createUser(user){
            return $http.post("/api/project/register", user);
        };

        function setCurrentUser(user){
            if(user){
                $rootScope.user = user;
            }
        };

        function deleteUserById(userId){

            return $http.delete("/api/project/user/"+userId);
        };

        function updateUser(userId,updatedUser){
            return $http.put("/api/project/updateUser/"+userId,updatedUser);
        };


        function addMovieLike(imdbID,poster,title,userID){

            var movieLike = {
                "user_id":userID,
                "movieTitle":title,
                "imdbID":imdbID,
                "poster":poster,
                "comments":""
            };

            return $http.post("/api/project/addmovielike",movieLike);
        };


        function getMovieLike(userID){

            return $http.get("/api/project/getmovielike/"+userID);

        };
    }
})();