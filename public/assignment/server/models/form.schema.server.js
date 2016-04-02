/**
 * Created by amitv on 01-Apr-16.
 */

module.exports = function(mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        created: Date,
        updated: Date,
        fields: [FieldSchema]
    }, {collection: 'assignment.form'});

    return FormSchema;
}