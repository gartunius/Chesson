/*
  Chess canvas game
*/

function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}

function drawBoard (context, sqr_size, dark_sqr_color, light_sqr_color, ctx_width, ctx_height) {

    context.clearRect(0, 0, ctx_width, ctx_height);

    var board = [];
    var crnt_color = light_sqr_color;

    //rows; numbers
    for (var y = 0; y < 8; y++) {
        board.push({[y] : []});

        if (y % 2 == 0) {
            var crnt_color = light_sqr_color;
        } else if (y % 2 != 0) {
            var crnt_color = dark_sqr_color;
        }

        // files; letters
        for (var x = 0; x < 8; x++) {
            x_position = sqr_size * x;
            y_position = sqr_size * y;
            //list
            row = board[y][y];

            context.fillStyle = crnt_color;
            context.fillRect(x_position, y_position, sqr_size, sqr_size);

            file = {[String.fromCharCode(65 + x)] : [x_position, y_position]};
            row.push(file);

            if (crnt_color == light_sqr_color) {
                crnt_color = dark_sqr_color;
            } else if (crnt_color == dark_sqr_color) {
                crnt_color = light_sqr_color;
            }

        }
    }

    return board;
}

function getCoords(piecePosition, board) {

    const convert_file_to_index = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:"H"};

    for (var rowNumber = 0; rowNumber < 8; rowNumber ++ ) {
        for (var fileNumber = 0; fileNumber < 8; fileNumber ++) {
            row = (Number.parseInt(rowNumber) + 1).toString();
            file = convert_file_to_index[fileNumber].toLowerCase();

            if (piecePosition[0] == file && piecePosition[1] == row) {

                return board[rowNumber][rowNumber.toString()][fileNumber][convert_file_to_index[fileNumber]];
            }
        }
    }
}

function drawPieces (context, board, sqr_size, allPieces) {
    for (var piece in allPieces) {
        var crntPiece = allPieces[piece];

        var coords = getCoords(crntPiece.currentPosition, board);
        var x_coord = coords[0];
        var y_coord = coords[1];

        crntPiece.currentCoords = [x_coord, y_coord];

        context.drawImage(crntPiece.img, x_coord, y_coord, sqr_size, sqr_size);
    }
};

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}


function draw() {
    drawBoard(ctx, sqr_size, "#5D5D5D", "#EEEEEE", sqr_size * 8, sqr_size * 8);
    drawPieces(ctx, chessBoard, sqr_size, allPieces);
}

var canvas = document.getElementById("canvas");
var ctx = setupCanvas(canvas);
canvas.width = canvas.height;
var sqr_size = canvas.width / 8;
var chessBoard = drawBoard(ctx, sqr_size, "#5D5D5D", "#EEEEEE", sqr_size * 8, sqr_size * 8);

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (piece in allPieces) {
        piece = allPieces[piece];

        //x,y
        piece.currentCoords = getCoords(piece.currentPosition, chessBoard);

        crnt_compare = [[piece.currentCoords[0], piece.currentCoords[0] + sqr_size], 
                        [piece.currentCoords[1], piece.currentCoords[1] + sqr_size]];

        start_x = crnt_compare[0][0];
        end_x = crnt_compare[0][1];

        start_y = crnt_compare[1][0];
        end_y = crnt_compare[1][1];

        if (x > start_x  && x < end_x && y > start_y && y < end_y) {
            // do something
        }

    }

});

class ChessPiece {

    constructor(imgSrc, startPos, movDist, movDir) {
        this.img = new Image();
        this.imgSrc = imgSrc;
        this.startingPosition = startPos;
        this.currentPosition = startPos;
        this.currentCoords = [];
        this.movementDistance = movDist;
        this.movementDirection = movDir;

        this.setImgSrc = function () {
            this.img.src = this.imgSrc;
        }

        this.setImgSrc();
    }
}

