(function(){
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";
    var POSTER_URL = "http://img.omdbapi.com/?i=IMDBID&apikey=2bf5ee9"

    angular
        .module("TheFilmDBApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($rootScope, $routeParams, MovieService,UserService,FormService,$location) {

        var vm = this;
        vm.likeMovie = likeMovie;
        vm.removeLikeMovie = removeLikeMovie;

        vm.user = $rootScope.currentUser;
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
                    //console.log(res);
                    if(res['trailers']['youtube'][0]){
                        vm.trailer = "http://www.youtube.com/embed/" + res['trailers']['youtube'][0]['source'].trim()
                    }else{
                        vm.trailer = null;
                    }
                }
            );

            if($rootScope.currentUser){
                checkIfLiked();
            }

            fetchComments();
        }

        function likeMovie(){
            console.log("Liked Movie");
            if($rootScope.currentUser){
                //console.log(vm.details);
                UserService.addMovieLike(vm.details,$rootScope.currentUser);
                checkIfLiked();
            }else {

                $location.url("/login");
            }
        }

        function removeLikeMovie(){


            if($rootScope.currentUser){

                FormService.deleteFormById($rootScope.currentUser._id,vm.details.imdbID);
                checkIfLiked();

            }else {

                $location.url("/login");
            }
        }

        function checkIfLiked(){
            FormService
                .checkIfLiked($rootScope.currentUser._id,vm.details.imdbID)
                .then(function(response){
                        //console.log(response.data);
                        if(response.data[0]){
                            //console.log("IT was liked");
                            vm.liked = true;
                        }else{
                            //console.log("IT was not liked");
                            vm.liked = null;
                        }
                    },
                    function(err){
                        console.log(err);
                    });

        }

        function fetchComments(){
            FormService
                .fetchComments(vm.details.imdbID)
                .then(function(response){
                        console.log("Comments");
                        console.log(response.data);
                        if(response.data){
                            vm.comments = response.data;
                        }else{
                            vm.comments = null;
                        }

                    },
                    function(err){s
                        console.log(err);
                    });
        }
    }
})();