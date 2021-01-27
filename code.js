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

function drawBoard (context, sqr_size, dark_sqr_color, light_sqr_color) {

    var board = null;
    var simple_conversion = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var crnt_color = light_sqr_color;

    for (var y = 0; y <= 8; y++) {
        for (var x = 0; x <= 8; x++) {
            x_position = sqr_size * x;
            y_position = sqr_size * y;

            context.fillStyle = crnt_color;
            context.fillRect(sqr_size * x, sqr_size * y, sqr_size, sqr_size);

            if (crnt_color == light_sqr_color) {
                crnt_color = dark_sqr_color;
            } else if (crnt_color == dark_sqr_color) {
                crnt_color = light_sqr_color;
            }

        }
    }
}

function getCoords (position, board) {
    for (var row in board) {
        for (var column in board[row]) {
            for (var square in board[row][column]) {

                var x_coord = board[row][column][square][1];
                var y_coord = board[row][column][square][0];

                if (position[1] == row && position[0] == Object.keys(board[row][column])[0]) {
                    return [x_coord, y_coord];
                }
            }

        }
    }
};

function drawPieces (context, board, sqr_size, allPieces) {
    for (var piece in allPieces) {
        var crntPiece = allPieces[piece];

        var coords = getCoords(crntPiece.currentPosition, board);
        var x_coord = coords[0];
        var y_coord = coords[1];

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
};

function defineBoard(sqr_size) {
    // y,x
    var board = {"8" : [ {"a": [sqr_size * 0, sqr_size * 0]}, {"b": [sqr_size * 0, sqr_size * 1]}, {"c": [sqr_size * 0, sqr_size * 2]}, {"d": [sqr_size * 0, sqr_size * 3]}, {"e": [sqr_size * 0, sqr_size * 4]}, {"f": [sqr_size * 0, sqr_size * 5]}, {"g": [sqr_size * 0, sqr_size * 6]}, {"h": [sqr_size * 0, sqr_size * 7]} ],
        "7" : [ {"a": [sqr_size * 1, sqr_size * 0]}, {"b": [sqr_size * 1, sqr_size * 1]}, {"c": [sqr_size * 1, sqr_size * 2]}, {"d": [sqr_size * 1, sqr_size * 3]}, {"e": [sqr_size * 1, sqr_size * 4]}, {"f": [sqr_size * 1, sqr_size * 5]}, {"g": [sqr_size * 1, sqr_size * 6]}, {"h": [sqr_size * 1, sqr_size * 7]} ],
        "6" : [ {"a": [sqr_size * 2, sqr_size * 0]}, {"b": [sqr_size * 2, sqr_size * 1]}, {"c": [sqr_size * 2, sqr_size * 2]}, {"d": [sqr_size * 2, sqr_size * 3]}, {"e": [sqr_size * 2, sqr_size * 4]}, {"f": [sqr_size * 2, sqr_size * 5]}, {"g": [sqr_size * 2, sqr_size * 6]}, {"h": [sqr_size * 2, sqr_size * 7]} ],
        "5" : [ {"a": [sqr_size * 3, sqr_size * 0]}, {"b": [sqr_size * 3, sqr_size * 1]}, {"c": [sqr_size * 3, sqr_size * 2]}, {"d": [sqr_size * 3, sqr_size * 3]}, {"e": [sqr_size * 3, sqr_size * 4]}, {"f": [sqr_size * 3, sqr_size * 5]}, {"g": [sqr_size * 3, sqr_size * 6]}, {"h": [sqr_size * 3, sqr_size * 7]} ],
        "4" : [ {"a": [sqr_size * 4, sqr_size * 0]}, {"b": [sqr_size * 4, sqr_size * 1]}, {"c": [sqr_size * 4, sqr_size * 2]}, {"d": [sqr_size * 4, sqr_size * 3]}, {"e": [sqr_size * 4, sqr_size * 4]}, {"f": [sqr_size * 4, sqr_size * 5]}, {"g": [sqr_size * 4, sqr_size * 6]}, {"h": [sqr_size * 4, sqr_size * 7]} ],
        "3" : [ {"a": [sqr_size * 5, sqr_size * 0]}, {"b": [sqr_size * 5, sqr_size * 1]}, {"c": [sqr_size * 5, sqr_size * 2]}, {"d": [sqr_size * 5, sqr_size * 3]}, {"e": [sqr_size * 5, sqr_size * 4]}, {"f": [sqr_size * 5, sqr_size * 5]}, {"g": [sqr_size * 5, sqr_size * 6]}, {"h": [sqr_size * 5, sqr_size * 7]} ],
        "2" : [ {"a": [sqr_size * 6, sqr_size * 0]}, {"b": [sqr_size * 6, sqr_size * 1]}, {"c": [sqr_size * 6, sqr_size * 2]}, {"d": [sqr_size * 6, sqr_size * 3]}, {"e": [sqr_size * 6, sqr_size * 4]}, {"f": [sqr_size * 6, sqr_size * 5]}, {"g": [sqr_size * 6, sqr_size * 6]}, {"h": [sqr_size * 6, sqr_size * 7]} ],
        "1" : [ {"a": [sqr_size * 7, sqr_size * 0]}, {"b": [sqr_size * 7, sqr_size * 1]}, {"c": [sqr_size * 7, sqr_size * 2]}, {"d": [sqr_size * 7, sqr_size * 3]}, {"e": [sqr_size * 7, sqr_size * 4]}, {"f": [sqr_size * 7, sqr_size * 5]}, {"g": [sqr_size * 7, sqr_size * 6]}, {"h": [sqr_size * 7, sqr_size * 7]} ],
    };

    return board;
}

function game() {

    var canvas = document.getElementById("canvas");
    ctx = setupCanvas(canvas);
    canvas.width = canvas.height;
    var sqr_size = canvas.width / 8;
    var chessBoard = defineBoard(sqr_size);

    class ChessPiece {

        constructor(imgSrc, startPos, movDist, movDir) {
            this.img = new Image();
            this.imgSrc = imgSrc;
            this.startingPosition = startPos;
            this.currentPosition = startPos;
            this.movementDistance = movDist;
            this.movementDirection = movDir;

            this.setImgSrc();
        }

        setImgSrc () {
            this.img.src = this.imgSrc;
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


    var allPiecesImgs = [whiteKing.img.src, whiteQueen.img.src, whiteRook1.img.src, whiteRook2.img.src, whiteBishop1.img.src, whiteBishop2.img.src, whiteKnight1.img.src, whiteKnight2.img.src, whitePawn1.img.src, whitePawn2.img.src, whitePawn3.img.src, whitePawn4.img.src, whitePawn5.img.src, whitePawn6.img.src, whitePawn7.img.src, whitePawn8.img.src,
                     blackKing.img.src, blackQueen.img.src, blackRook1.img.src, blackRook2.img.src, blackBishop1.img.src, blackBishop2.img.src, blackKnight1.img.src, blackKnight2.img.src, blackPawn1.img.src, blackPawn2.img.src, blackPawn3.img.src, blackPawn4.img.src, blackPawn5.img.src, blackPawn6.img.src, blackPawn7.img.src, blackPawn8.img.src,
        ];

    drawBoard(ctx, sqr_size, "#5D5D5D", "#EEEEEE");

    loadImages(allPiecesImgs, function(images) {
        drawPieces(ctx, chessBoard, sqr_size, [whiteKing, whiteQueen, whiteRook1, whiteRook2, whiteBishop1, whiteBishop2, whiteKnight1, whiteKnight2, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8,
                         blackKing, blackQueen, blackRook1, blackRook2, blackBishop1, blackBishop2, blackKnight1, blackKnight2, blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8,
        ])
    });

    /*
        * Interesting mouse movements
        * 'click' normal click
        * 'mousedown' hold click
        * 'mouseup' release click
        * */

};

game();

