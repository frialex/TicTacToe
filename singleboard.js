$(function(){

  var stage  = new Kinetic.Stage({
    container : 'container',
    width     :  600,
    height    :  400
  });

  drawBoard(stage, 10,  10);
  drawBoard(stage, 110, 10);
  drawBoard(stage, 10,  110);
  drawBoard(stage, 110, 110);

  //Set up game loop here?

});

//so we can show feedback to the 
//user when they hover over a cell
var dottedCircle;


function drawBoard(stage, x, y){

  var layer = new Kinetic.Layer();

  var box = createRect(x,y,90,90);
  layer.add(box);

  //draw 9 squares inside the box
  //Create this matrix with [x,y] = permutation(10,40,70)
  $.each([[x,y],[x+30,y],[x+60,y],
          [x,y+30],[x+30,y+30],[x+60,y+30],
          [x,y+60],[x+30,y+60],[x+60,y+60]], 

          function(i, xy){
            var cell = createRect(xy[0],xy[1],30,30);
            layer.add(cell);

            cell.on('mouseover', moveIntoCell);
            cell.on('mouseout', moveOutOfCell)
            cell.on('click', clickedCell)
  });

  stage.add(layer);

}

