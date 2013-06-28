// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){

  var solution = _( _.range(n) ).map(function(index){
    var soln = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
    soln[index] = 1;
    return soln;
  });

  // console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
  var solutionCount = 0;

  var board = new Board({n:n});

  // console.log('n: ', n, board);

  var checkRow = function(rowIndex){

    for(var j = 0; j < n; j++){
      //toggle ON
      board.togglePiece(rowIndex, j);

      // console.log('board\n' + board.rows().join('\n'));

      //check for both row and column conflicts

      //if NO conflict{
      if( !board.hasAnyRooksConflicts() ){

        if(rowIndex + 1< n){ // check for whether we have reached the end of board or not
          checkRow(rowIndex + 1);
        } else{
          solutionCount += 1;
        }

      }

      //toggle off
      board.togglePiece(rowIndex, j);

      //}

    }
  };

  //cheating
  if(n===0){
    solutionCount = 1;
  } else {
    checkRow(0);
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var board = new Board({n:n});

  var solution = board.rows();

  var checkRow = function(rowIndex){

    for(var j = 0; j < n; j++){
      //toggle ON
      board.togglePiece(rowIndex, j);

      if( !board.hasAnyQueensConflicts() ){

        if(rowIndex + 1< n){ // check for whether we have reached the end of board or not
          checkRow(rowIndex + 1);
        } else{
          solution = board.rows();
          // console.log('board\n' + board.rows().join('\n'));
        }

      }

      //toggle off
      board.togglePiece(rowIndex, j);

    }
  };

  checkRow(0);
  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

/*window.countNQueensSolutions = function(n){
  var solutionCount = 0;

  var board = new Board({n:n});

  var checkRow = function(rowIndex){

    for(var j = 0; j < n; j++){
      //toggle ON
      board.togglePiece(rowIndex, j);

      if( !board.hasAnyQueensConflicts() ){

        if(rowIndex + 1< n){ // check for whether we have reached the end of board or not
          checkRow(rowIndex + 1);
        } else{
          solutionCount += 1;
        }

      }

      //toggle off
      board.togglePiece(rowIndex, j);

    }
  };

  //cheating
  if(n===0){
    solutionCount = 1;
  } else {
    var time_start = new Date();
    checkRow(0);
    var time_spent = new Date() - time_start;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount + ' time_spent: ', time_spent);
  return solutionCount;
};*/

window.countNQueensSolutions = function(n){
  //started refactoring
  var solutionCount = 0;

  var board = new Board({n:n});

  var checkRow = function(rowIndex){

    for(var j = 0; j < n; j++){
      //toggle ON
      board.togglePiece(rowIndex, j);

      if( !board.hasAnyQueensConflicts() ){

        if(rowIndex + 1< n){ // check for whether we have reached the end of board or not
          checkRow(rowIndex + 1);
        } else{
          solutionCount += 1;
        }

      }

      //toggle off
      board.togglePiece(rowIndex, j);

    }
  };

  //cheating
  if(n===0){
    solutionCount = 1;
  } else {
    var time_start = new Date();
    checkRow(0);
    var time_spent = new Date() - time_start;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount + ' time_spent: ', time_spent);
  return solutionCount;
};

// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
