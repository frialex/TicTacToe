
function createRect(x, y, width, height, boardId, cellId) {
	var cell = new Kinetic.Rect({
		x: x,
		y: y,
		width: width,
		height: height,
		stroke: 'green',
		strokeWidth: 2,
		id: { board: boardId, cell: cellId }
	});

	gameState[boardId][cellId] = 0;
	return cell;
}


function moveIntoCell(cell){
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
	// console.log( cell.targetNode.attrs);
	var ci = cell.targetNode.attrs.id;
	var clickedCell = gameState[ci.board][ci.cell];
	//if cell contains marker, then return
	if(clickedCell !== 0) return;

	switch(players.current)	{
		case 'one': placeMarker(1);
					players.current = 'two';
					break;
		case 'two': placeMarker(2);
					players.current = 'one';
					break;
	}

	function placeMarker(player){
				
		gameState[ci.board][ci.cell] = player;
		
		switch(player){
			case 1: console.log('Draw Circle');
					break;

			case 2: console.log('Draw X');
					break;
		}
	};

	//Check for three adjacent circles of the same color

	//check if three game boards have been won

	//in a diagonal, horizontal, or vertical direction

	//If no winner, transfer control to other player


}

