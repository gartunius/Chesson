/*
 Piece handler

*/


class ChessPiece {

    constructor(imgSrc, startPos, movDist, movDir) {
        this.img = new Image();
        this.imgSrc = imgSrc;
        this.startingPosition = startPos;
        this.currentPosition = startPos;
        this.currentCoords = [];
        this.movementDistance = movDist;
        this.movementDirection = movDir;
        this.pieceColor = null;

        this.setImgSrc = function () {
            this.img.src = this.imgSrc;
        }

        this.setPieceColor = function () {
            if (this.startingPosition[1] == "8" || this.currentPosition[1] == "7") {
                this.pieceColor = "black";
            } else {
                this.pieceColor = "white";
            }
        }

        this.setImgSrc();
        this.setPieceColor();
    }

    showAvailableMoves(board) {
        for (var mov in this.movementDirection) {
            var possibility = this.movementDirection[mov];

            if (possibility == 'up') {
                var mod = null;

                if (this.pieceColor == "black") {
                    mod = -1;
                } else {
                    mod = 1;
                }

                var position = this.currentPosition[0] + (Number.parseInt(this.currentPosition[1]) + mod).toString();
                console.log(getCoords(position, board));
            }
        }
    }

    static drawPossibleMovCircle(context, x_point, y_point, radius) {
        context.beginPath();
        context.arc(x_point, y_point, radius, 0, Math.PI * 2, false);
        context.strokeStyle = 'grey';
        context.lineWidth = 3;
        context.fillStyle = 'grey';
        context.stroke();
        context.closePath();
    }

    movePiece() {
    }
}

