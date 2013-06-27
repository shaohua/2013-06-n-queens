// var walker = function(row){
//   for(var j=0; j<2; j++){
//     row++;
//     console.log(row,j);
//     if(row<3){
//       walker(row);
//     }
//   }
// };

// var n = 3;
// var colIndex = 0;
// var walker = function(row){
//   for(var j=0; j<n; j++){
//     console.log(row,colIndex);
//     colIndex++;
//     row++;
//     if(row<n-1){
//       walker(row);
//     }
//   }
// //console.log(row, j)
// };
// walker(0);


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

// var R = 0;
// var colIndex = 0;
// var recursionWithWhileWTF = function(val){
//   while (R < n) {
//     while (colIndex < n){
//       console.log(R, colIndex);
//       colIndex++;
//     }
//     R++;
//   }
// };
// recursionWithWhileWTF(0);
