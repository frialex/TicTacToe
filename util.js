
function createLine(x, y, points) {
	var line = new Kinetic.Line({
		x: x,
		y: y,
		points: points,
		stroke: 'green'
	});

	return line;
}


function moveIntoCell(cell){
	
	//Draw a circle (of players color) inside the cell
	dottedCircle = new Kinetic.Circle({
		x: 60, //TODO: Change these to match currently hovered cell
		y: 60,
		radius: 45,
		stroke: 'red',
		strokeWidth: 1,
		dashArray: [10,10]
	});

	this.parent.add(dottedCircle);
	this.parent.drawScene(); 
}

function moveOutOfCell(cell){
	dottedCircle.hide();
	this.parent.drawScene();
}

function clickedCell(cell){
	console.log('clickedCell(): '); 
	console.log( cell.targetNode.attrs);

	//Check for three adjacent circles of the same color
	//in a diagonal, horizontal, or vertical direction

	//If no winner, transfer control to other player


}
