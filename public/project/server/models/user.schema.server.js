/**
 * Created by amitv on 31-Mar-16.
 */

module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ProjectUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        email: String,
        phone:String,
        roles: [String]
    }, {collection: 'project.user'});

    ProjectUserSchema.index({username:1},{unique:true});

    return ProjectUserSchema;
};