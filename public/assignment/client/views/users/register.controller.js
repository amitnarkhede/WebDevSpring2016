(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController(UserService,$location) {

        var vm=this;
        vm.register=register;
        vm.message=null;
        function init(){

        }
        init();

        function register(user){

            if (user == null) {
                vm.message = "Please fill in the required details";
                return;
            }

            if (user.username == null) {
                vm.message = "Please enter a valid username";
                return;
            }

            if (user.password == null || user.password2 == null) {
                vm.message = "Please enter a password";
                return;
            }

            if (user.password != user.password2) {
                vm.message = "Passwords do not match";
                return;
            }

            if (user.email == null) {
                vm.message = "Enter an emailID";
                return;
            }

            UserService.register(user).
            then(function (response){
                if(response.data) {
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                }
                else{
                    vm.message="Username already exists";
                }
            });
        }
    }
})();

