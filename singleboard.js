//so we can show feedback to the 
//user when they hover over a cell
var feedbackShape;

//eventuall want to have more than two players.
//so Boolean var won't work. 2vs2 would be cool
var players = {
  1: 'player name here',
  2: 'player two',
  current: 1, //Let first person have turn by default
  me: 0
};

var playerColor = {
  1: 'red',
  2: 'green'
};


//2d array, index by cell.attr.id.board
//[boardId][CellId] => Cell object 
//[boardId][CellId].ttt => Games custom vars
var gameState = [];


$(function StartUp(){

  //Performance penalty for closures?
  var stageDrawer = function stageFactory(){
    var stage  = new Kinetic.Stage({      
      container : 'container',
      width     :  600,
      height    :  400
    });

    var boardId = 0;    

    return function(x, y){
      drawBoard(stage, boardId, x, y);
      boardId++;
    };
  }();

  //Draw four boards
  $.each([[10,10],  [110,10],   [210,10],
          [10,110], [110,110],  [210,110],
          [10,210], [110,210],  [210,210]],
          function(i, xy){
            stageDrawer(xy[0],xy[1]);
  });
});

function drawBoard(stage, boardId, x, y){

  var layer = new Kinetic.Layer();

  var cellId = 0;
  gameState[boardId] = new Array(9);
  //draw 9 squares inside the box
  //Create this matrix with [x,y] = permutation(10,40,70)?
  $.each([[x,y],    [x+30,y],     [x+60,y],
          [x,y+30], [x+30,y+30],  [x+60,y+30],
          [x,y+60], [x+30,y+60],  [x+60,y+60]], 

    function CellMaker(i, xy){
      var cell = drawCell(xy[0],xy[1],30,30, boardId, cellId++);
      layer.add(cell);

      cell.on('mouseover', moveIntoCell);
      cell.on('mouseout', moveOutOfCell);
      cell.on('click', clickedCell);
    });

  stage.add(layer);
}

function drawCell(x, y, width, height, boardId, cellId) {
  var cell = new Kinetic.Rect({
    x: x,
    y: y,
    width: width,
    height: height,
    stroke: 'black',
    strokeWidth: 2,
    id: { board: boardId, cell: cellId }
  });

  cell.ttt = {}; //Name space for this app
  cell.ttt.cellOwner = 0;
  cell.ttt.enabled = true;

  gameState[boardId][cellId] = cell;
  return cell;
}
