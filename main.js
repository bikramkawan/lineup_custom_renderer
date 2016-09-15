/**
 * Created by Samuel Gratzl on 04.09.2014.
 */

(function (LineUpJS, d3) {
  var __extends = (this && this.__extends) || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var MyCellRenderer = (function (_super) {
      __extends(MyCellRenderer, _super);
      function MyCellRenderer() {
          _super.apply(this, arguments);
          this.textClass = 'my';
      }
      MyCellRenderer.prototype.render = function ($col, col, rows, context) {
          var $rows = $col.datum(col).selectAll('g.' + this.textClass).data(rows, context.rowKey);
          var $rows_enter = $rows.enter().append('g').attr({
              'class': this.textClass,
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
      };
      MyCellRenderer.prototype.findRow = function ($col, index) {
          return $col.selectAll('g.' + this.textClass + '[data-index="' + index + '"]');
      };
      return MyCellRenderer;
    })(LineUpJS.renderer.DefaultCellRenderer);

  var arr = [
      {a: 10, b: 20, c: 30, d: 'Row1', e: false, l: {alt: 'Google', href: 'https://google.com'}, cat: 'c2'},
      {a: 5, b: 14, c: 2, d: 'Row2', e: true, l: {alt: 'ORF', href: 'https://orf.at'}, cat: 'c3'},
      {a: 2, b: 7, c: 100, d: 'Row3', e: false, l: {alt: 'heise.de', href: 'https://heise.de'}, cat: 'c2'},
      {a: 7, b: 1, c: 60, d: 'Row4dasfa dsfasdf  adsf asdf asdf', e: false, l: {alt: 'Google', href: 'https://google.com'}, cat: 'c1;c3'}];
    var desc = [
      {label: 'D', type: 'string', column: 'd', cssClass: 'orange'},
      {label: 'C', type: 'number', column: 'c', 'domain': [0, 120], color: 'green'},
      {label: 'Cat', type: 'categorical', column: 'cat', categories : ['c1','c2','c3']}
    ];

    var p = new LineUpJS.provider.LocalDataProvider(arr, desc);
    var r = p.pushRanking();

    var root = d3.select('main');
    r.push(p.create(desc[0]));
    r.push(p.create(desc[1]));
    r.push(p.create(desc[2]));

    var body = LineUpJS.create(p, root.node(), {
      renderers: {
        categorical: new MyCellRenderer()
      }
    });
    body.update();
}(LineUpJS, d3));
