/**
 * Created by amitv on 24-Mar-16.
 */

module.exports = function(app,uuid,db,mongoose,tmdbKey) {
    var userMovieSchema=require("./models/user-movie.schema.server")(mongoose);
    var relationModel = mongoose.model('ProjectRelations',userMovieSchema);

    var userModel=require("./models/user.model.js")(uuid,db,mongoose,relationModel);
    var movieModel=require("./models/movie.model.js")(uuid,db,mongoose,relationModel);


    var userService = require("./services/user.service.server.js")(app,userModel);
    var movieService = require("./services/movie.service.server.js")(app,movieModel,tmdbKey);
}