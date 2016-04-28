(function(){
    angular
        .module("TheFilmDBApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location,UserService){
        vm = this;
        vm.register = register;
        vm.message = null;

        function init(){
            vm.username = null;
            vm.email = null;
            vm.password = null;
            vm.verifyPassword = null;
        }

        init();

        function register(){
            var newUser = {username : vm.username , password : vm.password , email : vm.email};
            if(vm.username && vm.email && vm.password && vm.verifyPassword){

                if(vm.password == vm.verifyPassword){

                    UserService
                        .createUser(newUser)
                        .then(function(user){
                            UserService.setCurrentUser(user.data);
                            $location.url("/profile/"+user.data._id);
                        }, function (err) {

                            vm.message = "Username already taken!";
                        });
                }else{
                    vm.message = "Password and Verify Password should match!";
                }

            }else{
                vm.message = "Please enter all the fields!";
            }
        };
    };
})();