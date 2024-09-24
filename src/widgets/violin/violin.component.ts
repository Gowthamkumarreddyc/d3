import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import UniqueId, { Violin } from '../../app/_helpers-d3';
import { ViolinType } from 'src/interfaces/violin.interface';
import { ViolinService } from 'src/services/violin/violin.service';


@Component({
  selector: 'wissen-violin-chart',
  templateUrl: './violin.component.html',
  styleUrls: ['./violin.component.scss'],
})
export class ViolinComponent implements AfterViewInit {

  public chartId: string = UniqueId(10);
  private element!: HTMLElement;

  @Input() violinChart!: Array<ViolinType>;
  @Input() violinGroups!: any[];

  constructor(private elementRef: ElementRef, private violinServices: ViolinService) { }

  ngAfterViewInit(): void {
    this.element = this.elementRef.nativeElement.querySelector('.chart');
    this.violinServices.createViolinChart(this.element, this.violinChart, this.violinGroups);
    // Violin("#" + this.chartId, this.data, this.groupes)
  }
}
