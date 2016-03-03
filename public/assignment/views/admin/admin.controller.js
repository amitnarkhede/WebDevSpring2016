(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope,$location){
        //This is left blank intentionally as there is nothing to be implemented here currently
        //console.log($rootScope.user.roles.indexOf('admin'));

        if(!$rootScope.user || $rootScope.user.roles.indexOf('admin') < 0){
            $location.url("/home")
        }


    }
})();