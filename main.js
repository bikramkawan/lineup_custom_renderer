/**
 * Created by Samuel Gratzl on 04.09.2014.
 */
// Self Invoking JS
(function (LineUpJS, d3) {
  var arr = [
      {a: 10, b: 20, c: 30, d: 'Row1', cat: 'c1',
       custom: { min: 10, max: 100, mean: 30}, custom2: { x:[10,22,44,66,88]},custom3: { x:[10,22,44,66,88]}},
      {a: 5, b: 14, c: 2, d: 'Row2', cat: 'c2',
      custom: { min: 10, max: 100, mean: 80},custom2: { x:[10,22,44,66,88]},custom3: { x:[10,22,44,66,88]}},
        {a: 2, b: 7, c: 100, d: 'Row3', cat: 'c3',
      custom: { min: 10, max: 80, mean: 30},custom2: { x:[10,22,44,66,88]},custom3: { x:[10,22,44,66,88]}},
      {a: 7, b: 1, c: 60, d: 'Row4', cat: 'c1',
      custom: { min: 20, max: 70, mean: 50},custom2: { x:[10,22,44,66,88]},custom3: { x:[10,22,44,66,88]}},
      {a: 7, b: 1, c: 60, d: 'Row4', cat: 'c1',
      custom: { min: 60, max: 90, mean: 80},custom2: { x:[10,22,44,66,88]},custom3: { x:[10,22,44,66,88]}},
   ];

    var desc = [
      {label: 'D', type: 'string', column: 'd'},
      {label: 'C', type: 'number', column: 'c', 'domain': [0, 120], color: 'green'},
     {label: 'A', type: 'number', column: 'a', 'domain': [0, 120], color: 'green'},
      {label: 'Cat', type: 'categorical', column: 'cat', categories : ['c1','c2','c3']},
      {label: 'Custom1', type: 'custom', column: 'custom'},
      {label: 'HeatMap', type: 'custom2', column: 'custom2'},
        {label: 'Spark Line', type: 'custom3', column: 'custom3'}
    ];

    var p = new LineUpJS.provider.LocalDataProvider(arr, desc, {
      columnTypes: {
        custom: MyColumn,
        custom2: MyColumn,
        custom3: MyColumn,


      }
    });
    var r = p.pushRanking();

    var root = d3.select('main');
     desc.forEach(function (d) {


        r.push(p.create(d));
    })

    var body = LineUpJS.create(p, root.node(), {
      renderers: {
        custom: myCellRenderer,
        custom2: myCellRenderer2,
        custom3: myCellRenderer3,
          categorical: categoricalCellRenderer

      }
    });
    body.update();
}(LineUpJS, d3));
