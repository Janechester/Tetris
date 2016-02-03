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
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var yellow = '#ff0';
var blue = '#87CEFA';
var red = '#DC143C';
var green = '#98FB98';
var orange = '#F4A460';
var purple = '#9400D3';
var white = '#fff';

var playField = [];
var blockSize = 20;
var canvasHeight = blockSize * 22;
var canvasWidth = blockSize * 10;
var $canvas = $('<canvas id="playArea" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>');
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

var drawField = function( xMod ) {
  xMod = xMod || 0;
  ctx.clearRect( 0, 0, canvasWidth, canvasHeight );
  if( !xMod ) gravity();
  playerPiece.x += xMod;
  drawPiece( playerPiece.piece, playerPiece.x, playerPiece.y );
  playField.forEach( function( block ) {
    drawBlock( block.x, block.y, block.color );
  } );
};

var Block = function( x, y, color ) {
  this.x = x;
  this.y = y;
  this.color = color || '#fff';
};

var Piece = function( blockMap, color ) {
  this.blockMap = blockMap;
  this.color = color;
  this.orientation = 0;
};

Piece.prototype.findLowestBlock = function() {
  var y = 0;
  this.blockMap.forEach( function( coord ) {
    if( coord[1] > y ) {
      y = coord[1];
    }
  } );
  return y;
};

var long = new Piece( [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ], blue );
var square = new Piece( [ [ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 1, 1 ] ], yellow );
var lefty = new Piece( [ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ] ], purple );
var righty = new Piece( [ [ 1, 0 ], [ 0, 1 ], [ 1, 1 ], [ 0, 2 ] ], green );
var leftL = new Piece( [ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ], red );
var rightL = new Piece( [ [ 1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2] ], orange );
var tPiece = new Piece( [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 1 ] ], white );
var pieces = [long, square, lefty, righty, leftL, rightL, tPiece];

var drawPiece = function( piece, x, y ) {
  var blockMap = piece.blockMap;
  var color = piece.color;
  blockMap.forEach( function( coord ) {
    var tempX = coord[0] + x;
    var tempY = coord[1] + y;
    if( detectCollision( tempX, tempY ) ) {
      return;
    }
    drawBlock( tempX, tempY, color );
  } );
};


var playerPiece = {
  // 'piece': Piece object
  // 'x': x location
  // 'y': y location
  // 'nextPiece': whatever the next Piece object is
};

// returns true if there would be a collision, false otherwise
var detectCollision = function( x, y ) {
  if( y > 21 ) {
    return true;
  } else {
    return false;
  }
};

// If a collision is detected ( floor or other blocks ) we want our player to lose control of their piece, and all the blocks to stick where they are.
var stickPiece = function() {};


var randomPiece = function ( ) {
  var index = Math.floor(Math.random()*6);
  return pieces[index];

};


var newPiece = function() {
  playerPiece.piece = playerPiece.nextPiece;
  playerPiece.x = 4;
  playerPiece.y = 0;
  playerPiece.nextPiece = randomPiece();
}; // handle getting a player a new piece and re-initializing it.

// constantly move playerPiece downward.
var gravity = function() {
  var lowest = 1 + playerPiece.piece.findLowestBlock() + playerPiece.y;
  if( !detectCollision( playerPiece.x, lowest ) ) {
    playerPiece.y = playerPiece.y + 1;
  } else {
    stickPiece();
    newPiece();
  }
};

playerPiece.piece = randomPiece();
playerPiece.x = 5;
playerPiece.y = 0;
playerPiece.nextPiece = randomPiece();

$( window ).on( "keydown", function(e) {
  console.log( e.which );
  if( e.which === LEFT_ARROW ) {
    drawField( -1 );
  } else if ( e.which === RIGHT_ARROW ) {
    drawField( 1 );
  } else if ( e.which === UP_ARROW ) {
    // rotate piece
  } else if( e.which === DOWN_ARROW ) {
    drawField();
  }
} );
// drawPiece( long, 3, 3 );
// drawPiece( square, 3, 20 );
// drawPiece( leftL, 5, 6 );
// drawPiece( rightL, 4, 15 );
// drawPiece( tPiece, 0, 19 );

// playField.push( new Block( 0, 0, purple ) );
// playField.push( new Block( 5, 5, red ) );
// playField.push( new Block( 3, 3, yellow ) );

setInterval( drawField, 700 );
  