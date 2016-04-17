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

                UserService
                    .findUserByCredentials(loginUser.username,loginUser.password)
                    .then(function(response) {
                        if(response){
                            UserService.setCurrentUser(response.data[0]);
                            $location.url("/profile/"+response.data[0]._id);
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