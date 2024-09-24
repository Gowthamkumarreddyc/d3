import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { nest } from 'd3-collection';
import { ViolinType } from 'src/interfaces/violin.interface';

@Injectable({
  providedIn: 'root'
})
export class ViolinService {

  private elementHTML!: HTMLElement;
  private data!: Array<ViolinType>;
  private groups: any[] = [];
  // private radiusCircle: number = 5;

  private margin = 40;
  private width!: number;
  private height!: number;
  private svg: any;

  constructor() { }

  public createViolinChart(elementHtml: HTMLElement, data: Array<ViolinType>, groups: any[]) {
    this.data = data;
    this.elementHTML = elementHtml;
    this.groups = groups;
    this.createSvg();
    this.drawPlot();
  }

  private createSvg(): void {
    this.width = parseInt(d3.select(this.elementHTML).style('width')) - this.margin - this.margin;
    this.height = parseInt(d3.select(this.elementHTML).style('height')) - this.margin - this.margin;
    this.svg = d3
      .select(this.elementHTML)
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin + this.margin} ${this.height + this.margin + this.margin
        }`
      )
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin + ',' + this.margin + ')'
      );

    const gradientColor = `
    <linearGradient id="violin-gradient">
      <stop class="stop1" offset="25%" />
      <stop class="stop2" offset="50%" />
      <stop class="stop3" offset="60%" />
      <stop class="stop4" offset="100%" />
    </linearGradient>
    <style>
      <![CDATA[
              .stop1 { stop-color: rgba(2,167,131,0.2); }
              .stop2 { stop-color: rgba(255,255,255,0.2); }
              .stop3 { stop-color: rgba(255,255,255,0.2); }
              .stop4 { stop-color: rgba(2,167,131,0.2); }
            ]]>
    </style>`;
    this.svg.append('defs').html(gradientColor);
  }

  private drawPlot(): void {
    //colors
    const domainScale: any[] = [];
    const rangeColor: any[] = [];
    this.groups.forEach((element: any) => {
      domainScale.push(element.name);
      rangeColor.push(element.color);
    });
    const color = d3.scaleOrdinal().domain(domainScale).range(rangeColor);

    // Build and Show the Y scale
    const y: any = d3
      .scaleLinear()
      .domain([3.5, 8]) // Note that here the Y scale is set manually
      .range([this.height, 0]);
    this.svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(y));

    // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
    const x = d3.scaleBand().range([0, this.width]).domain(domainScale);
    //.padding(0.05); // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.

    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));

    // ------------------------------------
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

    // Y-Axis Grid lines
    const yAxisGrid = d3
      .axisLeft(y)
      .tickSize(0)
      .tickFormat(() => '');
    this.svg
      .selectAll('g.gridline')
      .data(new Array(domainScale.length).fill(this.width / domainScale.length))
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

    // Features of the histogram
    const histoChart: any = d3
      .histogram()
      .domain(y.domain())
      .thresholds(y.ticks(20)) // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
      .value((d) => d);

    // Compute the binning for each group of the dataset
    const sumstat = nest() // nest function allows to group the calculation per level of a factor
      .key(function (d: any) {
        return d.Species;
      })
      .rollup(<any>function (d: any) {
        // For each key..
        let input = d.map(function (g: any) {
          return g.Sepal_Length;
        }); // Keep the variable called Sepal_Length
        let bins = histoChart(input); // And compute the binning on it.
        return bins;
      })
      .entries(this.data);

    // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
    let maxNum = 0;
    for (let i in sumstat) {
      let allBins: any = sumstat[i].value;
      let lengths = allBins.map((a: any) => {
        return a.length;
      });
      let longuest: any = d3.max(lengths);
      if (longuest > maxNum) {
        maxNum = longuest;
      }
    }

    // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
    const xNum = d3
      .scaleLinear()
      .range([0, x.bandwidth()])
      .domain([-maxNum, maxNum]);

    // Add the shape to this svg!
    let index = -1; //to manage colors
    this.svg
      .selectAll('myViolin')
      .data(sumstat)
      .enter() // So now we are working group per group
      .append('g')
      .attr('class', 'myViolin')
      .attr('transform', function (d: any) {
        return 'translate(' + x(d.key) + ' ,0)';
      }) // Translation on the right to be at the group position
      .append('path')
      .datum(function (d: any) {
        return d.value;
      }) // So now we are working bin per bin
      .style('fill', 'url(#violin-gradient)')
      .style('stroke-width', '2')
      .style('stroke', (d: any) => {
        index++;
        return rangeColor[index];
      })
      .attr(
        'd',
        d3
          .area()
          .x0(function (d) {
            return xNum(-d.length);
          })
          .x1(function (d) {
            return xNum(d.length);
          })
          .y(function (d: any) {
            return y(d.x0);
          })
          .curve(d3.curveCatmullRom) // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
      );
  }
}
