(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })

            .when("/form", {
                templateUrl: "views/forms/forms.view.html",
                controller:"FormController",
                controllerAs:"model"

            })

            .when("/forms/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller:"FieldController",
                controllerAs:"model"
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs: "model"
            })

            .when("/username", {
                templateUrl: "views/users/profile.view.html"
            })

            .otherwise({
                redirectTo: "/home"
            })
    }
})();