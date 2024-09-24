import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import UniqueId from '../../app/_helpers-d3';
import { BarType } from '../../interfaces/bar.interface';
import { BarService } from 'src/services/bar/bar.service';

@Component({
  selector: 'wissen-bar-chart',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements AfterViewInit {

  public chartId: string = UniqueId(10);
  private element!: HTMLElement;
  @Input() barData!: Array<BarType>;

  constructor(private elementRef: ElementRef, private barService: BarService) { }

  ngAfterViewInit(): void {
    this.element = this.elementRef.nativeElement.querySelector('.chart');
    this.barService.createBarChart(this.element, this.barData);
  }

}
