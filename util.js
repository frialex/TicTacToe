
function createRect(x, y, width, height, boardId, cellId) {
	var cell = new Kinetic.Rect({
		x: x,
		y: y,
		width: width,
		height: height,
		stroke: 'black',
		strokeWidth: 2,
		id: { board: boardId, cell: cellId }
	});

	gameState[boardId][cellId] = 0;
	return cell;
}


function moveIntoCell(cell){
	 var x = cell.targetNode.attrs.x;
	 var y = cell.targetNode.attrs.y;
	//Draw a shape of players color inside the cell
	if(players.current === 'one'){
		feedbackShape = new Kinetic.Circle({
			x: x + 15,
			y: y + 15,
			radius: 10,
			stroke: 'red',
			strokeWidth: 1,
			dashArray: [2,4]
		});
	} else {
			feedbackShape = new Kinetic.Star({
			x: x+15,
			y: y+15,
			numPoints: 2,
			innerRadius: 10,
			outerRadius: 10,
			stroke: 'green',
			strokeWidth: 1,
			dashArray: [2,4]
		});
	}
	this.parent.add(feedbackShape);
	this.parent.drawScene(); 
}



function moveOutOfCell(cell){
	feedbackShape.hide();
	this.parent.drawScene();
}

function clickedCell(cell){
	// console.log( cell.targetNode.attrs);
	var ci = cell.targetNode.attrs.id;
	var stage  = cell.targetNode.parent;
	var clickedCellState = gameState[ci.board][ci.cell];
	//if cell contains marker, then return
	if(clickedCellState !== 0) return;

	var x = cell.targetNode.attrs.x;
	var y = cell.targetNode.attrs.y;

	switch(players.current)	{
		case 'one': drawTic(x,y,stage);
					gameState[ci.board][ci.cell] = 1;
					players.current = 'two';
					break;
		case 'two': drawTac(x,y,stage);
					gameState[ci.board][ci.cell] = 2;
					players.current = 'one';
					break;
	}


	//in this board, check for three in a row. If found, 
	//Turn the color of the board to players color (red, green,...)

	//in the stage, check for three boards in a row that are owned 
	//by the player. If so, show winner screen

	//If no winner, transfer control to other player


}

function drawTic(x,y, stage){
	var tic = new Kinetic.Circle({
		x: x + 15,
		y: y + 15,
		radius: 10,
		stroke: 'red',
		strokeWidth: 1		
	});

	stage.add(tic);
	stage.drawScene();
}

function drawTac(x, y, stage){
	var fakeTac = new Kinetic.Star({
		x: x+15,
		y: y+15,
		numPoints: 2,
		innerRadius: 10,
		outerRadius: 10,
		stroke: 'green',
		strokeWidth: 1
	});

	stage.add(fakeTac);
	stage.drawScene();
}

