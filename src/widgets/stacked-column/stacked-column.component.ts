import { Component, AfterViewInit, ElementRef, Input } from '@angular/core';
import UniqueId, { StackedColumnVertical } from '../../app/_helpers-d3';
import { StackedverticalService } from 'src/services/stackedcolumnvertical/stackedvertical.service';
import { VerticalStackedColumnType } from 'src/interfaces/verticalstackedcolumn.interface';

@Component({
  selector: 'wissen-vertical-stacked-column-chart',
  templateUrl: './stacked-column.component.html',
  styleUrls: ['./stacked-column.component.scss']
})
export class StackedColumnComponent implements AfterViewInit {

  public chartId: string = UniqueId(10);
  private element!: HTMLElement;

  @Input() verticalStackedColumn!: Array<VerticalStackedColumnType>;
  @Input() subGroup!: Array<any>;

  constructor(private stackedVertical: StackedverticalService, private elementRef: ElementRef) { }


  ngAfterViewInit(): void {
    console.log(this.subGroup)
    this.element = this.elementRef.nativeElement.querySelector('.chart');
    this.stackedVertical.createVerticalStackedColumnChart(this.element, this.verticalStackedColumn, this.subGroup);

  }
}
