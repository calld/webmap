var map = require('../models/map');
var ran = require('./randomUtil');

var gen = {};

gen.createRegion = function(size, loops){
	if(size <= 0 || loops <= 0){
		return false;
	}
	var newLocations = [];
	for(i = 0; i < size; i++){
		newLocations.push(new map.model.Plane({
			name: "temp"
		}));
	}
	
	var paths = [];
	for(i = 0; i < loops; i++){
		var Liter = ran.randIter(newLocations);
		var start = Liter.next();
		var tempA = start;
		var tempB;
		while(tempB = Liter.next()){
			paths.push(new map.model.Path({
				enter: {
					plane: tempA._id,
					row: 0.0,
					col: 0.0
				},
				exit: {
					plane: tempB._id,
					row: 0.0,
					col: 0.0
				}
			}));
			tempA = tempB;
		}
		paths.push(new map.model.Path({
			enter: {
				plane: tempA._id,
				row: 0.0,
				col: 0.0
			},
			exit: {
				plane: start._id,
				row: 0.0,
				col: 0.0
			}
		}));
	}
	for(i = 0; i < newLocations.length; i++){
		newLocations[i].save();
	}
	for(i = 0; i < paths.length; i++){
		paths[i].save();
	}
	return newLocations;
};


//region = [Plane], other = [[Plane]], rate = number > 0
//generates paths between the the given region and a random selection from other, each Plane getting a path at rate
gen.connectRegion = function(region, other, rate){
	if(rate < 0){
		return false;
	}
	var paths = [];
	for(i = 0; i < region.length; i++){
		for(j = 0; j < Math.floor(rate); j++){
			var k = ran.randIndRange(0, other.length);
			var temp = new map.model.Path({
				enter: {
					plane: region[i]._id,
					row: 0.0,
					col: 0.0
				},
				exit: {
					plane: other[k][ran.randIndRange(0, other[k].length)]._id
					row: 0.0,
					col: 0.0
				}
			});
			temp.save();
			paths.push(temp);
		}
		if(Math.random() < rate - Math.floor(rate)){
			var k = ran.randIndRange(0, other.length);
			var temp = new map.model.Path({
				enter: {
					plane: region[i]._id,
					row: 0.0,
					col: 0.0
				},
				exit: {
					plane: other[k][ran.randIndRange(0, other[k].length)]._id
					row: 0.0,
					col: 0.0
				}
			});
			temp.save();
			paths.push(temp);
		}
	}
};

//unfinished
gen.expandTempPlane = function(plane, size, loops, rate, connectBackList){
	var newReg = gen.createRegion(size, loops);
	map.model.Path.find({exit:{plane: plane._id}}, function(err, paths){
		for(x = 0; x < paths.length; x++){
			map.model.Path.update({_id: paths[x]._id}, {exit:{plane: newReg[ran.randIndRange(0, newReg.length)]._id}}, function(err, other){
				if (err) handleError(err);
			});
		}
	});
	gen.connectRegion(newReg, connectBackList, rate);	
};

modules.exports = gen;