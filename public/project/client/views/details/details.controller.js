(function(){
    var POSTER_URL = "http://img.omdbapi.com/?i=IMDBID&apikey=2bf5ee9";

    angular
        .module("TheFilmDBApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($rootScope, $routeParams, MovieService,UserService,FormService,$location) {

        var vm = this;
        vm.likeMovie = likeMovie;
        vm.removeLikeMovie = removeLikeMovie;
        vm.updateComment = updateComment;

        vm.user = $rootScope.currentUser;
        var imdbId = $routeParams.imdb_id;
        //console.log(imdbId);
        vm.isNewComment = true;
        vm.commentFlag = false;

        vm.liked = null;

        function init() {

            fetchMovie(imdbId);
        }
        init();

        function fetchMovie(imdbId) {
            MovieService.findMovieByImdbId(imdbId, renderDetails);
        }

        function renderDetails(response) {
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
                        if(response.data.length!=0){
                            vm.comments = response.data;
                            if(vm.user){

                                response.data.forEach(function(comment){
                                    if(comment.userID == vm.user._id){
                                        vm.userComment = comment.comment;
                                        vm.isNewComment = false;
                                    }
                                });
                            }
                        }else{
                            vm.comments = null;
                        }

                    },
                    function(err){s
                        console.log(err);
                    });
        }

        function updateComment() {
            console.log("Update was called");

            if(vm.isNewComment){
                console.log("This is a new comment");
                likeMovie();
            }

            FormService.updateFormById($rootScope.currentUser._id,imdbId,vm.userComment);

            vm.commentFlag = false;

            init();
        }
    }
})();