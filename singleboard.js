$(function(){

  var stage  = new Kinetic.Stage({
    container : 'container',
    width     :  600,
    height    :  400
  });

  drawBoard(stage)

  //Set up game loop here?
});



function drawBoard(stage){

  var layer = new Kinetic.Layer();

  var box = new Kinetic.Rect({
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    stroke: 'green',
    strokeWidth: 2
  });

  //draw 9 squares inside the box

  //Add click handler to each of the squares


  stage.add(layer);

}

