import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { BarType } from 'src/interfaces/bar.interface';

@Injectable({
  providedIn: 'root'
})
export class BarService {

  // private data!: BarType[];
  private highestValue: string = '';
  private svg!: any;
  private margin = 50;
  private width!: number;
  private height!: number;
  // private elementHtml!: HTMLElement;
  // private svgElement = d3.select<SVGElement, any>('svg');

  constructor() { }

  public createBarChart(elementHtml: HTMLElement, data: BarType[]) {
    this.width = parseInt(d3.select(elementHtml).style('width')) - this.margin - this.margin;
    this.height = parseInt(d3.select(elementHtml).style('height')) - this.margin - this.margin;
    this.svg = d3
      .select(elementHtml)
      .append('svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`
      )
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');



    // Creating X-axis band scale
    // console.log(Array.isArray(data));
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d: BarType) => d.Framework))
      .padding(0.3);

    // Drawing X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .attr('class', 'x-axis-scale')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10, 0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '14px');

    // Creaate Y-axis band scale
    const y = d3
      .scaleLinear()
      .domain([0, Number(this.highestValue) + 5])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg
      .append('g')
      .attr('class', 'y-axis-scale')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '14px');

    // Draw Gridlines
    // X-Axis Grid lines
    const xAxisGrid = d3
      .axisBottom(x)
      .tickSize(0)
      .tickFormat(() => '');


    this.svg
      .selectAll('g.gridline')
      .data(y.ticks())
      .enter()
      .append('g')
      .attr(
        'transform',
        (d: any, i: number) =>
          `translate(0, ${i * (this.height / (y.ticks().length - 1))})`
      )
      .attr('class', 'x-axis-grid')
      .attr('stroke', '2')
      .call(xAxisGrid);

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: BarType) => x(d.Framework))
      .attr('y', (d: BarType) => y(d.Stars))
      .attr('width', x.bandwidth())
      .attr('height', (d: BarType) =>
        y(d.Stars) < this.height ? this.height - y(d.Stars) : this.height
      ) // this.height
      .attr('fill', (d: BarType) => d.color);

    this.svg
      .selectAll('text.bar')
      .data(data)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#70747a')
      .attr('x', (d: BarType) => (x(d.Framework) as any) + 18)
      .attr('y', (d: BarType) => y(d.Stars) - 5)
      .text((d: BarType) => Math.round(d.Stars * 100) / 100);
  }

}
