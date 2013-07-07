function moveIntoCell(e){
	
	var ci = e.targetNode.attrs;
	var x = ci.x;
	var y = ci.y;

	if((gameState[ci.id.board][ci.id.cell].ttt.cellOwner !== 0)
	|| (!e.targetNode.ttt.enabled))	return;

	//Draw a shape of players color inside the cell
	if(players.me === 1){
		feedbackShape = drawTic(x,y, [2,4]);
	} else {
		feedbackShape = drawTac(x,y, [2,3]);
	}
	this.parent.add(feedbackShape);
	this.parent.drawScene(); 
}

function moveOutOfCell(e){	
	if(feedbackShape) feedbackShape.hide();
	this.parent.drawScene();
}

function clickedCell(e){
	if(players.me !== players.current) return;
	
	var ci = e.targetNode.attrs.id;
	var cell = e.targetNode;
	var stage  = e.targetNode.parent;
	var clickedCellState = gameState[ci.board][ci.cell].ttt.cellOwner;

	//If cell taken, return
	if((clickedCellState !== 0)
	|| (!cell.ttt.enabled)) return;

	var nextTurn = drawTicTacToe(players.current,cell);


	//in this board, check for three in a row. If found, 
	//Turn the color of the board to players color (red, green,...)
	if(CheckForWinner(gameState[ci.board], e.targetNode.parent))
	{
		console.log('board was won!');
		//in the stage, check for three boards in a row that are owned 
		//by the player. If so, show winner screen

		//socket.emit: player, board..
		//TODO: After a board is won the other 
		//can still be sent there and play on that board..
		//FIX THAT
	}
	
	//send move to other player
	socket.emit('cellClicked', {	board : ci.board,
								 	cell  : ci.cell,
								 	player: players.current,								    
								});


	//If no winner, transfer control to other player
	players.current = nextTurn;

	//enable the next board, and disable others, per rule
	disableBoards(ci.cell);
	//TODO: need to cycle player number on socket to 1, or 2. 
	//		on disconnect decrement..
	

}


function disableBoards(enabledBoard){

	$.each(gameState, function(i,board){
		$.each(board, function(i, cell){			
			cell.enableDashArray();
			cell.setDashArray([2,3]);
			cell.ttt.enabled = false;
		});
		board[0].parent.drawScene();
	});

	if(players.me === players.current)
	{
		var nextBoard =	gameState[enabledBoard];
		$.each(gameState[enabledBoard], function(i, cell){
			cell.disableDashArray();
			cell.ttt.enabled = true;
		});
		nextBoard[0].parent.drawScene();		
	}

}

//Go through all possible combination of three in a row
function CheckForWinner(board, layer)
{

	var winner = 0;

	$.each(	[	[0,1,2],[3,4,5],[6,7,8],  //Horizontal
				[0,3,6],[1,4,7],[2,5,8], //Vertical
				[0,4,8],[2,4,6] ], 		//Diagonal 

			function(i, row){
				var first = board[row[0]].ttt.cellOwner;
				var second = board[row[1]].ttt.cellOwner;
				var third = board[row[2]].ttt.cellOwner;
				if( (first === second) && (first === third) && (first > 0) )
				{
					winner = first;
					$.each(board, function(i, cell){
						cell.attrs.fill = playerColor[players.current];
					})
				}
			}
		);

	return winner;
}

function drawTicTacToe(player, cell)
{
	var nextTurn;
	var x = cell.attrs.x;
	var y = cell.attrs.y;
	var stage = cell.parent;
	var marker;


	switch(player)	{
		case 1: marker = drawTic(x,y);
				cell.ttt.cellOwner = 1;
				nextTurn = 2;
				break;
		case 2: marker = drawTac(x,y);
				cell.ttt.cellOwner = 2;
				nextTurn = 1;
				break;
	}

	cell.parent.add(marker);
	cell.parent.drawScene();

	return nextTurn;
}

function drawTic(x, y, dash){
	var tic = new Kinetic.Circle({
		x: x + 15,
		y: y + 15,
		radius: 10,
		stroke: playerColor[1],
		strokeWidth: 1,
		dashArray: dash		
	});

	return tic;
}

function drawTac(x, y, dash){
	var fakeTac = new Kinetic.Star({
		x: x+15,
		y: y+15,
		numPoints: 4,
		innerRadius: 10,
		outerRadius: 10,
		stroke: playerColor[2],
		strokeWidth: 1,
		dashArray: dash
	});

	return fakeTac;
}

