import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { HalfdoughnutType } from 'src/interfaces/halfdoughnut.interface';

@Injectable({
  providedIn: 'root'
})
export class HalfdoughnutService {

  private width = 400;
  private height = 300; //this is the double because are showing just the half of the pie
  private radius = Math.min(this.width, this.height) / 2;
  private labelr = this.radius + 30; // radius for label anchor
  //array of colors for the pie (in the same order as the dataset)
  private color = (d3 as any)
    .scaleOrdinal()
    .range(['#2b5eac', '#0dadd3', '#ffea61', '#ff917e', '#ff3e41']);

  constructor() { }

  public createHalfdoughnutChart(elementHtml: HTMLElement, data: Array<HalfdoughnutType>) {

    let labelr = this.radius + 30;
    let color = (d3 as any)
      .scaleOrdinal()
      .range(['#2b5eac', '#0dadd3', '#ffea61', '#ff917e', '#ff3e41']);


    let vis = d3
      .select(elementHtml)
      .append('svg') //create the SVG element inside the <body>
      .data([data]) //associate our data with the document
      .attr('width', this.width) //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr('height', this.height)
      .append('svg:g') //make a group to hold our pie chart
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')'); //move the center of the pie chart from 0, 0 to radius, radius

    // ----- .svg
    let arc = (d3 as any)
      .arc() //this will create <path> elements for us using arc data
      .innerRadius(79)
      //  								.outerRadius(radius);
      .outerRadius(this.radius - 10); // full height semi pie
    //.innerRadius(0);

    // ---- .layout
    let pie = (d3 as any)
      .pie() //this will create arc data for us given a list of values
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180))
      .padAngle(0.02) // some space between slices
      .sort(null) //No! we don't want to order it by size
      .value(function (d: any) {
        return d.value;
      }); //we must tell it out to access the value of each element in our data array

    let arcs = vis
      .selectAll('g.slice') //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
      .append('svg:g') //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
      .attr('class', 'slice'); //allow us to style things in the slices (like text)

    arcs
      .append('svg:path')
      .attr('fill', function (d, i) {
        return color(i);
      }) //set the color for each slice to be chosen from the color function defined above
      .attr('d', arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    const centerLabel = arcs.append('g');
    centerLabel.append('circle').attr('class', 'center-circle').attr('r', '30');
    centerLabel
      .append('text')
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .attr('class', 'center-text')
      .text(function (d) {
        return '56%';
      });

    const textEl = arcs
      .append('svg:text')
      .attr('class', 'labels') //add a label to each slice
      .attr('fill', 'grey')
      .attr('transform', function (d) {
        let c = arc.centroid(d),
          xp = c[0],
          yp = c[1],
          // pythagorean theorem for hypotenuse
          hp = Math.sqrt(xp * xp + yp * yp);
        return 'translate(' + (xp / hp) * labelr + ',' + (yp / hp) * labelr + ')';
      })
      .attr('text-anchor', 'middle'); //center the text on it's origin

    textEl.append('tspan').text(function (d, i) {
      return data[i].label;
    });

    textEl
      .append('tspan')
      .text(function (d, i) {
        return data[i].value;
      })
      .attr('x', '0')
      .attr('dy', '1.2em');

  }
}
