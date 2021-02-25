/*
 Board handler

*/


function getCoords(piecePosition, board) {

    const convert_index_to_file = {"a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5, "g": 6, "h": 7};

    var rowNumber = (Number.parseInt(piecePosition[1]) - 1);
    var row = piecePosition[1];
    var fileNumber = convert_index_to_file[piecePosition[0]];
    var file = piecePosition[0];

    return board[rowNumber][row][fileNumber][file];

}

