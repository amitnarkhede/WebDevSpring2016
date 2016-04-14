(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService,$rootScope,$location){
        var vm=this;
        vm.currentUser=$rootScope.currentUser;
        vm.message=null;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.createUser = createUser;


        function init(){

            vm.selectedUser=null;
            vm.selected = null;

            //if(!vm.currentUser || vm.currentUser.roles.indexOf('admin') < 0){
            //    $location.url("/home");
            //}
            //else{
            //    UserService
            //        .getAllUsers()
            //        .then(function(response){
            //            if(response.data) {
            //                vm.users=response.data;
            //            }
            //        });
            //}

            UserService
                .getAllUsers()
                .then(function(response){
                    if(response.data) {
                        vm.users=response.data;
                    }
                });
        }

        init();

        function deleteUser(userId){
            UserService.deleteUser(userId);
            init();
        }

        function selectUser(user){
            vm.selectedUser = user;
            //user.roles = user.roles.join();
            vm.selected = { userid: user._id,
                username: user.username ,
                password : user.password ,
                firstName : user.firstName,
                lastName : user.lastName,
                roles : user.roles.join() };

        }

        function updateUser(user){

            vm.selectedUser.firstName = user.firstName;
            vm.selectedUser.lastName = user.lastName;
            vm.selectedUser.roles = user.roles.split(",");
            UserService
                .updateUser(vm.selectedUser)
                .then(function(response){
                    if(response.data.nModified){
                        init();
                    }

                });
        }

        function createUser(user){
            user.roles = user.roles.split(",");
            UserService
                .register(user)
                .then(function(response){
                    console.log(response);
                    init();
                });
        }

    }
})();