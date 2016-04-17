(function(){
    angular
        .module("TheFilmDBApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope){

        var service = {
            findUserByCredentials:findUserByCredentials,
            findAllUsers:findAllUsers,
            findUserById:findUserById,
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

        function findUserById(userId){

            return $http.get("/api/project/user/" + userId);
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
                $rootScope.currentUser = user;
            }
        };

        function deleteUserById(userId){
            return $http.delete("/api/project/user/"+userId);
        };

        function updateUser(userId,updatedUser){
            //console.log(userId);
            return $http.put("/api/project/updateUser/"+userId,updatedUser);
        };


        function addMovieLike(movieDetals,userDetails){

            var movieLike = {
                "imdbID":movieDetals.imdbID,
                "movieTitle":movieDetals.Title,
                "poster":movieDetals.Poster,
                "userID":userDetails._id,
                "username":userDetails.username,
                "comment":"",
                "created": (new Date()).getTime()
            };

            return $http.post("/api/project/addmovielike",movieLike);
        };


        function getMovieLike(userID){

            return $http.get("/api/project/getmovielike/"+userID);

        };
    }
})();