import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import UniqueId, { Radar } from '../../app/_helpers-d3';
import { RadarService } from 'src/services/radar/radar.service';
import radarChartData from '../../assets/data.json';
import { RadarType } from 'src/interfaces/radar.interface';

@Component({
  selector: 'wissen-radar-chart',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
})
export class RadarComponent implements AfterViewInit {
  @Input() scaleType: string = 'x';
  public chartId: string = UniqueId(10);

  private element!: HTMLElement;
  @Input() radarData!: Array<RadarType>;


  constructor(private radarService: RadarService, private elementRef: ElementRef) { }

  public ngAfterViewInit(): void {
    let color = (d3 as any)
      .scaleOrdinal()
      .range(['#EDC951', '#CC333F', '#00A0B0']);

    let radarChartOptions = {
      maxValue: 0.5,
      levels: 3,
      roundStrokes: true,
      color: color,
    };
    let scaleType: any = this.scaleType;

    this.element = this.elementRef.nativeElement.querySelector('.chart');
    this.radarService.createRadarChart(this.element, this.radarData, radarChartOptions, scaleType);
  }
}


