(function(){
    angular
        .module("TheFilmDBApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope){

        var service = {
            findUserByCredentials:findUserByCredentials,
            login:login,
            logout:logout,
            getAllUsers:getAllUsers,
            findUserById:findUserById,
            createUser:createUser,
            setCurrentUser : setCurrentUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            addMovieLike:addMovieLike,
            getMovieLike:getMovieLike,
            getAllMovieActivity:getAllMovieActivity,
            followUser:followUser,
            unFollowUser:unFollowUser,
            checkIfFollowed:checkIfFollowed,
            getFollowing:getFollowing,
            getFollowers:getFollowers
        };

        return service;

        function findUserByCredentials(username,password){

            return $http.get("/api/project/user/" + username + "/" + password);
        }

        function login(credentials){

            return $http.post("/api/project/login",credentials);
        }

        function logout(){

            return $http.post("/api/project/logout");
        }

        function findUserById(userId){

            return $http.get("/api/project/user/" + userId);
        }

        function getAllUsers(){

            return $http.get("/api/project/alluser");
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

        function updateUser(updatedUser){
            userId = updatedUser._id;
            console.log(userId);
            console.log(updatedUser);
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

        function getAllMovieActivity(userID){
            return $http.get("/api/project/getallmovielike/"+ userID);
        }

        function followUser(userID,username,follow_userID,follow_username){
            var follow = {"follower_id" : userID,
                "follower_username" : username,
                "following_id" : follow_userID,
                "following_username" : follow_username
            };

            return $http.post("/api/project/addfollowing",follow);
        };

        function unFollowUser(userID,follow_userID){

            return $http.delete("/api/project/removefollowing/"+userID+"/"+follow_userID);
        };

        function checkIfFollowed(userId,followingId){

            return $http.get("/api/project/following/"+userId+"/"+followingId);
        };

        function getFollowing(userID){
            return $http.get("/api/project/getfollowing/"+userID);
        }

        function getFollowers(userID){
            return $http.get("/api/project/getfollowers/"+userID);
        }
    }
})();