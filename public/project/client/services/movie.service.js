(function(){
    angular
        .module("TheFilmDBApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {

        var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";
        var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";
        var TRAILER_SEARCH_URL = "";
        var tmdbKey = "";

        function init(){
            $http.get("/api/project/getKey").then(
                function (response) {
                    tmdbKey = response.data;
                    TRAILER_SEARCH_URL = "http://api.themoviedb.org/3/movie/IMDBID?api_key=" + tmdbKey + "&append_to_response=trailers";
                });
        }

        init();

        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbId: findMovieByImdbId,
            findMovieTrailer: findMovieTrailer
        };

        return api;

        function findMovieByImdbId(imdbId, callback) {
            var url = DETAILS_URL.replace("IMDBID", imdbId);
            $http.get(url)
                .success(callback);
        }

        function findMoviesByTitle(title, callback) {
            var url = SEARCH_URL
                .replace("TITLE", title)
                .replace("PAGE", 1);
            $http.get(url)
                .success(callback);
        }

        function findMovieTrailer(imdbId,callback){
            //console.log(TRAILER_SEARCH_URL);
            var url = TRAILER_SEARCH_URL.replace("IMDBID",imdbId);
            $http.get(url)
                .success(callback);
        }
    }
})();