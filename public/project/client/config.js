(function(){
    angular
        .module("TheFilmDBApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html",
                controller:"HomeController",
                controllerAs:"model",
                resolve: {
                    loggedin : checkCurrentUser
                }
            })
            .when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve: {
                    loggedin : checkCurrentUser
                }
            })
            .when("/profile/:userid",{
                templateUrl:"views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve: {
                    loggedin : checkCurrentUser
                }
            })
            .when("/admin",{
                templateUrl:"views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs:"model",
                resolve: {
                    loggedin : checkAdmin
                }
            })
            .when("/search",{
                templateUrl:"views/search/search.view.html",
                controller:"SearchController",
                controllerAs:"model",
                resolve: {
                    loggedin : checkCurrentUser
                }
            })
            .when("/search/:title",{
                templateUrl:"views/search/search.view.html",
                controller:"SearchController",
                controllerAs:"model",
                resolve: {
                    loggedin : checkCurrentUser
                }
            })
            .when("/details/:imdb_id", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController as model",
                resolve: {
                    loggedin : checkCurrentUser
                }
            })
            .when("/bookmarks",{
                templateUrl:"views/bookmarks/bookmarks.view.html",
                controller:"BookmarkController",
                resolve: {
                    loggedin : checkCurrentUser
                }
            })
            .when("/register",{
                templateUrl:"views/users/register.view.html",
                controller:"RegisterController",
                controllerAs:"model"
            })
            .when("/login",{
                templateUrl:"views/users/login.view.html",
                controller:"LoginController",
                controllerAs:"model"
            })
            .otherwise({
                redirectTo:"/home"
            });
    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function(user)
        {
            //console.log("LOGIN CONFIG"+user);
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();