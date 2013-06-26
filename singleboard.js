$(function(){

  var stage  = new Kinetic.Stage({
    container : 'container',
    width     :  600,
    height    :  400
  });

  drawBoard(stage)

  //Set up game loop here?

});


//TODO: Need to draw multiple boards
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

  box.on('mouseover', function(obj){ console.log(Object.keys(obj));});

  //draw 9 squares inside the box

  //Add click handler to each of the squares

  layer.add(box);
  stage.add(layer);

}

