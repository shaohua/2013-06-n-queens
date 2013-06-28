var n = 3;
var matrix = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];

var checkRow = function(rowIndex){

  for(var j = 0; j < n; j++){
    matrix[rowIndex][j] = 1; //toggle ON
    console.log("matrix\n" + matrix.join("\n"));

    if(rowIndex + 1 < n){
      checkRow(rowIndex + 1);
    }

    matrix[rowIndex][j] = 0; //toggle OFF

  }

};

// checkRow(0);

// Another way to clone the object
// //http://blog.imaginea.com/deep-copy-in-javascript/

var _ = require('underscore');

var runner = function(prefix, bag){
  //base case
  console.log('runner', prefix.length, bag.length);

  if(bag.length === 0){
    console.log('The end: ' + prefix);
    return;
  } else{

    for(var i = 0; i < bag.length; i++){
      bag_copy = _.clone(bag);
      prefix_copy = _.clone(prefix);
      prefix_copy.push( bag_copy.splice(i,1)[0] );
      
      runner(prefix_copy, bag_copy);
    }

  }
};

runner([], [1,2,3]);

return;