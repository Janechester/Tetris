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
/* Graphics */
var yellow = '#ff0';
var blue = '#87CEFA';
var red = '#DC143C';
var green = '#98FB98';
var orange = '#F4A460';
var purple = '#9400D3';
var playField = [];
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

var drawField = function() {
  ctx.clearRect( 0, 0, canvasWidth, canvasHeight );
  playField.forEach( function( block ) {
    drawBlock( block.x, block.y, block.color );
  } );
};

/* Game State */

var Block = function( x, y, color ) {
  this.x = x;
  this.y = y;
  this.color = color || '#fff';
};

var Piece = function( blockMap, color ) {
  this.blockMap = blockMap;
  this.color = color;
};


playField.push( new Block( 0, 0, purple ) );
playField.push( new Block( 5, 5, red ) );
playField.push( new Block( 3, 3, yellow ) );

setInterval( drawField, 10 );
