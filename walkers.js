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

var runner = function(prefix, bag){
  //base case
  if(bag.length === 0){
    console.log('The end: ' + prefix);
    return;
  } else{

    for(var i = 0; i < bag.length; i++){
      prefix_copy = prefix.push(bag[i]);
      bag.splice(i,1);
      bag_copy = bag;
      debugger;
      runner(prefix_copy, bag_copy);
    }

  }
};

runner([], [1,2,3]);