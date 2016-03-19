(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

   /* function LoginController($scope,$location,UserService,$rootScope){
       // $scope.login = login;
        //$scope.message=null;

      /*  function login(user)
        {
            UserService.findUserByCredentials(user.username,user.password,render);

            function render(user){
               if(user){
               //    $rootScope.currentUser=user;
                   UserService.setCurrentUser(user);
                   $location.url("/profile");

               }
                else{
                   $scope.message="Username and password doesnot match";
               }

            }
        }
}*/
    function LoginController(UserService,$location){
        var vm=this;
        vm.login=login;
        vm.message=null;

        function init(){
        }
        init();

        function login(user) {
            if(!user) {
                return;
            }
            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                    else{
                     vm.message="Username and password doesnot match";
                    }
                });
        }
    }

})();

