/**
 * Created by Samuel Gratzl on 04.09.2014.
 */

(function (LineUpJS, d3) {
  var arr = [
      {a: 10, b: 20, c: 30, d: 'Row1', cat: 'c1', custom: { min: 10, max: 100, mean: 30}},
      {a: 5, b: 14, c: 2, d: 'Row2', cat: 'c2', custom: { min: 10, max: 100, mean: 80}},
      {a: 2, b: 7, c: 100, d: 'Row3', cat: 'c3', custom: { min: 10, max: 80, mean: 30}},
      {a: 7, b: 1, c: 60, d: 'Row4dasfa dsfasdf', cat: 'c1', custom: { min: 20, max: 70, mean: 50}}
    ];
    var desc = [
      {label: 'D', type: 'string', column: 'd'},
      {label: 'C', type: 'number', column: 'c', 'domain': [0, 120], color: 'green'},
      {label: 'Cat', type: 'categorical', column: 'cat', categories : ['c1','c2','c3']},
      {label: 'Custom', type: 'custom', column: 'custom'}
    ];

    var p = new LineUpJS.provider.LocalDataProvider(arr, desc, {
      columnTypes: {
        custom: MyColumn
      }
    });
    var r = p.pushRanking();

    var root = d3.select('main');
    r.push(p.create(desc[0]));
    r.push(p.create(desc[3]));
    r.push(p.create(desc[1]));
    r.push(p.create(desc[2]));

    var body = LineUpJS.create(p, root.node(), {
      renderers: {
        custom: myCellRenderer,
        categorical: categoricalCellRenderer
      }
    });
    body.update();
}(LineUpJS, d3));
