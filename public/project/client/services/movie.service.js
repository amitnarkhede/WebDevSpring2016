(function(){
    angular
        .module("TheFilmDBApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {

        var SEARCH_URL = "https://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie&apikey=2bf5ee9";
        var DETAILS_URL = "https://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true&apikey=2bf5ee9";
        var TRAILER_SEARCH_URL = "";
        var tmdbKey = "";

        function init(){
            $http.get("/api/project/getKey").then(
                function (response) {
                    tmdbKey = response.data;
                    TRAILER_SEARCH_URL = "https://api.themoviedb.org/3/movie/IMDBID?api_key=" + tmdbKey + "&append_to_response=trailers";
                });
        }

        init();

        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbId: findMovieByImdbId,
            findMovieTrailer: findMovieTrailer,
            fetchTopMovies:fetchTopMovies,
            getUserMovieLike:getUserMovieLike,
            removeMovieComment:removeMovieComment
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

        function fetchTopMovies(callback){
            $http.get("/api/project/popular").success(function(res){
                $http.get(res).success(callback)
            });
        }

        function getUserMovieLike(imdbID){
            return $http.get("/api/project/getusermovielikes/"+imdbID);
        }

        function removeMovieComment(userID,imdbID){
            return $http.delete("/api/project/deletecomment/"+userID+"/"+imdbID);
        }
    }
})();
