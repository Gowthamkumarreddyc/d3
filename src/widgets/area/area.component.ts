import { AfterViewInit, Component  } from '@angular/core';
import UniqueId, { AreaLine } from '../../app/_helpers-d3';

@Component({
  selector: 'area-line-chart',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements AfterViewInit {
  
  public chartId: string = UniqueId(10);

  ngAfterViewInit(): void {
    
    const data: any[] = [
      {
        t: 1457040823000,
        val: 20,
      },
      {
        t: 1457040828000,
        val: 1,
      },
      {
        t: 1457040833000,
        val: 39,
      },
      {
        t: 1457040838000,
        val: 3,
      },
      {
        t: 1457040843000,
        val: 33,
      },
      {
        t: 1457040848000,
        val: -10,
      },
      {
        t: 1457040853000,
        val: 21,
      },
      {
        t: 1457040858000,
        val: 17,
      },
      {
        t: 1457040863000,
        val: 13,
      },
      {
        t: 1457040868000,
        val: 4,
      },
    ];

    AreaLine('#'+this.chartId, data);
  }
}
