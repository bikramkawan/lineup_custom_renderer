
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
