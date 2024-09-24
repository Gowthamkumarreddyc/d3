import { Component, AfterViewInit, ElementRef, Input } from '@angular/core';
import UniqueId, { StackedColumnHorizental } from '../../app/_helpers-d3';
import { HorizontalStackedColumnType } from 'src/interfaces/horizontalstackedcolumn.interface';
import { StackedhorizontalService } from 'src/services/stackedcolumnhorizontal/stackedhorizontal.service';

@Component({
  selector: 'wissen-horizontal-stacked-column-chart',
  templateUrl: './stacked-column2.component.html',
  styleUrls: ['./stacked-column2.component.scss'],
})
export class StackedColumn2Component implements AfterViewInit {

  public chartId: string = UniqueId(10);
  private element!: HTMLElement;

  @Input() horizontalStackedChart!: Array<HorizontalStackedColumnType>;
  @Input() horizontalStackedColumn!: Array<any>;
  @Input() horizontalStackedGroup!: Array<any>;

  constructor(private elementRef: ElementRef, private stackedHorizontal: StackedhorizontalService) { }

  ngAfterViewInit(): void {
    this.element = this.elementRef.nativeElement.querySelector('.chart');
    this.stackedHorizontal.stackedHorizontalColumnChart(this.element, this.horizontalStackedChart, this.horizontalStackedColumn, this.horizontalStackedGroup);
  }
}
