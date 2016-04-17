(function(){
    angular
        .module("TheFilmDBApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope,$scope,UserService,$location,$routeParams){

        var currentUser= $rootScope.currentUser;
        var profileUserId = $routeParams.userid;

        var vm=this;
        vm.edit = false;
        vm.readonly=false;
        vm.self=false;
        vm.toggleEdit = toggleEdit;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;


        function init(){

            if(!currentUser){
                $location.url("/login");
            }
            else{
                if(profileUserId == $rootScope.currentUser._id) {
                    vm.self=true;
                    console.log("UserID with logged in matched!");
                    vm.message = null;
                    vm.update = update;

                    vm.firstname = currentUser.firstname;
                    vm.lastname = currentUser.lastname;
                    vm.username = currentUser.username;
                    vm.password = currentUser.password;
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
                            vm.password = currentUser.password;
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

            var updatedUser= {"_id":currentUser._id,
                "username" : vm.username,
                "firstname": vm.firstname,
                "lastname": vm.lastname,
                "email" : vm.email,
                "password" : vm.password,
                "phone" : vm.phone};

            //console.log(updatedUser);
            var userId = currentUser._id;
            UserService.updateUser(userId,updatedUser)
                .then(function(response){
                        //console.log(response.data[0]);
                        UserService.setCurrentUser(response.data[0]);
                        $scope.message = "Profile updated successfully!";
                    },
                    function(err){
                        console.log(err);
                    });
            toggleEdit();
        };

        function toggleEdit(){
            vm.edit = !vm.edit;
        }

        function getMovies(userid){
            UserService
                .getMovieLike(userid)
                .then(function(res){
                    console.log(res.data);
                    if(res.data.length==0){
                        vm.movies = null;
                    }else{
                        vm.movies= res.data;
                    }

                });
        }

        function followUser(){

            var loggedinUser = $rootScope.currentUser;
            var profileUserName = vm.username;

            console.log(loggedinUser._id ,loggedinUser.username,profileUserId,profileUserName)
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

            console.log(loggedinUser._id ,profileUserId)
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

            console.log(loggedinUser._id ,profileUserId);
            UserService
                .checkIfFollowed(loggedinUser._id,profileUserId)
                .then(
                    function(res){
                        console.log("CheckIfFollowed");
                        console.log(res.data[0]);
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
                    console.log("Following");
                    console.log(res.data);
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
                    console.log("Followers");
                    console.log(res.data);
                    if(res.data.length==0){
                        vm.followers = null;
                    }else{
                        vm.followers = res.data;
                    }

                });
        }
    };
})();