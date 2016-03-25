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

        //function findUserByCredentials(username, password, callback){
        //    loggedInUser = null;
        //    for(index = 0; index < users.length; index++){
        //
        //        if (users[index].username == username && users[index].password == password){
        //            loggedInUser = users[index];
        //            break;
        //        }
        //    }
        //    //console.log(users);
        //    callback(loggedInUser);
        //};

        function findUserByCredentials(username,password){
            //var credentials = {"username" : username, "password" : password};
            //console.log(credentials);
            return $http.get("/api/project/user/" + username + "/" + password);
        }

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

        function addMovieLike(imdbID,poster,title,userID){
            //console.log(imdbID+poster+title+userID);
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