(function(){
    angular
        .module("TheFilmDBApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope,UserService,$location,$routeParams,FormService){

        var currentUser= $rootScope.currentUser;
        var profileUserId = $routeParams.userid;

        var vm=this;
        vm.edit = false;
        vm.readonly=false;
        vm.self=false;
        vm.toggleEdit = toggleEdit;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;
        vm.likeMovie = likeMovie;
        vm.removeLikeMovie = removeLikeMovie;
        vm.removeMovieActivity = removeMovieActivity;


        function init(){

            if(!currentUser){
                $location.url("/login");
            }
            else{
                if(profileUserId == $rootScope.currentUser._id) {
                    vm.self=true;
                    //console.log("UserID with logged in matched!");
                    vm.message = null;
                    vm.update = update;

                    vm.firstname = currentUser.firstname;
                    vm.lastname = currentUser.lastname;
                    vm.username = currentUser.username;
                    vm.password = currentUser.password;
                    vm.savedPassword = currentUser.password;
                    vm.email = currentUser.email;
                    vm.phone = currentUser.phone;
                    getMovies(profileUserId);
                    getFollowing(profileUserId);
                    getFollers(profileUserId);
                }
                else{
                    vm.readonly=true;
                    console.log("UserID with logged in did not matched!");
                    ifFollowed();
                    UserService
                        .findUserById(profileUserId)
                        .then(function(response){
                            console.log(response);
                            currentUser = response.data[0];

                            vm.firstname = currentUser.firstname;
                            vm.lastname = currentUser.lastname;
                            vm.username = currentUser.username;
                            //vm.password = currentUser.password;
                            vm.email = currentUser.email;
                            vm.phone = currentUser.phone;
                        },function(err){
                            console.log(err);
                        });

                    getMovies(profileUserId);
                    getFollowing(profileUserId);
                    getFollers(profileUserId);
                }

            }
        }

        init();

        function update(){

            if(vm.password != "") {

                var updatedUser = {
                    "_id": $rootScope.currentUser._id,
                    "username": vm.username,
                    "firstname": vm.firstname,
                    "lastname": vm.lastname,
                    "email": vm.email,
                    "password": vm.password,
                    "phone": vm.phone
                };

                //console.log(updatedUser);
                UserService.updateUser(updatedUser)
                    .then(function (response) {
                            //console.log(response.data[0]);
                            UserService.setCurrentUser(response.data[0]);
                            vm.message = "Profile updated successfully!";
                        },
                        function (err) {
                            console.log(err);
                        });
                toggleEdit();
            }else{
                vm.message = "Password can't be a blank value!"
            }
        };

        function toggleEdit(){
            vm.password = vm.savedPassword;
            vm.edit = !vm.edit;
            vm.message = null;
        }

        function getMovies(userid){
            UserService
                .getMovieLike(userid)
                .then(function(res){
                    //console.log(res.data);
                    if(res.data.length==0){
                        vm.movies = null;
                    }else{
                        vm.movies= res.data;
                        //console.log(vm.movies);
                    }

                });
        }

        function followUser(){

            var loggedinUser = $rootScope.currentUser;
            var profileUserName = vm.username;

            //console.log(loggedinUser._id ,loggedinUser.username,profileUserId,profileUserName)
            UserService
                .followUser(loggedinUser._id ,loggedinUser.username,profileUserId,profileUserName)
                .then(
                    function(res){
                        console.log(res);
                        ifFollowed();
                    },function(err){
                        console.log(err);
                    });
        }

        function unfollowUser(){

            var loggedinUser = $rootScope.currentUser;

            //console.log(loggedinUser._id ,profileUserId)
            UserService
                .unFollowUser(loggedinUser._id,profileUserId)
                .then(
                    function(res){
                        console.log(res);
                        ifFollowed();
                    },function(err){
                        console.log(err);
                    });
        }

        function ifFollowed(){
            var loggedinUser = $rootScope.currentUser;

            //console.log(loggedinUser._id ,profileUserId);
            UserService
                .checkIfFollowed(loggedinUser._id,profileUserId)
                .then(
                    function(res){
                        //console.log("CheckIfFollowed");
                        //console.log(res.data[0]);
                        if(res.data[0]){
                            vm.followed = true;
                        }else{
                            vm.followed = false;
                        }

                    },function(err){
                        console.log(err);
                    });
        }

        function getFollowing(userid){
            UserService
                .getFollowing(userid)
                .then(function(res){
                    //console.log("Following");
                    //console.log(res.data);
                    if(res.data.length==0){
                        vm.following = null;
                    }else{
                        vm.following = res.data;
                    }

                });
        }

        function getFollers(userid){
            UserService
                .getFollowers(userid)
                .then(function(res){
                    //console.log("Followers");
                    //console.log(res.data);
                    if(res.data.length==0){
                        vm.followers = null;
                    }else{
                        vm.followers = res.data;
                    }

                });
        }

        function likeMovie(movie){
            UserService
                .addMovieLike(movie,$rootScope.currentUser)
                .success(function(res){
                    init();
                },function(err){
                    console.log(err);
                });
        }

        function removeLikeMovie(movie){
            FormService
                .deleteFormById($rootScope.currentUser._id,movie.imdbID)
                .success(function(res){
                    init();
                },function(err){
                    console.log(err);
                });
        }

        function removeMovieActivity(movie){
            FormService
                .deleteMovieBookmark($rootScope.currentUser._id,movie.imdbID)
                .success(function(res){
                    init();
                },function(err){
                    console.log(err);
                });
        }


    };
})();