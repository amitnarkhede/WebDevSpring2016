(function(){
    var SEARCH_URL = "https://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";
    var POSTER_URL = "https://img.omdbapi.com/?i=IMDBID&apikey=2bf5ee9";

    angular
        .module("TheFilmDBApp")
        .controller("SearchController", SearchController);

    function SearchController($routeParams,MovieService) {
        vm = this;
        vm.movie=null;

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

            vm.searchData = response.Search;
        }
    }
})();
