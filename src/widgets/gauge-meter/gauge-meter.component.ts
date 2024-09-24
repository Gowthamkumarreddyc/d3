import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import UniqueId from '../../app/_helpers-d3';
import { GaugemeterService } from 'src/services/gaugemeter/gaugemeter.service';


@Component({
  selector: 'wissen-gaugemeter-chart',
  templateUrl: './gauge-meter.component.html',
  styleUrls: ['./gauge-meter.component.scss'],
})
export class GaugeMeterComponent implements AfterViewInit {

  public chartId: string = UniqueId(10);
  private element!: HTMLElement;
  @Input() gaugeChart!: number;

  constructor(private elementRef: ElementRef, private gaugeService: GaugemeterService) { }

  ngAfterViewInit(): void {
    this.element = this.elementRef.nativeElement.querySelector('.chart');
    this.gaugeService.createGaugemeterChart(this.element, this.gaugeChart);
  }
}
