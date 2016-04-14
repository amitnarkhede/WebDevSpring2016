(function(){
    angular
        .module("TheFilmDBApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope,$scope,UserService,$location){

        var currentUser= $rootScope.currentUser;
        var vm=this;

        function init(){

            if(!currentUser){
                $location.url("/login");
            }
            else{
                vm.message=null;
                vm.update=update;

                vm.firstname=currentUser.firstname;
                vm.lastname=currentUser.lastname;
                vm.username=currentUser.username;
                vm.password=currentUser.password;
                vm.email=currentUser.email;
                vm.phone=currentUser.phone;}
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

            console.log(updatedUser);
            var userId = currentUser._id;
            UserService
                .updateUser(userId,updatedUser)
                .then(function(user){
                    UserService.setCurrentUser(user);
                    $scope.message = "Profile updated successfully!";
                });
        };
    };
})();