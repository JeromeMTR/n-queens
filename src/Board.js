// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForReverseDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasReverseDiagonalConflictAt(this._getFirstRowColumnIndexForReverseDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyReverseDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      /*
      I -row index
      O - boolean value, true if there is a collision/conflict, false if not
      C -
      E - invalid input type
      Strat/Pseudocode
      //Check if there are conflicts in row
      //counter variable
      //create variable for to hold all the rows from the board object
        //get specific row
        //loop through current row
          //check if current row[i] === 1
            // increment counter
          //return counter >= 2
      */
      var count = 0;
      var allRows = this.rows();
      var currentRow = allRows[rowIndex];
      for (let i = 0; i < currentRow.length; i++) {
        if (currentRow[i] === 1) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      /*
      I
      O- boolean value
      C-
      E-
      set default boolean var conflicts = false
      get row count
      loop through row count
        check for conflicts at each row using function above
        if true, change conflicts to true
      return conflicts
      */
      var conflicts = false;
      var rowCount = this.rows().length;
      for (let i = 0; i < rowCount; i++) {
        if (this.hasRowConflictAt(i)) {
          conflicts = true;
        }
      }
      return conflicts;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // var rows = this.rows();
      // for columns, transpose the rows and columns
      // for (let i = 0; i < col.length; i++) {
      //   if (col[i] === 1) {
      //     colPieceCount++;
      //   }
      //   if (colPieceCount >= 2) {
      //     return true;
      //   }
      // }
      // return false;

      // I - integer value, index we are checking at for the row
      // O - boolean value, true if there more than one piece at given index else false
      // Pseudocode
      // declare a count var
      // get all rows
      // loop over all rows
        // for each row check given value at given index
            // if its 1 increement count
      // return if count is greater than 1
      var count = 0;
      var rows = this.rows();
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][colIndex] === 1) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // I - no input
      // O - boolean value depending on conflict
      // declare boolean var conflicts to false
      // create a var column count
      // check each column
        // for each column check if there is conflict
          // if true change conflict to true
      // return conflicts
      var conflicts = false;
      var colCount = this.rows().length;
      for (let i = 0; i < colCount; i++) {
        if (this.hasColConflictAt(i)) {
          conflicts = true;
        }
      }
      return conflicts;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      /*
      // declare key var for diagonal (colIndex-rowIndex)
      // create an object {input: 0}
      // get all rows
      // loop through all rows
        // check if current index === key && value is 1
        // if both true, increment count[key]++
      return resultObj[key] > 1
      */
      var key = majorDiagonalColumnIndexAtFirstRow;
      var count = {key: 0};
      var allRows = this.rows();
      for (let i = 0; i < allRows.length; i++) {
        for (let j = 0; j < allRows[i].length; j++) {
          if (j - i === key && allRows[i][j] === 1) {
            count['key']++
          }
        }
      }
      return count['key'] > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // declare conflicts var
      // get allRows
      // loop through allRows
        // innerloop to loop through all elements of each row
        // create var key = position index --> j - i
          // if this.hasMajorDiagonalConflictAt(key)
            // if true, conflicts = true
      //return conflicts
      var conflicts = false;
      var allRows = this.rows();
      for (let i = 0; i < allRows.length; i++) {
        for (let j = 0; j < allRows[i].length; j++) {
          var key = j - i;
          if (this.hasMajorDiagonalConflictAt(key)) {
            conflicts = true;
          }
        }
      }
      return conflicts;
    },



    // Minor Diagonals - go from top-right to bottom-left <--changed minor to reverse
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasReverseDiagonalConflictAt: function(reverseDiagonalColumnIndexAtFirstRow) {
      var key = reverseDiagonalColumnIndexAtFirstRow;
      var count = {key: 0};
      var allRows = this.rows();
      for (let i = 0; i < allRows.length; i++) {
        for (let j = 0; j < allRows[i].length; j++) {
          if (j + i === key && allRows[i][j] === 1) {
            count['key']++
          }
        }
      }
      return count['key'] > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyReverseDiagonalConflicts: function() {
      var conflicts = false;
      var allRows = this.rows();
      for (let i = 0; i < allRows.length; i++) {
        for (let j = 0; j < allRows[i].length; j++) {
          var key = j + i;
          if (this.hasReverseDiagonalConflictAt(key)) {
            conflicts = true;
          }
        }
      }
      return conflicts;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());