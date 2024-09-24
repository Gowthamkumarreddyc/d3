import * as d3 from 'd3';

export default function Timeline(elementHtml: any, data: any[]) {
  let lanes = ['Chinese', 'Japanese', 'Korean'];
  let laneLength = lanes.length;
  let items = data;

  items = items.map((v) => {
    v.start = new Date(
      `${v.start < 10 ? '0' : ''}${v.start < 100 ? '00' : ''}${v.start}-01-01`
    );
    v.end = new Date(`${v.end}-12-31`);
    return v;
  });

  let timeBegin = new Date('0000');
  let timeEnd = new Date('2000');

  // ------------------
  let m = [20, 15, 15, 120]; //top right bottom left
  let w = 960 - m[1] - m[3];
  let h = 500 - m[0] - m[2];
  let f = 20;
  let miniHeight = laneLength * 12 + 50;
  let mainHeight = h - miniHeight - 50;

  //scales
  let x = d3.scaleTime().domain([timeBegin, timeEnd]).range([0, w]);
  let x1 = d3.scaleTime().domain([timeBegin, timeEnd]).range([0, w]);
  let y1 = d3.scaleLinear().domain([0, laneLength]).range([0, mainHeight]);
  let y2 = d3.scaleLinear().domain([0, laneLength]).range([0, miniHeight]);

  // ------------------------
  let xAxis = d3
    .axisBottom(x)
    .scale(x)
    // .ticks(d3.time.years, 100)
    .tickFormat((d3 as any).timeFormat('%Y'))
    .tickSize(5)
    .tickPadding(1);

  let x1Axis: any = d3
    .axisBottom(x1)
    .scale(x1)
    // .ticks(d3.time.years, 100)
    .tickFormat((d3 as any).timeFormat('%Y'))
    .tickSize(5)
    .tickPadding(1);

  let chart = d3
    .select(elementHtml)
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', `0 0 ${w + m[1] + m[3]} ${h + m[0] + m[2]}`)
    .attr('class', 'chart');

  chart
    .append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', w)
    .attr('height', mainHeight);

  let main = chart
    .append('g')
    .attr('transform', `translate(${m[3]}, ${m[0]})`)
    .attr('width', w)
    .attr('height', mainHeight)
    .attr('class', 'main');

  let mini = chart
    .append('g')
    .attr('transform', `translate(${m[3]}, ${mainHeight + m[0]})`)
    .attr('width', w)
    .attr('height', miniHeight)
    .attr('class', 'mini');

  var focus = main.append('g').attr('class', 'focus');

  focus.append('g').attr('class', 'x1 axis').call(x1Axis);

  //main lanes and texts
  main
    .append('g')
    .selectAll('.laneLines')
    .data(items)
    .enter()
    .append('line')
    .attr('x1', m[1])
    .attr('y1', (d) => y1(d.lane) + f)
    .attr('x2', w)
    .attr('y2', (d) => y1(d.lane) + f)
    .attr('stroke', 'lightgray');

  main
    .append('g')
    .selectAll('.laneText')
    .data(lanes)
    .enter()
    .append('text')
    .text((d) => d)
    .attr('x', -m[1])
    .attr('y', (d, i) => y1(i + 0.5) + f)
    .attr('dy', '.5ex')
    .attr('text-anchor', 'end')
    .attr('class', 'laneText');

  //mini lanes and texts
  mini
    .append('g')
    .selectAll('.laneLines')
    .data(items)
    .enter()
    .append('line')
    .attr('x1', m[1])
    .attr('y1', (d) => y2(d.lane) + f)
    .attr('x2', w)
    .attr('y2', (d) => y2(d.lane) + f)
    .attr('stroke', 'lightgray');

  mini
    .append('g')
    .selectAll('.laneText')
    .data(lanes)
    .enter()
    .append('text')
    .text((d) => d)
    .attr('x', -m[1])
    .attr('y', (d, i) => y2(i + 0.5) + f)
    .attr('dy', '.5ex')
    .attr('text-anchor', 'end')
    .attr('class', 'laneText');

  var itemRects = main.append('g').attr('clip-path', 'url(#clip)');

  //mini item rects
  mini
    .append('g')
    .selectAll('miniItems')
    .data(items)
    .enter()
    .append('rect')
    .attr('class', (d) => `miniItem${d.lane}`)
    .attr('x', (d) => x(d.start))
    .attr('y', (d) => y2(d.lane + 0.5) - 5 + f)
    .attr('width', (d) => x(d.end) - x(d.start))
    .attr('height', 10);

  //mini labels
  mini
    .append('g')
    .selectAll('.miniLabels')
    .data(items)
    .enter()
    .append('text')
    .text((d) => d.id)
    .attr('x', (d) => x(d.start))
    .attr('y', (d) => y2(d.lane + 0.5) + f)
    .attr('dy', '.5ex');

  //brush
  // var brush = d3.svg.brush().x(x).on('brush', display);

  mini
    .append('g')
    .attr('class', 'x brush')
    // .call(brush)
    .selectAll('rect')
    .attr('y', 1 + f)
    .attr('height', miniHeight - 1);

  function display() {
    var rects;
    var labels;
    // var minExtent = brush.empty() ? x1.domain()[0] : brush.extent()[0];
    // var maxExtent = brush.empty() ? x1.domain()[1] : brush.extent()[1];
    // var visItems = items.filter(
    //   (d) => d.start < maxExtent && d.end > minExtent
    // );

    // if (!brush.empty()) {
    //   mini.select('.brush').call(brush.extent([minExtent, maxExtent]));
    // }

    // x1.domain([minExtent, maxExtent]);

    focus.select('.x1.axis').call(x1Axis);

    //update main item rects
    rects = itemRects
      .selectAll('rect')
      // .data(visItems, (d: any) => d.id)
      .data(items, (d: any) => d.id)
      .attr('x', (d: any) => x1(d.start))
      .attr('width', (d: any) => x1(d.end) - x1(d.start));

    rects
      .enter()
      .append('rect')
      .attr('class', (d: any) => 'miniItem' + d.lane)
      .attr('x', (d: any) => x1(d.start))
      .attr('y', (d: any) => y1(d.lane) + 10 + f)
      .attr('width', (d: any) => x1(d.end) - x1(d.start))
      .attr('height', (d: any) => 0.09 * y1(1));

    // rects.exit().remove();

    //update the item labels
    labels = itemRects
      .selectAll('text')
      .data(items, (d: any) => d.id)
      .attr('x', (d) => x1(d.start + 2));
    //  .data(visItems, (d: any) => d.id)
    //   .attr('x', (d) => x1(Math.max(d.start, minExtent) + 2));

    labels
      .enter()
      .append('text')
      .text((d) => d.id)
      .attr('x', (d: any) => x1(d.start))
      //   .attr('x', (d) => x1(Math.max(d.start, minExtent)))
      .attr('y', (d) => y1(d.lane + 0.5))
      .attr('text-anchor', 'start');

    // labels.exit().remove();
  }

  display();
}
