import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { VerticalStackedColumnType } from 'src/interfaces/verticalstackedcolumn.interface';

@Injectable({
  providedIn: 'root'
})
export class StackedverticalService {

  private data: any = [];
  private margin = 30;
  private elementHTML!: HTMLElement;
  private width!: number;
  private height!: number;
  private x: any;
  private y: any;
  private svg: any;
  private stack: any;
  private chart: any;
  private layersBarArea: any;
  private layersBar: any;
  private xAxis: any;
  private yAxis: any;
  private stackedSeries: any;
  private xTitle: any;
  private yTitle: any;
  private subgroups!: any[];
  private colors = [
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
  ];


  constructor() { }

  public createVerticalStackedColumnChart(elementHtml: HTMLElement, data: VerticalStackedColumnType[], subgroups: any[]) {
    this.width = parseInt(d3.select(elementHtml).style('width')) - this.margin - this.margin;
    this.height = parseInt(d3.select(elementHtml).style('height')) - this.margin - this.margin;
    this.data = data
    this.subgroups = subgroups;
    this.elementHTML = elementHtml;
    this.stack = d3.stack().keys(subgroups);
    this.initSvg();
    this.initScales();
    this.drawAxis();
    this.drawGridLines();
    this.createStack(data);
  }

  private initScales() {
    this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.5);

    const maxValue: any = () => {
      let tempMax: number = 0;
      this.data.map((d: any) => {
        this.subgroups.map((col: any) => {
          let v = parseInt(d[col], 10);
          tempMax = tempMax < v ? v : tempMax;
        });
      });
      return tempMax;
    };

    this.y = d3.scaleLinear().range([this.height, 0]);

  }

  private initSvg() {
    this.svg = d3
      .select(this.elementHTML)
      .append('svg')
      .attr('class', 'chart')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`);

    this.chart = this.svg
      .append('g')
      .classed('chart-contents', true)
      .attr(
        'transform',
        'translate(' + this.margin + ',' + this.margin + ')'
      );

  }

  private drawAxis() {
    this.xAxis = this.chart
      .append('g')
      .classed('x axis', true)
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x));

    this.chart
      .append('text')
      .attr('y', this.height + 40)
      .attr('x', this.width / 2)
      .classed('axis-title', true)
      .style('text-anchor', 'middle')
      .style('stroke', 'none')
      .text(this.xTitle);

    this.yAxis = this.chart
      .append('g')
      .classed('y axis', true)
      .call(d3.axisLeft(this.y));


    this.chart
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - 60)
      .attr('x', 0 - this.height / 2)
      .style('text-anchor', 'middle')
      .style('stroke', 'none')
      .classed('axis-title', true)
      .text(this.yTitle);
  }

  private drawGridLines() {
    // X-Axis Grid lines
    const xAxisGrid = d3
      .axisBottom(this.x)
      .tickSize(0)
      .tickFormat(() => '');

    this.chart
      .selectAll('g.gridline')
      .data(this.y.ticks())
      .enter()
      .append('g')
      .attr(
        'transform',
        (d: any, i: number) =>
          `translate(0, ${i * (this.height / (this.y.ticks().length - 1))})`
      )
      .attr('class', 'x-axis-grid')
      .attr('stroke', '2')
      .call(xAxisGrid);

  }

  private drawChart(data: any) {
    this.layersBarArea = this.chart.append('g').classed('layers', true);
    this.layersBar = this.layersBarArea
      .selectAll('.layer')
      .data(data)
      .enter()
      .append('g')
      .classed('layer', true)
      .style('fill', (d: any, i: any) => {
        return this.colors[i];
      });

    this.x.domain(
      this.data.map((d: any) => {
        return d.date;
      })
    );

    this.y.domain([
      0,
      +(d3 as any).max(this.stackedSeries, function (d: any) {
        return d3.max(d, (d: any) => {
          return d[1];
        });
      }),
    ]);

    this.layersBar
      .selectAll('rect')
      .data((d: any) => {
        return d;
      })
      .enter()
      .append('rect')
      .attr('y', (d: any) => {
        return this.y(d[1]);
      })
      .attr('x', (d: any, i: any) => {
        return this.x(d.data.date);
      })
      .attr('width', this.x.bandwidth())
      .attr('height', (d: any, i: any) => {
        return this.y(d[0]) - this.y(d[1]);
      });
  }

  private createStack(stackData: any) {
    this.stackedSeries = this.stack(stackData);
    this.drawChart(this.stackedSeries);
  }
}
