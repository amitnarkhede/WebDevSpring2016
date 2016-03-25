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

                var res = UserService.createUser(newUser);

                if(res){
                    UserService.setCurrentUser(newUser);
                    $location.url("/profile");
                }
            }
        };
    };
})();