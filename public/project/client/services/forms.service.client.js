(function() {
    angular
        .module("TheFilmDBApp")
        .factory("FormService",FormService);

    function FormService($http) {
        var forms = [];

        var model={
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            deleteMovieBookmark:deleteMovieBookmark,
            updateFormById:updateFormById,
            checkIfLiked:checkIfLiked,
            fetchComments:fetchComments
        };

        return model;

        function createFormForUser(userId,form,callback){
            var newForm = {
                _id:(new Date).getTime(),
                title:form.title,
                userId:userId
            };
            forms.push(newForm);
            callback(newForm);
        };

        function findAllFormsForUser(userId,callback){
            var userForms = [];
            for(var f in forms) {
                if (forms[f].userId == userId) {
                    userForms.push(forms[f]);
                }
            }
            callback(userForms);
        };

        function deleteFormById(userID,imdbID){
            //var details = {"userID" : userID , "imdbID" : imdbID};
            return $http.delete("/api/project/deletemovie/"+ userID + "/" + imdbID);

        };

        function deleteMovieBookmark(userID,imdbID){
            return $http.delete("/api/project/deletemovieactivity/"+ userID + "/" + imdbID);
        }

        function updateFormById(userid,username,comment,details){

            var updatedObject = {"userid" : userid, username : username , "comment":comment, "details" : details};
            return $http.put("/api/project/updatecomment",updatedObject);
        };

        function checkIfLiked(userID,imdbID){
            return $http.get("/api/project/checklike/"+userID+"/"+imdbID);
        };

        function fetchComments(imdbID){
            return $http.get("/api/project/comments/"+imdbID);
        };
    }
})();