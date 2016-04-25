(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";
    var POSTER_URL = "http://img.omdbapi.com/?i=IMDBID&apikey=2bf5ee9";

    angular
        .module("TheFilmDBApp")
        .controller("SearchController", SearchController);

    function SearchController($scope,$routeParams,MovieService) {
        vm = this;
        vm.movie=null;


        //$scope.movieTitle = "Star Wars";

        function init() {
            vm.message = null;
            var movieTitle = $routeParams.title;
            if(movieTitle) {
                fetchMovie(movieTitle);
            }
        }
        init();

        function fetchMovie(movieTitle) {
            vm.movie=movieTitle;
            MovieService.findMoviesByTitle(movieTitle, renderMovies)
        }

        function renderMovies(response) {
            if(response.Response != "False") {

                for (index = 0; index < response.Search.length; index++) {
                    //console.log(response.Search[index]);
                    response.Search[index]["Poster"] = POSTER_URL.replace("IMDBID", response.Search[index]["imdbID"]);
                }
            }else{
                vm.message = "No movies found for " + $routeParams.title;
            }

            $scope.data = response;
        }
    }
})();