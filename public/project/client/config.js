(function(){
    angular
        .module("TheFilmDBApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html"
            })
            .when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model"
            })
            .when("/admin",{
                templateUrl:"views/admin/admin.view.html",
                controller:"AdminController"
            })
            .when("/search",{
                templateUrl:"views/search/search.view.html",
                controller:"SearchController"
            })
            .when("/search/:title",{
                templateUrl:"views/search/search.view.html",
                controller:"SearchController"
            })
            .when("/details/:imdb_id", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController as model"
            })
            .when("/bookmarks",{
                templateUrl:"views/bookmarks/bookmarks.view.html",
                controller:"BookmarkController"
            })
            .when("/register",{
                templateUrl:"views/users/register.view.html",
                controller:"RegisterController"
            })
            .when("/login",{
                templateUrl:"views/users/login.view.html",
                controller:"LoginController"
            })
            .when("/username",{
                templateUrl:"views/users/profile.view.html"
            })
            .otherwise({
                redirectTo:"/home"
            });
    }
})();