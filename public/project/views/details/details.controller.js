(function(){
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";

    angular
        .module("OmdbApi")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $http, $routeParams, MovieService) {

        var vm = this;

        var imdbId = $routeParams.imdb_id;
        console.log(imdbId);

        function init() {
            fetchMovie(imdbId);
        }
        init();

        function fetchMovie(imdbId) {
            MovieService.findMovieByImdbId(imdbId, renderDetails);
        }

        function renderDetails(response) {
            console.log(response);
            vm.details = response;

            MovieService.findMovieTrailer(imdbId,function(res){
                vm.trailer = "http://www.youtube.com/embed/" + res['trailers']['youtube'][0]['source'].trim()}
            );
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
    }
})();