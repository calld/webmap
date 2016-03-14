
var r = {};

r.randRange = function(low, high){
	return Math.random()*(high-low) + low;
};

r.randIndRange = function(low, high){
	return Math.floor(r.randRange(low, high));
};

r.randIter = function(arr){
	var tempA = [];
	for(i = 0; i < arr.length; i++){
		tempA.push(arr[i]);
	}
	return {
		next = function(){
			if(tempA.length > 0){
				var i = r.randIndRange(0, tempA.length);
				var temp = tempA[i];
				tempA = tempA.slice(0,i).concat(tempA.slice(i+1));
				return temp;
			}else{
				return false;
			}
		}
	};
};

r.scewlg = function(){
	var i = Math.random();
	while(i == 0){i = Math.random();}
	return Math.log(1/i)/Math.LOG2E;
};

modules.exports = r;