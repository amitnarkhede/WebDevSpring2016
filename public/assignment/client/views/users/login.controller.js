(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

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
                .login({
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

