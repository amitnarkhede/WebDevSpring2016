(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($rootScope,$location){
        //This is left blank intentionally as there is nothing to be implemented here currently
        //console.log($rootScope.user.roles.indexOf('admin'));

        if(!$rootScope.user){
            $location.url("/home")
        }


    }
})();