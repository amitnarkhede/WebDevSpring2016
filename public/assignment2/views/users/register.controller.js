(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($rootScope,$scope,$location,UserService){
        $scope.register = register;
        newUser = $scope.user;

        function register(newUser){
            //console.log($scope.user);
            if(newUser != null){

                UserService.createUser(newUser,function(res){
                    $rootScope.user = res;
                    console.log($rootScope.user);
                });

                $location.url("/profile");

            }
        };
    };
})();