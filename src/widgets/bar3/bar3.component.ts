import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import UniqueId, { Bar } from '../../app/_helpers-d3';
import { BarService } from 'src/services/bar/bar.service';
import BarData from '../../assets/data.json';
import { BarType } from 'src/interfaces/bar.interface';

@Component({
  selector: 'wissen-bar3-chart',
  templateUrl: './bar3.component.html',
  styleUrls: ['./bar3.component.scss']
})
export class Bar3Component implements AfterViewInit {

  public chartId: string = UniqueId(10);
  private jsonData!:BarType[];
  private element!:HTMLElement;
  @Input() diffColBar!:Array<BarType>;

  constructor(private barService:BarService, private elementRef:ElementRef) {}
    
  ngAfterViewInit(): void {
    this.element = this.elementRef.nativeElement.querySelector('.chart');
    this.jsonData = BarData.barWithDifferentcolor;
    this.barService.createBarChart(this.element, this.jsonData);

    // Bar("#"+this.chartId, data);
  }

}
