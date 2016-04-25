(function(){
    angular
        .module("TheFilmDBApp")
        .controller("HomeController", HomeController);

    function HomeController(MovieService){
        var vm = this;

        function init(){
            MovieService.fetchTopMovies(processResults);
        }

        init();

        function processResults(data){
            vm.movies = data.results.slice(0,10);
            console.log(data.results.slice(0,10));
            vm.movie_backdrop1 = "http://image.tmdb.org/t/p/original" + vm.movies[0]["backdrop_path"];
            vm.movie_backdrop2 = "http://image.tmdb.org/t/p/original" + vm.movies[1]["backdrop_path"];
            vm.movie_backdrop3 = "http://image.tmdb.org/t/p/original" + vm.movies[2]["backdrop_path"];
        }
    };
})();