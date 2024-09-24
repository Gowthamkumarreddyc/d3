import * as d3 from 'd3';

export default function AreaDensity(elementHtml: any, data: any) {
  const margin = { top: 30, right: 30, bottom: 30, left: 50 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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

  const gradientColor = `
    <linearGradient id="density-gradient" gradientTransform="rotate(90)">
      <stop class="stop1" offset="40%" />
      <stop class="stop2" offset="80%" />
      <stop class="stop3" offset="99%" />
    </linearGradient>
    <style>
      <![CDATA[
              .stop1 { stop-color: rgba(2,167,131,0.7); }
              .stop2 { stop-color: rgba(2,167,131,0.5); }
              .stop3 { stop-color: rgba(2,167,131,0.1); }
            ]]>
    </style>`;
  svg.append('defs').html(gradientColor);

  // add the x Axis
  const x = d3.scaleLinear().domain([-10, 15]).range([0, width]);
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .classed('x axis', true)
    .call(d3.axisBottom(x));

  // add the y Axis
  const y = d3.scaleLinear().range([height, 0]).domain([0, 0.12]);
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
  const x_partitions = x.ticks().length;
  const yAxisGrid = d3
    .axisLeft(y)
    .tickSize(0)
    .tickFormat(() => '');
  svg
    .selectAll('g.gridline')
    .data(new Array(x_partitions).fill(width / x_partitions))
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

  // Compute kernel density estimation
  const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(60));
  const density1 = kde(
    data
      .filter(function (d: any) {
        return d.type === 'variable 1';
      })
      .map(function (d: any) {
        return d.value;
      })
  );

  // Plot the area
  svg
    .append('path')
    .attr('class', 'mypath')
    .datum(density1)
    .attr('fill', 'url(#density-gradient)')
    .attr('opacity', '.6')
    .attr('stroke', '#000')
    .attr('stroke-width', 1)
    .attr('stroke-linejoin', 'round')
    .attr(
      'd',
      d3
        .line()
        .curve(d3.curveBasis)
        .x(function (d) {
          return x(d[0]);
        })
        .y(function (d) {
          return y(d[1]);
        })
    );

  // Function to compute density
  function kernelDensityEstimator(kernel: any, X: any) {
    return function (V: any) {
      return X.map(function (x: any) {
        return [
          x,
          d3.mean(V, function (v: any) {
            return kernel(x - v);
          }),
        ];
      });
    };
  }

  function kernelEpanechnikov(k: any) {
    return function (v: any) {
      return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
    };
  }
}
