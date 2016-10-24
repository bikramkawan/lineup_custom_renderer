var categoricalCellRenderer = LineUpJS.renderer.createRenderer('g.my', function ($col, col, rows, context) {
    var $rows = $col.datum(col).selectAll('g.my').data(rows, context.rowKey);
    var $rows_enter = $rows.enter().append('g').attr({
        'class': 'my',
        'data-index': function (d, i) {
            return i;
        },
        transform: function (d, i) {
            return 'translate(' + context.cellX(i) + ',' + context.cellPrevY(i) + ')';
        }
    });
    $rows_enter.append('text').attr({
        'clip-path': 'url(#' + context.idPrefix + 'clipCol' + col.id + ')',
        x: function (d, i) {
            return context.rowHeight(i);
        }
    });
    $rows_enter.append('path');
    $rows.attr({
        'data-index': function (d, i) {
            return i;
        },
        transform: function (d, i) {
            return 'translate(' + context.cellX(i) + ',' + context.cellY(i) + ')';
        }
    });
    $rows.select('text').attr({
        x: function (d, i) {
            return context.rowHeight(i);
        }
    }).text(function (d) {
        rows.forEach(function (i) {


        })

        return col.getLabel(d);
    });
    $rows.select('path').style({
        fill: function (d) {
            return 'green';
        }
    }).attr({
        d: function (d, i) {
            var size = Math.max(context.rowHeight(i) - context.option('rowPadding', 1) * 2, 0);
            var index = col.categories.indexOf(col.getValue(d));
            var s = d3.svg.symbol().type(d3.svg.symbolTypes[index]).size(100);
            return s();
        },
        transform: function (d, i) {
            var size = Math.max(context.rowHeight(i) - context.option('rowPadding', 1) * 2, 0) / 2;
            return 'translate(' + size + ',' + size + ')';
        }
    });
    context.animated($rows).attr({
        transform: function (d, i) {
            return 'translate(' + context.cellX(i) + ',' + context.cellY(i) + ')';
        }
    });
    $rows.exit().remove();
});

//expecting in the column an object with { mean, min, max} in the range 0...100
var MyColumn = LineUpJS.model.defineColumn('Custom', {
    compare: function (x, y) {

        return this.getValue(x).mean - this.getValue(y).mean;
    }
});


// var MyColumn2 = LineUpJS.model.defineColumn('Custom', {
//     compare: function (a, b) {
//         return this.getValue(a).mean - this.getValue(b).mean;
//     }
// });

// console.log(MyColumn1);

var myCellRenderer = LineUpJS.renderer.createRenderer('path.shift', function ($col, col, rows, context) {
    var $rows = $col.datum(col).selectAll('path.shift').data(rows, context.rowKey);
    var $rows_enter = $rows.enter().append('path').attr({
        'class': 'shift',
        'data-index': function (d, i) {
            return i;
        },
        transform: function (d, i) {
            return 'translate(' + context.cellX(i) + ',' + context.cellPrevY(i) + ')';
        }
    });
    var f = col.getWidth() / 100;
    $rows.attr('d', function (d, i) {
        var value = col.getValue(d);

        var left = value.min * f, right = value.max * f, center = value.mean * f;
        var top = context.option('rowPadding', 1);
        var bottom = Math.max(context.rowHeight(i) - top, 0);
        var middle = (bottom - top) / 2;
        return 'M' + left + ',' + middle + 'L' + right + ',' + middle +
            'M' + left + ',' + top + 'L' + left + ',' + bottom +
            'M' + center + ',' + top + 'L' + center + ',' + bottom +
            'M' + right + ',' + top + 'L' + right + ',' + bottom;
    })
    context.animated($rows).attr({
        transform: function (d, i) {
            return 'translate(' + context.cellX(i) + ',' + context.cellY(i) + ')';
        }
    });
    $rows.exit().remove();
});


var myCellRenderer2 = LineUpJS.renderer.createRenderer('g.my', function ($col, col, rows, context) {
    var p=d3.scale.category20();
    var colors=p.range();
    //var colors = ['#27AE60', '#f4ee42', '#42f48f', '#f45942', '#2980B9'];
    var height = 5;
    var width = [];
    var y = 3;
    var scale = d3.scale.linear().range([0, 100]); // Constraint the window width
    var max = 0;

    rows.forEach(function (d, i) {
        max = d3.max([max, d3.sum(d.custom2.x)]);
        scale.domain([0, max]);  // Convert any range to fix with in window width
    });

    var $rows = $col.datum(col).selectAll('g.my').data(rows, context.rowKey);

    var $rows_enter = $rows.enter().append('g').attr({
        'class': 'my',
        'data-index': function (d, i) {
            return i;
        },
        transform: function (d, i) {
            return 'translate(' + context.cellX(i) + ',' + context.cellPrevY(i) + ')';
        }
    });

    var $rects = $rows_enter.selectAll('rect').data(function (d) {
        return d.custom2.x
    }); // Select custom2.x data
    $rects.enter().append('rect');
    $rects.attr({
        'data-index': function (d, i) {
            return i;
        },

        'width': function (d) {
            return scale(d);
        },
        'height': height,
        'y': y,
        'x': function (d) {
            var prev = this.previousSibling; // One previous step information.
            return (prev === null) ? 0 : parseFloat(d3.select(prev).attr('x')) + parseFloat(d3.select(prev).attr('width'));
        },
        'fill': function (d, i) {
            return colors[i];
        }
    });

    context.animated($rows).attr({
        transform: function (d, i) {
            return 'translate(' + context.cellX(i) + ',' + context.cellY(i) + ')';
        }
    });
    $rows.exit().remove();
});

var myCellRenderer3 = LineUpJS.renderer.createRenderer('path.shift', function ($col, col, rows, context) {
    var $rows = $col.datum(col).selectAll('path.shift').data(rows, context.rowKey);
    var $rows_enter = $rows.enter().append('path').attr({
        'class': 'shift',
        'data-index': function (d, i) {
            return i;
        },
        transform: function (d, i) {
            return 'translate(' + context.cellX(i) + ',' + context.cellPrevY(i) + ')';
        }
    });

   var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9];


    maxY = d3.max(data),
    x = d3.scale.linear().domain([0, data.length]).range([0, 100]);
    y = d3.scale.linear().domain([0, maxY]).range([10, 0]);
		// X scale will fit values from 0-10 within pixels 0-100

		// create a line object that represents the SVN line we're creating
		var line = d3.svg.line()
			// assign the X function to plot our line as we wish
			 //.interpolate('linear')
        .x(function(d, i) { return x(i); })
        .y(function(d, i) { return y(d); })

    $rows.attr('d', line(data));


    context.animated($rows).attr({
        transform: function (d, i) {
            return 'translate(' + context.cellX(i) + ',' + context.cellY(i) + ')';
        }
    });
    $rows.exit().remove();
});


