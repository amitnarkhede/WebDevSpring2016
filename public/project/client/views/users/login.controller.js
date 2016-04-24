(function(){
    angular
        .module("TheFilmDBApp")
        .controller("LoginController",LoginController);

    function LoginController($rootScope,$location,UserService){
        vm = this;
        $rootScope.user = null;
        vm.login = login;

        //function login(){
        //
        //    if(vm.username != "" && vm.password !=""){
        //        UserService
        //            .findUserByCredentials(vm.username,vm.password)
        //            .then(function(response) {
        //                if(response.data.length!=0){
        //                    console.log(response.data);
        //                    UserService.setCurrentUser(response.data[0]);
        //                    $location.url("/profile/"+response.data[0]._id);
        //                }
        //                else{
        //                    console.log("Error1");
        //                    vm.message = "Username/password do not match!";
        //                }
        //            });
        //    }
        //    else {
        //        console.log("Error2");
        //        vm.message = "Please enter username and password!";
        //    }
        //};

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
                    console.log(response.data);
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