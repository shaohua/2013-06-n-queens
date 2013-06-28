var n = 3;
var counter = 0;

var matrix = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];

var walker = function(rowIndex){

  for(var j = 0; j < n; j++){
    matrix[rowIndex][j] = 1; //toggle ON
    console.log("matrix\n" + matrix.join("\n"));

    if(rowIndex + 1 < n){
      walker(rowIndex + 1);
    }

    matrix[rowIndex][j] = 0; //toggle OFF

  }

};

walker(0);
