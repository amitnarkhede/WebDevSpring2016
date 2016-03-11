(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .filter('trusted', ['$sce', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }]);
})();