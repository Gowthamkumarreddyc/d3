import * as d3 from 'd3';

export default function AreaLine(elementHtml: any, data: any) {
  let chartBody;

  let clip: any;
  let line: any;
  let x: any;
  let y: any;
  let zoom: any;
  let make_x_axis: any;
  let make_y_axis: any;
  let xAxis: any;
  let yAxis: any;
  let area: any;
  let areaPath: any;
  let width: any;
  let height: any;
  let margin: any;

  let panel_1_status = 0; //0 - not loaded, 1 - first time loaded, 2 - getting new data every X seconds

  function initGraph() {
    margin = {
      top: 0,
      right: 20,
      bottom: 20,
      left: 45,
    };

    width = 600 - margin.left - margin.right;
    height = 400 - margin.top - margin.bottom;

    x = d3.scaleTime()
      .domain(
        (d3 as any).extent(data, function (d: any) {
          return d.t;
        })
      )
      .range([0, width]);

    y = d3.scaleLinear()
      .domain(
        (d3 as any).extent(data, function (d: any) {
          return d.val;
        })
      )
      .range([height, 0]);

    line = d3.line()
      .curve(d3.curveBasis)
      .x(function (d: any) {
        return x(d.t);
      })
      .y(function (d: any) {
        return y(d.val);
      });

    zoom = d3.zoom().on('zoom', zoomed);

    let svg: any = d3
      .select(elementHtml)
      .append('svg:svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('height', '400')
      .attr('width', '600')
      .attr('viewBox', '0 0 600 400')
      .classed('svg-content-responsive', true)
      .append('svg:g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(zoom);

    svg
      .append('svg:rect')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'plot');

    make_x_axis = function () {
      return d3.axisBottom(x).scale(x).ticks(5);
    };

    make_y_axis = function () {
      return d3.axisLeft(y).scale(y).ticks(5);
    };

    xAxis = d3.axisBottom(x).scale(x).ticks(5);

    svg
      .append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxis);

    yAxis = d3.axisLeft(y).scale(y).ticks(5);

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('x', -5)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Temperature °C');

    svg
      .append('g')
      .attr('class', 'x grid')
      .attr('transform', 'translate(0,' + height + ')')
      .call(make_x_axis().tickSize(-height, 0, 0).tickFormat(''));

    svg
      .append('g')
      .attr('class', 'y grid')
      .call(make_y_axis().tickSize(-width, 0, 0).tickFormat(''));

    clip = svg
      .append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height);

    chartBody = svg.append('g').attr('clip-path', 'url(#clip)');

    chartBody
      .append('svg:path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);

    area = d3.area()
      .curve(d3.curveBasis)
      .x(function (d: any) {
        return x(d.t);
      })
      .y0(height)
      .y1(function (d: any) {
        return y(d.val);
      });
    // Add the filled area
    areaPath = chartBody
      .append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', area);

      function zoomed() {
        svg.select('.x.axis').call(xAxis);
        svg.select('.y.axis').call(yAxis);
        svg
          .select('.x.grid')
          .call(make_x_axis().tickSize(-height, 0, 0).tickFormat(''));
        svg
          .select('.y.grid')
          .call(make_y_axis().tickSize(-width, 0, 0).tickFormat(''));
        svg.select('.line').attr('class', 'line').attr('d', line);
    
        svg.select('path.area').attr('d', area);
      }
  }  

  initGraph();
}