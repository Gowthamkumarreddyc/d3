import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { HorizontalStackedColumnType } from 'src/interfaces/horizontalstackedcolumn.interface';

@Injectable({
  providedIn: 'root'
})
export class StackedhorizontalService {

  constructor() { }

  public stackedHorizontalColumnChart(elementHtml: HTMLElement, data: HorizontalStackedColumnType[], columns: any, subgroups: any) {
    const margin = 50,
      width = parseInt(d3.select(elementHtml).style('width')) - margin - margin,
      height = parseInt(d3.select(elementHtml).style('height')) - margin - margin;

    // append the svg object to the body of the page
    const svg = d3
      .select(elementHtml)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr(
        'viewBox',
        `0 0 ${width + margin + margin} ${height + margin + margin
        }`
      )
      .append('g')
      .attr('transform', `translate(${margin},${margin})`);

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map((d: any) => d.group);

    // Add X axis
    const x = d3
      .scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.3] as any);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .classed('x axis', true)
      .call(d3.axisBottom(x).tickSize(10));

    // Add Y axis
    const maxValue: any = () => {
      let tempMax: number = 0;
      data.map((d: any) => {
        subgroups.map((col: any) => {
          let v = parseInt(d[col], 10);
          tempMax = tempMax < v ? v : tempMax;
        });
      });
      return tempMax;
    };

    const y = d3.scaleLinear().domain([0, maxValue()]).range([height, 0]);
    svg.append('g').classed('y axis', true).call(d3.axisLeft(y));

    // Draw gridlines
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

    // Another scale for subgroup position?
    const xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.2] as any);

    // color palette = one color per subgroup
    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range([
        '#D9D9D9',
        '#02A783',
        '#FF7900',
        '#031A6B',
        '#087CA7',
        '#93867F',
        '#7D70BA',
        '#28231C',
        '#655356',
        '#7E007B',
        '#792359',
        '#048A81',
        '#B3C2F2',
        '#41292C',
        '#93B7BE',
      ]);

    // Show the bars
    svg
      .append('g')
      .selectAll('g')
      // Enter in data = loop group per group
      .data(data)
      .join('g')
      .attr('transform', (d: any) => `translate(${x(d.group)}, 0)`)
      .selectAll('rect')
      .data(function (d: any) {
        return subgroups.map(function (key: any) {
          return { key: key, value: d[key] };
        });
      })
      .join('rect')
      .attr('x', (d: any) => xSubgroup(d.key) as any)
      .attr('y', (d: any) => y(d.value))
      .attr('width', xSubgroup.bandwidth())
      .attr('height', (d: any) => height - y(d.value))
      .attr('fill', (d: any) => color(d.key) as any);
  }
}
