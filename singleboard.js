$(function StartUp(){


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

  $.each([[10,10],[110,10],
          [10,110],[110,110]],
          function(i, xy){
            stageDrawer(xy[0],xy[1]);
    });

});

//so we can show feedback to the 
//user when they hover over a cell
var dottedCircle;

//2d array, index by cell.attr.id.board
var gameState;

//eventuall want to have more than two players.
//so Boolean var won't work. 2vs2 would be cool
var players = {
  one: 'player name here',
  two: 'player two',
  current: 'one' //Let first person have turn by defautl. 
};


function drawBoard(stage, boardId, x, y){

  var layer = new Kinetic.Layer();

  var cellId = 0;
//draw 9 squares inside the box
//Create this matrix with [x,y] = permutation(10,40,70)?
$.each([[x,y],    [x+30,y],     [x+60,y],
  [x,y+30], [x+30,y+30],  [x+60,y+30],
  [x,y+60], [x+30,y+60],  [x+60,y+60]], 

  function CellMaker(i, xy){
    var cell = createRect(xy[0],xy[1],30,30, boardId, cellId++);
    layer.add(cell);

    cell.on('mouseover', moveIntoCell);
    cell.on('mouseout', moveOutOfCell)
    cell.on('click', clickedCell)
  });

stage.add(layer);

}

