/*
 Board handler

*/


function getCoords(piecePosition, board) {

    const convert_file_to_index = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:"H"};

    for (var rowNumber = 0; rowNumber < 8; rowNumber ++ ) {
        for (var fileNumber = 0; fileNumber < 8; fileNumber ++) {
            row = (Number.parseInt(rowNumber) + 1).toString();
            file = convert_file_to_index[fileNumber].toLowerCase();

            if (piecePosition[0] == file && piecePosition[1] == row) {
                var rowNumStr = rowNumber.toString();

                return board[rowNumber][rowNumStr][fileNumber][convert_file_to_index[fileNumber]];
            }
        }
    }
}

