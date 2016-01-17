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
var blockSize = 20;
var canvasHeight = blockSize * 22;
var canvasWidth = blockSize * 10;
var $canvas = $('<canvas id="playArea" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>')
$canvas.appendTo( $('body') );
var ctx = $canvas[0].getContext('2d');

var drawBlock = function( x, y, color ) {
  ctx.beginPath();
  ctx.rect( ( x * blockSize), ( y * blockSize ), blockSize, blockSize ); // set rect position and size
  ctx.fillStyle = color || '#fff'; // set fill color
  ctx.fill(); // draw fill
  ctx.stroke(); // draw border
  ctx.closePath();
};

drawBlock( 3, 3 );
drawBlock( 4, 3 );
drawBlock( 5, 3 );
drawBlock( 6, 3 );