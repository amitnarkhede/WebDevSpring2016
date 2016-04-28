(function(){
    angular
        .module("TheFilmDBApp")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService){
        vm = this;
        vm.login = login;

        function login(user) {
            if(!user.username || !user.password) {
                vm.message="Enter the credentials to login";
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
                        vm.message="Username and password does not match";
                    }
                },function(err){
                    vm.message="Username and password does not match";;
                });
        }
    };
})();