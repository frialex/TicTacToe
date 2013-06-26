
function createLine(x, y, points) {
	var line = new Kinetic.Line({
		x: x,
		y: y,
		points: points,
		stroke: 'green'
	});

	return line;
}