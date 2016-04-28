(function(){
    angular
        .module("TheFilmDBApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService,$location){
        var vm=this;
        vm.currentUser = UserService.getCurrentUser();
        vm.message = null;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.createUser = createUser;


        function init(){

            if(!vm.currentUser || vm.currentUser.roles.indexOf('admin') < 0){
                $location.url("/home");
            }else{

                vm.selectedUser=null;
                vm.selected = null;

                UserService
                    .getAllUsers()
                    .then(function(response){
                        //console.log(response);
                        if(response.data) {
                            vm.users=response.data;
                        }
                    });
            }
        }

        init();

        function deleteUser(userId){
            UserService.deleteUserById(userId);
            init();
        }

        function selectUser(user){
            vm.selectedUser = user;
            //user.roles = user.roles.join();
            vm.selected = { userid: user._id,
                username: user.username ,
                password : user.password ,
                firstname : user.firstname,
                lastname : user.lastname,
                roles : user.roles.join() };

        }

        function updateUser(user){

            vm.selectedUser.firstname = user.firstname;
            vm.selectedUser.lastname = user.lastname;
            vm.selectedUser.roles = user.roles.split(",");
            //console.log(user);
            UserService
                .updateUser(vm.selectedUser)
                .then(function(response){
                    //console.log("After update");
                    //console.log(response);
                    if(response.data[0]){
                        //UserService.setCurrentUser(response.data[0]);
                        init();
                    }

                });
        }

        function createUser(user){
            user.roles = user.roles.split(",");
            UserService
                .register(user)
                .then(function(response){
                    //console.log(response);
                    init();
                });
        }

    }
})();