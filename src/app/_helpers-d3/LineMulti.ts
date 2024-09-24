import * as d3 from 'd3';

export default function LineMulti(elementHtml: any, data: any, groups: any) {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 80, bottom: 30, left: 30 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select(elementHtml)
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr(
      'viewBox',
      `0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`
    )
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // List of groups (here I have one group per column)
  const allGroup = groups;

  // Reformat the data: we need an array of arrays of {x, y} tuples
  const dataReady = allGroup.map(function (grpName: any) {
    // .map allows to do something for each element of the list
    return {
      name: grpName,
      values: data.map(function (d: any) {
        return { time: d.time, value: +d[grpName] };
      }),
    };
  });

  // I strongly advise to have a look to dataReady with
  // console.log(dataReady)

  // A color scale: one color for each group
  const myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

  // Add X axis --> it is a date format
  const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .classed('x axis', true)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
  svg.append('g').classed('y axis', true).call(d3.axisLeft(y));

  // Grid Lines
  // ------------------------------------
  // X-Axis Grid lines
  const xAxisGrid = d3
    .axisBottom(x)
    .tickSize(0)
    .tickFormat(() => '');
  svg
    .selectAll('g.gridline')
    .data(y.ticks())
    .enter()
    .append('g')
    .attr(
      'transform',
      (d: any, i: number) =>
        `translate(0, ${i * (height / (y.ticks().length - 1))})`
    )
    .attr('class', 'x-axis-grid')
    .attr('stroke', '2')
    .call(xAxisGrid);

  // Y-Axis Grid lines
  const yAxisGrid = d3
    .axisLeft(y)
    .tickSize(0)
    .tickFormat(() => '');
  svg
    .selectAll('g.gridline')
    .data(new Array(groups.length).fill(width / groups.length))
    .enter()
    .append('g')
    .attr(
      'transform',
      (d: any, i: number) => `translate(${d * (i + 1) - d / 2}, 0)`
    )
    .attr('class', 'y-axis-grid')
    .attr('stroke-dasharray', '5 5')
    .call(yAxisGrid);
  // ------------------------------------

  // Add the lines
  const line = d3
    .line()
    .x((d: any) => x(+d.time))
    .y((d: any) => y(+d.value));
  svg
    .selectAll('myLines')
    .data(dataReady)
    .join('path')
    .attr('d', (d: any) => line(d.values))
    .attr('stroke', (d: any) => myColor(d.name) as any)
    .style('stroke-width', 2)
    .style('fill', 'none');

  // Add the points
  svg
    // First we need to enter in a group
    .selectAll('myDots')
    .data(dataReady)
    .join('g')
    .style('fill', (d: any) => myColor(d.name) as any)
    // Second we need to enter in the 'values' part of this group
    .selectAll('myPoints')
    .data((d: any) => d.values)
    .join('circle')
    .attr('cx', (d: any) => x(d.time))
    .attr('cy', (d: any) => y(d.value))
    .attr('r', 5)
    .attr('stroke', 'white');

  // Add a legend at the end of each line
  svg
    .selectAll('myLabels')
    .data(dataReady)
    .join('g')
    .append('text')
    .datum((d: any) => {
      return { name: d.name, value: d.values[d.values.length - 1] };
    }) // keep only the last value of each time series
    .attr(
      'transform',
      (d: any) => `translate(${x(d.value.time)},${y(d.value.value)})`
    ) // Put the text at the position of the last point
    .attr('x', 12) // shift the text a bit more right
    .text((d: any) => d.name)
    .style('fill', (d: any) => myColor(d.name) as any)
    .style('font-size', 15);
}
