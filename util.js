
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
	if(players.current === 1){
		feedbackShape = new Kinetic.Circle({
			x: x + 15,
			y: y + 15,
			radius: 10,
			stroke: playerColor[1],
			strokeWidth: 1,
			dashArray: [2,4]
		});
	} else {
			feedbackShape = new Kinetic.Star({
			x: x+15,
			y: y+15,
			numPoints: 3,
			innerRadius: 10,
			outerRadius: 10,
			stroke: playerColor[2],
			strokeWidth: 1,
			dashArray: [2,3]
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
	var nextTurn;

	switch(players.current)	{
		case 1: drawTic(x,y,stage);
					gameState[ci.board][ci.cell] = 1;
					nextTurn = 2;
					break;
		case 2: drawTac(x,y,stage);
					gameState[ci.board][ci.cell] = 2;
					nextTurn = 1;
					break;
	}


	//in this board, check for three in a row. If found, 
	//Turn the color of the board to players color (red, green,...)

	horizontalWinnerCheck(gameState[ci.board], cell.targetNode.parent);
	players.current = nextTurn;

	//in the stage, check for three boards in a row that are owned 
	//by the player. If so, show winner screen

	//If no winner, transfer control to other player


}

function horizontalWinnerCheck(board, layer)
{

	$.each(	[[0,1,2], [3,4,5],[6,7,8]], 
		function(i, checLine){
			if( (board[checLine[0]] === board[checLine[1]]) && (board[checLine[0]] === board[checLine[2]]) && (board[checLine[0]] > 0) )
			{
				$.each(	layer.children,
					function(i, node){
						node.attrs.fill = playerColor[players.current];
					});
			}
		});

}

function drawTic(x,y, stage){
	var tic = new Kinetic.Circle({
		x: x + 15,
		y: y + 15,
		radius: 10,
		stroke: playerColor[1],
		strokeWidth: 1		
	});

	stage.add(tic);
	stage.drawScene();
}

function drawTac(x, y, stage){
	var fakeTac = new Kinetic.Star({
		x: x+15,
		y: y+15,
		numPoints: 4,
		innerRadius: 10,
		outerRadius: 10,
		stroke: playerColor[2],
		strokeWidth: 1
	});

	stage.add(fakeTac);
	stage.drawScene();
}

