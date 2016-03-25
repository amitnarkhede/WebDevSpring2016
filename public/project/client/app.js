(function(){
    angular
        .module("TheFilmDBApp", ["ngRoute"])
        .filter('trusted', ['$sce', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }]);
})();