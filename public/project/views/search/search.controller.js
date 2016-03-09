(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";

    angular
        .module("FormBuilderApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http, $routeParams, $location, MovieService) {

        //$scope.movieTitle = "Star Wars";

        function init() {
            var movieTitle = $routeParams.title;
            if(movieTitle) {
                fetchMovie(movieTitle);
            }
        }
        init();

        function fetchMovie(movieTitle) {
            MovieService.findMoviesByTitle(movieTitle, renderMovies)
        }

        function renderMovies(response) {
            //console.log(response.Search.length);

            for(index = 0; index < response.Search.length; index++){
                //console.log(index);
                if (response.Search[index]["Poster"] == "N/A"){
                    response.Search[index]["PosterAvailable"] = false;
                }else{
                    response.Search[index]["PosterAvailable"] = true;
                }
            }

            //console.log(response);

            $scope.data = response;
        }
    }
})();