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
      return _(_.range(this.get('n'))).reduce(function(memo, row){
        memo = memo || this.hasRowConflictAt(row);
        return memo;
      }, false, this);
    },

    //added by Zak and Shao
    _getColumn:function(input){
      var matrix = this.rows();
      return _(matrix).map(function(row){
        return row[input];
      });
    },

    hasColConflictAt: function(colIndex){
      var count = _(this._getColumn(colIndex)).countBy(function(num){
        return num === 1 ? 'one' : 'zero';
      }, this);
      return count.one > 1 ? true : false;
    },

    hasAnyColConflicts: function(){
      // console.log('rows: ', this.rows());
      return _(_.range(this.get('n'))).reduce(function(memo, col){
        memo = memo || this.hasColConflictAt(col);
        return memo;
      }, false, this);
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      return false; // fixme
    },

    hasAnyMajorDiagonalConflicts: function(){
      return false; // fixme
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      return false; // fixme
    },

    hasAnyMinorDiagonalConflicts: function(){
      return false; // fixme
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
