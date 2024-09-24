import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class GaugemeterService {

  gaugemap = {};

  constructor() { }

  public createGaugemeterChart(elementHtml: HTMLElement, data: number) {
    let self: any = this;
    let gauge = function (container: any, configuration: any) {
      let config: any = {
        size: 710,
        clipWidth: 200,
        clipHeight: 110,
        ringInset: 20,
        ringWidth: 20,

        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.9,

        minValue: 0,
        maxValue: 10,

        minAngle: -90,
        maxAngle: 90,

        transitionMs: 750,

        majorTicks: 5,
        labelFormat: d3.format('d'),
        labelInset: 10,

        arcColorFn: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a')),
      };
      let range: any = undefined;
      let r: any = undefined;
      let pointerHeadLength: any = undefined;
      let value = 0;

      let svg: any = undefined;
      let arc: any = undefined;
      let scale: any = undefined;
      let ticks: any = undefined;
      let tickData: any = undefined;
      let pointer: any = undefined;

      let donut: any = d3.pie();

      function deg2rad(deg: any) {
        return (deg * Math.PI) / 180;
      }

      function newAngle(d: any) {
        let ratio = scale(d);
        let newAngle = config.minAngle + ratio * range;
        return newAngle;
      }

      function configure(configuration: any) {
        let prop = undefined;
        for (prop in configuration) {
          config[prop] = configuration[prop];
        }

        range = config.maxAngle - config.minAngle;
        r = config.size / 2;
        pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

        // a linear scale this.gaugemap maps domain values to a percent from 0..1
        scale = d3
          .scaleLinear()
          .range([0, 1])
          .domain([config.minValue, config.maxValue]);

        ticks = scale.ticks(config.majorTicks);
        tickData = d3.range(config.majorTicks).map(function () {
          return 1 / config.majorTicks;
        });

        arc = d3
          .arc()
          .innerRadius(r - config.ringWidth - config.ringInset)
          .outerRadius(r - config.ringInset)
          .startAngle(function (d: any, i: any) {
            let ratio = d * i;
            return deg2rad(config.minAngle + ratio * range);
          })
          .endAngle(function (d: any, i: any) {
            let ratio = d * (i + 1);
            return deg2rad(config.minAngle + ratio * range);
          });
      }
      self.gaugemap.configure = configure;

      function centerTranslation() {
        return 'translate(' + r + ',' + r + ')';
      }

      function isRendered() {
        return svg !== undefined;
      }
      self.gaugemap.isRendered = isRendered;

      function render(newValue: any) {
        svg = d3
          .select(container)
          .append('svg:svg')
          .attr('class', 'gauge')
          .attr('preserveAspectRatio', 'xMinYMin meet')
          .attr('viewBox', `0 0 ${config.clipWidth} ${config.clipHeight}`);

        let centerTx: any = centerTranslation();

        let arcs: any = svg
          .append('g')
          .attr('class', 'arc')
          .attr('transform', centerTx);

        arcs
          .selectAll('path')
          .data(tickData)
          .enter()
          .append('path')
          .attr('fill', function (d: any, i: any) {
            return config.arcColorFn(d * i);
          })
          .attr('d', arc);

        let lg = svg
          .append('g')
          .attr('class', 'label')
          .attr('transform', centerTx);
        lg.selectAll('text')
          .data(ticks)
          .enter()
          .append('text')
          .attr('transform', function (d: any) {
            let ratio = scale(d);
            let newAngle = config.minAngle + ratio * range;
            return (
              'rotate(' +
              newAngle +
              ') translate(0,' +
              (config.labelInset - r) +
              ')'
            );
          })
          .text(config.labelFormat);

        let lineData: any = [
          [config.pointerWidth / 2, 0],
          [0, -pointerHeadLength],
          [-(config.pointerWidth / 2), 0],
          [0, config.pointerTailLength],
          [config.pointerWidth / 2, 0],
        ];
        let pointerLine = d3.line().curve(d3.curveLinear);
        let pg = svg
          .append('g')
          .data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);

        pointer = pg
          .append('path')
          .attr('d', pointerLine /*function(d) { return pointerLine(d) +'Z';}*/)
          .attr('transform', 'rotate(' + config.minAngle + ')');

        update(newValue === undefined ? 0 : newValue);
      }
      self.gaugemap.render = render;
      function update(newValue: any, newConfiguration?: any) {
        if (newConfiguration !== undefined) {
          configure(newConfiguration);
        }
        let ratio: any = scale(newValue);
        let newAngle: any = config.minAngle + ratio * range;
        pointer
          .transition()
          .duration(config.transitionMs)
          .ease(d3.easeElastic)
          .attr('transform', 'rotate(' + newAngle + ')');
      }
      self.gaugemap.update = update;

      configure(configuration);

      return self.gaugemap;
    };

    let powerGauge: any = gauge(elementHtml, {
      size: 300,
      clipWidth: 300,
      clipHeight: 300,
      ringWidth: 60,
      maxValue: 10,
      transitionMs: 4000,
    });
    powerGauge.render(data);
  }
}
