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
    strokeWidth: 4
  });

  var firstDivider = new Kinetic.Line({
    x: 10,
    y: 10,
    points: [30, 2, 30, 98],
    stroke: 'green'
  });

  var secondDivider = new Kinetic.Line({
    x: 10,
    y: 10,
    points: [70, 2, 70, 98],
    stroke: 'green'
  });


  layer.add(box);
  layer.add(firstDivider);
  layer.add(secondDivider);
  stage.add(layer);

}

