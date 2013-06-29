
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
		var x = cell.targetNode.attrs.x;
		var y = cell.targetNode.attrs.y;

		switch(player){
			case 1: drawTic(x,y,cell.targetNode.parent);
					break;
			case 2: drawTac(x,y,cell.targetNode.parent);
					break;
		}
	};

	//in this board, check for three in a row. If found, 
	//Turn the color of the stage to players color (red, green,...)


	//check if three game boards have been won

	//in a diagonal, horizontal, or vertical direction

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

