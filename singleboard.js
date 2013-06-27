$(function(){

  var stage  = new Kinetic.Stage({
    container : 'container',
    width     :  600,
    height    :  400
  });

  drawBoard(stage)

  //Set up game loop here?

});

//so we can show feedback to the 
//user when they hover over a cell
var dottedCircle;


function drawBoard(stage){

  var layer = new Kinetic.Layer();

  var box = createRect(10,10,90,90);
  layer.add(box);

  //draw 9 squares inside the box
  var tl = createRect(10,10,30,30);
  layer.add(tl);
  var tm = createRect(40,10,30,30);
  layer.add(tm);

  //Create this matrix with [x,y] = permutation(10,40,70)
  $.each([[10,10],[40,10],[70,10],
          [10,40],[40,40],[70,40],
          [10,70],[40,70],[70,70]], 

          function(i, xy){
            var cell = createRect(xy[0],xy[1],30,30);
            layer.add(cell);

            cell.on('mouseover', moveIntoCell);
            cell.on('mouseout', moveOutOfCell)
            cell.on('click', clickedCell)
  });

  stage.add(layer);

}

