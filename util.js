
function createLine(x, y, points) {
	var line = new Kinetic.Line({
		x: x,
		y: y,
		points: points,
		stroke: 'green'
	});

	return line;
}


function selectedCell(cell){
	//Draw a circle (of players color) inside the cell

	//Check for three adjacent circles of the same color
	//in a diagonal, horizontal, or vertical direction

	//If no winner, transfer control to other player
}