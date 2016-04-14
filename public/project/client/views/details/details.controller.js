(function(){
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";
    var POSTER_URL = "http://img.omdbapi.com/?i=IMDBID&apikey=2bf5ee9"

    angular
        .module("TheFilmDBApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $routeParams, MovieService,UserService,FormService) {

        var vm = this;
        $scope.likeMovie = likeMovie;
        $scope.removeLikeMovie = removeLikeMovie;

        var imdbId = $routeParams.imdb_id;
        //console.log(imdbId);

        vm.liked = null;

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
            checkIfLiked();
        }

        function likeMovie(){

            if($rootScope.user){
                console.log(vm.details);
                UserService.addMovieLike(vm.details.imdbID,vm.details.Poster,vm.details.Title,$rootScope.user._id);

            }else {

                $location.url("/login");
            }
        }

        function removeLikeMovie(){


            if($rootScope.user){

                FormService.deleteFormById($rootScope.user._id,vm.details.imdbID);

            }else {

                $location.url("/login");
            }
        }

        function checkIfLiked(){
            FormService
                .checkIfLiked($rootScope.user._id,vm.details.imdbID)
                .then(function(response){
                        if(response.data){
                            vm.liked = true;
                        }else{
                            vm.liked = null;
                        }
                    },
                    function(err){
                        console.log(err);
                    });

        }
    }
})();