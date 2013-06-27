
function createRect(x, y, width, height) {
	var line = new Kinetic.Rect({
		x: x,
		y: y,
		width: width,
		height: height,
		stroke: 'green',
		strokeWidth: 2
	});

	return line;
}


function moveIntoCell(cell){
	 console.log('moveIntoCell(): ');
	 var x = cell.targetNode.attrs.x;
	 var y = cell.targetNode.attrs.y;
	//Draw a circle (of players color) inside the cell
	dottedCircle = new Kinetic.Circle({
		x: x + 15,
		y: y + 15,
		radius: 10,
		stroke: 'red',
		strokeWidth: 1,
		dashArray: [2,4]
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

