$(function(){

  var stage  = new Kinetic.Stage({
    container : 'container',
    width     :  600,
    height    :  400
  });

  drawBoard(stage)
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

  
  var leftVertical = createLine(10,10, [30,0, 30,100]);
  var rightVertical = createLine(10,10, [70,0,70,100]);

  var topHorizontal = createLine(10,10, [0,30,100,30]);
  var bottomHorizontal = createLine(10,10, [0,70, 100,70]);

  layer.add(box);
  layer.add(leftVertical);
  layer.add(rightVertical);
  layer.add(topHorizontal);
  layer.add(bottomHorizontal);
  stage.add(layer);

}

