(function(){
    var POSTER_URL = "http://img.omdbapi.com/?i=IMDBID&apikey=2bf5ee9";

    angular
        .module("TheFilmDBApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams,MovieService,UserService,FormService,$location,$timeout,$scope) {

        var vm = this;
        vm.likeMovie = likeMovie;
        vm.removeLikeMovie = removeLikeMovie;
        vm.updateComment = updateComment;
        vm.deleteComment = deleteComment;
        vm.isAdmin = false;

        vm.user = UserService.getCurrentUser();
        var imdbId = $routeParams.imdb_id;
        //console.log(imdbId);
        vm.isNewComment = true;
        vm.commentFlag = false;

        vm.liked = null;

        function init() {
            fetchMovie(imdbId);
            if(vm.user && vm.user.roles.indexOf("admin") > 0){
                vm.isAdmin = true;
            }
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

            if(vm.user){
                checkIfLiked();
            }

            fetchComments();
            getUserLikes();
        }

        function likeMovie(){
            //console.log("Liked Movie");
            if(vm.user){
                //console.log(vm.details);
                UserService
                    .addMovieLike(vm.details,vm.user)
                    .success(function(res){
                        init();
                    },function(err){
                        console.log(err);
                    });

            }else {
                $location.url("/login");
            }
        }

        function removeLikeMovie(){
            //console.log(vm.details);
            if(vm.user){
                FormService.deleteFormById(vm.user._id,vm.details.imdbID);
                init();

            }else {

                $location.url("/login");
            }
        }

        function checkIfLiked(){
            FormService
                .checkIfLiked(vm.user._id,vm.details.imdbID)
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
                        //console.log("Comments");
                        //console.log(response.data);
                        if(response.data.length!=0){
                            vm.comments = response.data;
                            //console.log(vm.comments);
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

            //console.log(vm.user._id,vm.user.username,vm.userComment,vm.details);
            FormService.updateFormById(vm.user._id,vm.user.username,vm.userComment,vm.details);

            vm.commentFlag = false;

            init();
        }

        function getUserLikes(){
            MovieService
                .getUserMovieLike(vm.details.imdbID)
                .then(function(response){
                    vm.likes = response.data;
                    //console.log(response);
                });
        }

        function deleteComment(userID,imdbID){
            console.log(userID,imdbID);
            MovieService
                .removeMovieComment(userID,imdbID)
                .then(function(response){
                    //console.log(response);
                    fetchComments();
                });
        }
    }
})();