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
            //console.log(data.results.slice(0,10));
        }
    };
})();