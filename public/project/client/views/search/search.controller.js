(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";
    var POSTER_URL = "http://img.omdbapi.com/?i=IMDBID&apikey=2bf5ee9";

    angular
        .module("TheFilmDBApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $routeParams, $location, MovieService,UserService) {

        //$scope.movieTitle = "Star Wars";
        $scope.likeMovie = likeMovie;

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
                //console.log(response.Search[index]);
                response.Search[index]["Poster"] = POSTER_URL.replace("IMDBID",response.Search[index]["imdbID"]);
            }

            //console.log(response);

            $scope.data = response;
        }

        function likeMovie(imdbID,poster,title){

            if($rootScope.user){
                //console.log(imdbID + poster + title);
                UserService.addMovieLike(imdbID,poster,title,$rootScope.user._id);

            }else {

                $location.url("/login");
            }
        }
    }
})();