(function(){
    angular
        .module("TheFilmDBApp")
        .controller("HomeController", HomeController);

    function HomeController(MovieService,$scope){

        vm = this;
        vm.test = "Test";

        function init(){
            MovieService.fetchTopMovies(processResults);
        }

        init();

        function processResults(data){
            $scope.movies = data.results.slice(0,10);
            console.log(data.results.slice(0,10));
        }
    };
})();