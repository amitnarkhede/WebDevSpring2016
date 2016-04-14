/**
 * Created by amitv on 24-Mar-16.
 */

module.exports = function(app,uuid,db,mongoose) {
    var userModel=require("./models/user.model.js")(uuid,db,mongoose);
    var movieModel=require("./models/movie.model.js")(uuid,db,mongoose);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var movieService = require("./services/movie.service.server.js")(app,movieModel);
}