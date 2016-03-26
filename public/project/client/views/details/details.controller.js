(function(){
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";
    var POSTER_URL = "http://img.omdbapi.com/?i=IMDBID&apikey=2bf5ee9"

    angular
        .module("TheFilmDBApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $routeParams, MovieService,UserService) {

        var vm = this;
        $scope.likeMovie = likeMovie;

        var imdbId = $routeParams.imdb_id;
        //console.log(imdbId);

        function init() {
            fetchMovie(imdbId);
        }
        init();

        function fetchMovie(imdbId) {
            MovieService.findMovieByImdbId(imdbId, renderDetails);
        }

        function renderDetails(response) {
            //console.log(response);
            vm.details = response;
            vm.details.Poster = POSTER_URL.replace("IMDBID",vm.details.imdbID);

            MovieService.findMovieTrailer(imdbId,function(res){
                    console.log(res);
                    if(res['trailers']['youtube'][0]){
                        vm.trailer = "http://www.youtube.com/embed/" + res['trailers']['youtube'][0]['source'].trim()
                    }else{
                        vm.trailer = null;
                    }
                }
            );
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