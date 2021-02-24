/*
 Canvas handler

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


function drawPieces (context, board, sqr_size, allPieces) {
    for (var piece in allPieces) {
        var crntPiece = allPieces[piece];

        var coords = getCoords(crntPiece.currentPosition, board);
        var x_coord = coords[0];
        var y_coord = coords[1];

        crntPiece.currentCoords = [x_coord, y_coord];

        context.drawImage(crntPiece.img, x_coord, y_coord, sqr_size, sqr_size);
    }
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

    // var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    // var rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

    // for (index_row in rows) {
    //     row = rows[index_row];
    //     board.push({[row]: []});

    //     for (index_file in files) {

    //     }
    // }


    return board;
}


function draw() {
    drawBoard(ctx, sqr_size, "#5D5D5D", "#EEEEEE", sqr_size * 8, sqr_size * 8);
    drawPieces(ctx, chessBoard, sqr_size, allPieces);
}
