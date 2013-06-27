(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!



    hasRowConflictAt: function(rowIndex){
      var count = _(this.get(rowIndex)).countBy(function(num){
        return num === 1 ? 'one' : 'zero';
      }, this);
      return count.one > 1 ? true : false;
    },

    hasAnyRowConflicts: function(){
      // console.log('---hasAnyRowConflicts---');
      // var memo = false;
      return _(_.range(this.get('n'))).reduce(function(memo, row){
        memo = memo || this.hasRowConflictAt(row);
        return memo;
      }, false, this);
    },

    //added by Zak and Shao
    _getColumn:function(input){
      var matrix = this.rows();
      var result = _(matrix).map(function(row){
        return row[input];
      });
      return result;
    },

    hasColConflictAt: function(colIndex){
      var count = _(this._getColumn(colIndex)).countBy(function(num){
        return num === 1 ? 'one' : 'zero';
      }, this);
      return count.one > 1 ? true : false;
    },

    hasAnyColConflicts: function(){
      // console.log('rows: ', this.rows());
      // var memo = false;
      return _(_.range(this.get('n'))).reduce(function(memo, col){
        memo = memo || this.hasColConflictAt(col);
        return memo;
      }, false, this);
    },

    //added by Zak and Shao
    _getMajorDiagonal: function(majorDiagonalColumnIndexAtFirstRow, optionalMatrix){
      // console.log('_getMajorDiagonal: ', optionalMatrix);
      // debugger;
      var N = this.get('n');
      var matrix = optionalMatrix || this.rows();
      var count = majorDiagonalColumnIndexAtFirstRow;
      // debugger;
      var map_results = _(matrix).map(function(row){
        var output = row[count];
        count++;
        if(count <= N){ //here is where the problem is
          return output;
        }
      });

      var map_cleaned_results = [];
      _(map_results).each(function(item,index){
        if(item !== undefined){
          map_cleaned_results.push(item);
        }
      });

      console.log('map_cleaned_results: ', map_cleaned_results);
      return map_cleaned_results;
    },

    _getMinorDiagonal: function(){

    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow, optionalMatrix){
      // console.log('hasMajorDiagonalConflictAt: ', optionalMatrix);
      var count = _(this._getMajorDiagonal(majorDiagonalColumnIndexAtFirstRow, optionalMatrix)).countBy(function(num){
        return num === 1 ? 'one' : 'zero';
      }, this);
      return count.one > 1 ? true : false;
      // return false;
    },

    hasAnyMajorDiagonalConflicts: function(optionalMatrix){
      console.log('hasAnyMajorDiagonalConflicts: ', optionalMatrix);
      //iterate through all major diagonals
      //assuming from -(n - 1) to (n - 1)
      // var memo = false;
      return _(_.range(1-this.get('n'), this.get('n'))).reduce(function(memo, majDiag){
        memo = memo || this.hasMajorDiagonalConflictAt(majDiag, optionalMatrix);
        return memo;
      }, false, this);
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      console.log('this shouldnot happen');
      return false; // fixme
    },

    //expect a nested array as input
    //rotate the array 90 degree clockwise
    //return the new array
    _rotateNinetyDegrees: function(matrix){
      var transposed = _.zip.apply(null, matrix);
      var rotated = _(transposed).map(function(item){
        return item.reverse();
      });
      return rotated;
    },

    hasAnyMinorDiagonalConflicts: function(){
      // var matrix = this.rows();
      // var rotated = this._rotateNinetyDegrees(matrix);
      // console.log('rotated empty');
      // console.log('rotated array: ', rotated);
      // // var cloned = _.clone(rotated);
      // var result = this.hasAnyMajorDiagonalConflicts(rotated);
      // return result;
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