const whiteKing    = new ChessPiece("Pieces/ChessWhiteKing.svg",   "e1", "1", ["up", "down", "left", "right", "diagonal"]);
const whiteQueen   = new ChessPiece("Pieces/ChessWhiteQueen.svg",  "d1", "*", ["up", "down", "left", "right", "diagonal"]);
const whiteRook1   = new ChessPiece("Pieces/ChessWhiteRook.svg",   "a1", "*", ["up", "down", "left", "right"]);
const whiteRook2   = new ChessPiece("Pieces/ChessWhiteRook.svg",   "h1", "*", ["up", "down", "left", "right"]);
const whiteBishop1 = new ChessPiece("Pieces/ChessWhiteBishop.svg", "c1", "*", ["diagonal"]);
const whiteBishop2 = new ChessPiece("Pieces/ChessWhiteBishop.svg", "f1", "*", ["diagonal"]);
const whiteKnight1 = new ChessPiece("Pieces/ChessWhiteKnight.svg", "b1", "*", ["L"]);
const whiteKnight2 = new ChessPiece("Pieces/ChessWhiteKnight.svg", "g1", "*", ["L"]);
const whitePawn1   = new ChessPiece("Pieces/ChessWhitePawn.svg",   "a2", "1", ["up", "diagonal"]);
const whitePawn2   = new ChessPiece("Pieces/ChessWhitePawn.svg",   "b2", "1", ["up", "diagonal"]);
const whitePawn3   = new ChessPiece("Pieces/ChessWhitePawn.svg",   "c2", "1", ["up", "diagonal"]);
const whitePawn4   = new ChessPiece("Pieces/ChessWhitePawn.svg",   "d2", "1", ["up", "diagonal"]);
const whitePawn5   = new ChessPiece("Pieces/ChessWhitePawn.svg",   "e2", "1", ["up", "diagonal"]);
const whitePawn6   = new ChessPiece("Pieces/ChessWhitePawn.svg",   "f2", "1", ["up", "diagonal"]);
const whitePawn7   = new ChessPiece("Pieces/ChessWhitePawn.svg",   "g2", "1", ["up", "diagonal"]);
const whitePawn8   = new ChessPiece("Pieces/ChessWhitePawn.svg",   "h2", "1", ["up", "diagonal"]);

const blackKing    = new ChessPiece("Pieces/ChessBlackKing.svg",   "e8", "1", ["up", "down", "left", "right", "diagonal"]);
const blackQueen   = new ChessPiece("Pieces/ChessBlackQueen.svg",  "d8", "*", ["up", "down", "left", "right", "diagonal"]);
const blackRook1   = new ChessPiece("Pieces/ChessBlackRook.svg",   "a8", "*", ["up", "down", "left", "right"]);
const blackRook2   = new ChessPiece("Pieces/ChessBlackRook.svg",   "h8", "*", ["up", "down", "left", "right"]);
const blackBishop1 = new ChessPiece("Pieces/ChessBlackBishop.svg", "c8", "*", ["diagonal"]);
const blackBishop2 = new ChessPiece("Pieces/ChessBlackBishop.svg", "f8", "*", ["diagonal"]);
const blackKnight1 = new ChessPiece("Pieces/ChessBlackKnight.svg", "b8", "*", ["L"]);
const blackKnight2 = new ChessPiece("Pieces/ChessBlackKnight.svg", "g8", "*", ["L"]);
const blackPawn1   = new ChessPiece("Pieces/ChessBlackPawn.svg",   "a7", "1", ["up", "diagonal"]);
const blackPawn2   = new ChessPiece("Pieces/ChessBlackPawn.svg",   "b7", "1", ["up", "diagonal"]);
const blackPawn3   = new ChessPiece("Pieces/ChessBlackPawn.svg",   "c7", "1", ["up", "diagonal"]);
const blackPawn4   = new ChessPiece("Pieces/ChessBlackPawn.svg",   "d7", "1", ["up", "diagonal"]);
const blackPawn5   = new ChessPiece("Pieces/ChessBlackPawn.svg",   "e7", "1", ["up", "diagonal"]);
const blackPawn6   = new ChessPiece("Pieces/ChessBlackPawn.svg",   "f7", "1", ["up", "diagonal"]);
const blackPawn7   = new ChessPiece("Pieces/ChessBlackPawn.svg",   "g7", "1", ["up", "diagonal"]);
const blackPawn8   = new ChessPiece("Pieces/ChessBlackPawn.svg",   "h7", "1", ["up", "diagonal"]);


var allPieces = [whiteKing, whiteQueen, whiteRook1, whiteRook2, whiteBishop1, whiteBishop2, whiteKnight1, whiteKnight2, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8,
                 blackKing, blackQueen, blackRook1, blackRook2, blackBishop1, blackBishop2, blackKnight1, blackKnight2, blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8,
    ];

var allPiecesImgs = [];

for (piece in allPieces) {
    piece = allPieces[piece];
    allPiecesImgs.push(piece.imgSrc);
}

loadImages(allPiecesImgs, function() {
    drawPieces(ctx, chessBoard, sqr_size, [whiteKing, whiteQueen, whiteRook1, whiteRook2, whiteBishop1, whiteBishop2, whiteKnight1, whiteKnight2, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8,
                     blackKing, blackQueen, blackRook1, blackRook2, blackBishop1, blackBishop2, blackKnight1, blackKnight2, blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8,
    ])
});

