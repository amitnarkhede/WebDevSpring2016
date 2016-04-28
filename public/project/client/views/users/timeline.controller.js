(function(){
    angular
        .module("TheFilmDBApp")
        .controller("TimelineController", TimelineController);

    function TimelineController(UserService){
        var vm = this;
        var userid = UserService.getCurrentUser()._id;

        function init(){
            getFollowing();
        }

        init();

        function getFollowing(){
            UserService
                .getFollowing(userid)
                .then(function(res){
                    //console.log("Following");
                    //console.log(res.data);
                    if(res.data.length==0){
                        vm.following = null;
                    }else{
                        //vm.following = res.data;
                        var followingActivity=[];
                        for(i=0;i<res.data.length;i++){
                            var userid = res.data[i].following_id;
                            //console.log(userid);
                            UserService
                                .getAllMovieActivity(userid)
                                .then(function(res){
                                    //console.log(res.data);
                                    if(res.data.length==0){
                                        //vm.movies = null;
                                    }else{
                                        res.data.forEach(function(entry){
                                            entry.created = new Date(entry.created);
                                            entry.created = entry.created.toDateString() + " " + entry.created.toTimeString().slice(0,8);
                                            followingActivity.push(entry);
                                        });

                                        //console.log(followingActivity);
                                        vm.followingActivity = followingActivity;
                                    }
                                })
                        }
                    }
                });
        }
    };
})();