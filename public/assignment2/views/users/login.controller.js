(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($rootScope,$location,$scope,UserService){
        $rootScope.user = null;
        $scope.login = login;

        function login(loginUser){
            console.log($scope.user);
            //userId = $rootScope.user._id;
            //console.log(userId);
            UserService.findUserByCredentials(loginUser.username,loginUser.password,function(res){
                $rootScope.user = res;
                console.log($rootScope.user);

                if($rootScope.user != null){
                    $location.url("/profile");
                }
            });
        };
    };
})();