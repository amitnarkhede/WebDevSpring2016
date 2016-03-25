(function(){
    angular
        .module("TheFilmDBApp")
        .controller("LoginController",LoginController);

    function LoginController($rootScope,$location,$scope,UserService){
        $rootScope.user = null;
        $scope.login = login;

        function login(loginUser){

            //console.log($scope.loginUser);

            if(loginUser != null && loginUser.username != null && loginUser.password !=null){

                var res = UserService.findUserByCredentials(loginUser.username,loginUser.password);

                res.then(function onSuccess(response) {
                    if(response){
                        UserService.setCurrentUser(response.data);
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