// Tetris game
/*
Playing Field
  Width in boxes (10)
  Height in boxes (22)
Timer (in seconds)
Score (integer)
Blocks
  Width ( in pixels )
  Height ( in pixels )
  Color
Pieces
  Piece
    Blockmap
    Orientation
    Color


** Display Stuff **
** Store Locaiton Of Blocks **
** Detect Collisions **
** Maneuver Pieces **
  * Rotation
  * Left / Right
  * Fast Forward
** Check for full rows **
  * Delete rows of boxes
  * add points to score
** Player Piece Queue **
  * Current Piece
  * Next piece 
    * Picked at random when current piece is used up

Require: jQuery
*/

$('<canvas id="playArea" width="320" height="480"></canvas>').appendTo( $('body') );