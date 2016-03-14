var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var map = {schema: {}, model: {}};

map.schema.Plane = new Schema({
	name: String,
	temporary: {type: Boolean, default: false}
	//country: {type: Schema.Types.ObjectID, ref: 'Country'},
	//environment: {type: Schema.Types.ObjectID, ref: 'Environment'}
});

map.schema.Path = new Schema({
	exit: {
		plane: {type: Schema.Types.ObjectId, ref: 'Plane'},
		row: Number,
		col: Number
	},
	enter: {
		plane: {type: Schema.Types.ObjectId, ref: 'Plane'},
		row: Number,
		col: Number
	}
});

map.model.Plane = mongoose.model('Plane', map.schema.Plane);
map.model.Path = mongoose.model('Path', map.schema.Path);

module.exports = map;