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
            console.log(response);
            for(index = 0; index < response.Search.length; index++){
                //console.log(response.Search[index]);
                response.Search[index]["Poster"] = POSTER_URL.replace("IMDBID",response.Search[index]["imdbID"]);
            }

            //console.log(response);

            $scope.data = response;
        }
    }
})();