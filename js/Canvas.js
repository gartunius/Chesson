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
    var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

    var crnt_color = light_sqr_color;
    // Both 'file_index' and 'row_index' are integers that have the exact values to make the 
    // multiplication necessary to get the start of x and y coordenates
    for (row_index in rows) {
        var row = rows[row_index];
        board.push({[row]: []});

        if (row_index % 2 == 0) {
            var crnt_color = light_sqr_color;
        } else if (row_index % 2 != 0) {
            var crnt_color = dark_sqr_color;
        }

        for (file_index in files) {
            var file = files[file_index];

            var x = sqr_size * file_index;
            var y = sqr_size * row_index;

            var row_list = board[row_index][row];
            var file_value = {[file]: [x, y]};

            row_list.push(file_value);

            // Drawing the square
            context.fillStyle = crnt_color;
            context.fillRect(x, y, sqr_size, sqr_size);

            if (crnt_color == light_sqr_color) {
                crnt_color = dark_sqr_color;
            } else if (crnt_color == dark_sqr_color) {
                crnt_color = light_sqr_color;
            }

        }
    }

    return board;
}


function draw() {
    drawBoard(ctx, sqr_size, "#5D5D5D", "#EEEEEE", sqr_size * 8, sqr_size * 8);
    drawPieces(ctx, chessBoard, sqr_size, allPieces);
}
