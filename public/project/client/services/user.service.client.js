(function(){
    angular
        .module("TheFilmDBApp")
        .factory("UserService",UserService);

    function UserService($http,$rootScope){

        var userMovieLikes = [
            {
                "user_id":123,
                "movieTitle": "Star Wars",
                "imdbID" : 'tt0076759',
                "poster" : "http://ia.media-imdb.com/images/M/MV5BMTU4NTczODkwM15BMl5BanBnXkFtZTcwMzEyMTIyMw@@._V1_SX300.jpg",
                "comments" : ""
            }
        ];

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

        function deleteUserById(userId, callback){

            for(index = 0; index < users.length; index++){

                if (users[index]._id == userId){
                    users.splice(i,1);
                }
            }

            callback(users);
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

            userMovieLikes.push(movieLike);
            //console.log(userMovieLikes);

        };

        function getMovieLike(userID,callback){
            var movies = [];

            for(index = 0; index < userMovieLikes.length; index++){
                if(userMovieLikes[index].user_id == userID){
                    movies.push(userMovieLikes[index]);
                }
            }

            callback(movies);
        }
    }
})();