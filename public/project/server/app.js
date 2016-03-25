/**
 * Created by amitv on 24-Mar-16.
 */

module.exports = function(app,uuid) {
    var userModel=require("./models/user.model.js")(uuid);
    var userService = require("./services/user.service.server.js")(app,userModel);
}