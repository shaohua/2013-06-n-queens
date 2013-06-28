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

checkRow(0);

// var runner = function(rowIndex){
//   if(rowIndex + 1 < n){
//     walker(rowIndex + 1);
//   }
// }
