import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import UniqueId from '../../app/_helpers-d3';
import { DoughnutType } from 'src/interfaces/doughnut.interface';
import { DoughnutService } from 'src/services/doughnut/doughnut.service';

@Component({
  selector: 'wissen-doughnut-chart',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent implements AfterViewInit {

  public chartId: string = UniqueId(10);
  private element!: HTMLElement;
  @Input() doughnutChart!: Array<DoughnutType>;

  constructor(private doughnutService: DoughnutService, private elmentRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.element = this.elmentRef.nativeElement.querySelector('.chart');
    this.doughnutService.createDoughnutChart(this.element, this.doughnutChart);
  }


}
