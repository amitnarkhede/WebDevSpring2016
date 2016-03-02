(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($rootScope,$location,$scope,UserService){
        $rootScope.user = null;
        $scope.login = login;

        function login(loginUser){

            console.log($scope.loginUser);

            if($scope.loginUser != null && loginUser.username != null && loginUser.password !=null){

                UserService.findUserByCredentials(loginUser.username,loginUser.password,function(res){
                    $rootScope.user = res;
                    console.log($rootScope.user);

                    if($rootScope.user != null){
                        $location.url("/profile");
                    }
                    else{
                        $scope.message = "Username/password do not match!";
                    }
                });
            }
            else {
                $scope.message = "Please enter username and password!";
            }




        };
    };
})();