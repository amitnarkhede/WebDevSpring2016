(function(){
    angular
        .module("TheFilmDBApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,UserService){
        vm = this;
        vm.register = register;
        vm.message = null;

        function register(){
            var newUser = {username : vm.username , password : vm.password , email : vm.email};
            if(vm.username !="" && vm.email !="" && vm.password !="" && vm.verifyPassword !=""){
                console.log("Empty data accepted");

                if(vm.password == vm.verifyPassword){

                    UserService
                        .createUser(newUser)
                        .then(function(user){
                            UserService.setCurrentUser(user.data);
                            $location.url("/profile");
                        }, function (err) {

                            vm.message = "Username already taken!";
                            //console.log(err);
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