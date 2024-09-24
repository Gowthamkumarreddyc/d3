import * as d3 from 'd3';

class Chart {
  private data: any[] = [];
  private highestValue: string = '';
  private svg: any;
  private margin = 50;
  private width = 400 - this.margin * 1.2;
  private height = 400 - this.margin * 1.2;


  constructor(private elementHtml: any, data: any) {
    this.data = data;

    // determining highest value
    let highestCurrentValue = 0;
    let tableLength = this.data.length;
    this.data.forEach((data, i) => {
      const barValue = Number(data.value);
      if (barValue > highestCurrentValue) {
        highestCurrentValue = barValue;
      }
      if (tableLength == i + 1) {
        this.highestValue = highestCurrentValue.toString();
      }
    });

    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3
      .select(this.elementHtml)
      .append('svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr(
        'viewBox',
        `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`
      )
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Creating X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d: any) => d.name))
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
      .attr('x', (d: any) => x(d.name))
      .attr('y', (d: any) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) =>
        y(d.value) < this.height ? this.height - y(d.value) : this.height
      ) // this.height
      .attr('fill', (d: any) => d.color);

    this.svg
      .selectAll('text.bar')
      .data(data)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#70747a')
      .attr('x', (d: any) => (x(d.name) as any) + 18 )
      .attr('y', (d: any) => y(d.value) - 5)
      .text((d: any) => Math.round(d.value * 100) / 100);
  }
}

export default function Bar(elementHtml: any, data: any[]) {
  new Chart(elementHtml, data);
}
