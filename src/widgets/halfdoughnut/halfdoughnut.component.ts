import { Component, AfterViewInit, ElementRef, Input } from '@angular/core';
import UniqueId, { HalfDoughnut } from '../../app/_helpers-d3';
import { HalfdoughnutService } from 'src/services/halfdoughnut/halfdoughnut.service';
import { HalfdoughnutType } from 'src/interfaces/halfdoughnut.interface';

@Component({
  selector: 'wissen-halfdoughnut-chart',
  templateUrl: './halfdoughnut.component.html',
  styleUrls: ['./halfdoughnut.component.scss'],
})
export class HalfdoughnutComponent implements AfterViewInit {

  public chartId: string = UniqueId(10);
  private element!: HTMLElement;
  @Input() halfdoughnutChart!: Array<HalfdoughnutType>

  constructor(private elementRef: ElementRef, private halfdoughnutService: HalfdoughnutService) { }

  public ngAfterViewInit(): void {
    this.element = this.elementRef.nativeElement.querySelector('.chart');
    this.halfdoughnutService.createHalfdoughnutChart(this.element, this.halfdoughnutChart);
  }
}
