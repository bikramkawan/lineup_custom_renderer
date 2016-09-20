
var categoricalCellRenderer = LineUpJS.renderer.createRenderer('g.my', function ($col, col, rows, context) {
      var $rows = $col.datum(col).selectAll('g.my').data(rows, context.rowKey);
      var $rows_enter = $rows.enter().append('g').attr({
          'class': 'my',
          'data-index': function (d, i) { return i; },
          transform: function (d, i) { return 'translate(' + context.cellX(i) + ',' + context.cellPrevY(i) + ')'; }
      });
      $rows_enter.append('text').attr({
          'clip-path': 'url(#' + context.idPrefix + 'clipCol' + col.id + ')',
          x: function (d, i) { return context.rowHeight(i); }
      });
      $rows_enter.append('path');
      $rows.attr({
          'data-index': function (d, i) { return i; },
          transform: function (d, i) { return 'translate(' + context.cellX(i) + ',' + context.cellY(i) + ')'; }
      });
      $rows.select('text').attr({
          x: function (d, i) { return context.rowHeight(i); }
      }).text(function (d) { return col.getLabel(d); });
      $rows.select('path').style({
          fill: function (d) { return 'green'; }
        }).attr({
          d: function(d, i) {
            var size = Math.max(context.rowHeight(i) - context.option('rowPadding', 1) * 2, 0);
            var index = col.categories.indexOf(col.getValue(d));
            var s = d3.svg.symbol().type(d3.svg.symbolTypes[index]).size(100);
            return s();
          },
          transform: function(d, i) {
            var size = Math.max(context.rowHeight(i) - context.option('rowPadding', 1) * 2, 0)/2;
            return 'translate('+size+','+size+')';
          }
      });
      context.animated($rows).attr({
          transform: function (d, i) { return 'translate(' + context.cellX(i) + ',' + context.cellY(i) + ')'; }
      });
      $rows.exit().remove();
  });

//expecting in the column an object with { mean, min, max} in the range 0...100
var MyColumn = LineUpJS.model.defineColumn('Custom', {
  compare: function (a, b) {
      return this.getValue(a).mean - this.getValue(b).mean;
  }
  });

var myCellRenderer = LineUpJS.renderer.createRenderer('path.shift', function ($col, col, rows, context) {
      var $rows = $col.datum(col).selectAll('path.shift').data(rows, context.rowKey);
      var $rows_enter = $rows.enter().append('path').attr({
          'class': 'shift',
          'data-index': function (d, i) { return i; },
          transform: function (d, i) { return 'translate(' + context.cellX(i) + ',' + context.cellPrevY(i) + ')'; }
      });
      var f = col.getWidth() / 100;
      $rows.attr('d', function(d, i) {
        var value = col.getValue(d);
        var left = value.min * f, right = value.max * f, center = value.mean * f;
        var top = context.option('rowPadding', 1);
        var bottom = Math.max(context.rowHeight(i) - top, 0);
        var middle = (bottom-top) / 2;
        return 'M'+left+','+middle+'L'+right+','+middle +
          'M'+left+','+top+'L'+left+','+bottom+
          'M'+center+','+top+'L'+center+','+bottom+
          'M'+right+','+top+'L'+right+','+bottom;
      })
      context.animated($rows).attr({
          transform: function (d, i) { return 'translate(' + context.cellX(i) + ',' + context.cellY(i) + ')'; }
      });
      $rows.exit().remove();
  });
