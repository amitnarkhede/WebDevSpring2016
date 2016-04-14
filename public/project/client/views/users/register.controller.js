(function(){
    angular
        .module("TheFilmDBApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($rootScope,$scope,$location,UserService){
        $scope.register = register;
        newUser = $scope.user;

        function register(newUser){
            //console.log($scope.user);
            if(newUser != null){

                UserService
                    .createUser(newUser)
                    .then(function(user){
                        UserService.setCurrentUser(user);
                        $location.url("/profile");
                    });



            }
        };
    };
})();