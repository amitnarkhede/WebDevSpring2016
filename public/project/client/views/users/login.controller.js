(function(){
    angular
        .module("TheFilmDBApp")
        .controller("LoginController",LoginController);

    function LoginController($rootScope,$location,UserService){
        vm = this;
        $rootScope.user = null;
        vm.login = login;

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
                    //console.log(response.data);
                    if(response.data) {

                        UserService.setCurrentUser(response.data);
                        $location.url("/profile/"+response.data._id);
                    }
                    else {
                        vm.message="Username and password doesnot match";
                    }
                },function(err){
                    vm.message="Username and password doesnot match";;
                });
        }
    };
})();