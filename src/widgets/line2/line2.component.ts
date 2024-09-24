import { AfterViewInit, Component, OnInit } from '@angular/core';
import UniqueId, { LineMulti } from '../../app/_helpers-d3';

@Component({
  selector: 'multiline-chart',
  templateUrl: './line2.component.html',
  styleUrls: ['./line2.component.scss'],
})
export class Line2Component implements AfterViewInit {

  public chartId: string = UniqueId(10);
  ngAfterViewInit(): void {
    const data: any = [
      {
        time: '1',
        valueA: '2',
        valueB: '5',
        valueC: '13',
      },
      {
        time: '2',
        valueA: '3',
        valueB: '4',
        valueC: '14',
      },
      {
        time: '3',
        valueA: '1',
        valueB: '4',
        valueC: '16',
      },
      {
        time: '4',
        valueA: '7',
        valueB: '4',
        valueC: '12',
      },
      {
        time: '5',
        valueA: '8',
        valueB: '8',
        valueC: '7',
      },
      {
        time: '6',
        valueA: '8',
        valueB: '13',
        valueC: '9',
      },
      {
        time: '7',
        valueA: '5',
        valueB: '15',
        valueC: '3',
      },
      {
        time: '8',
        valueA: '4',
        valueB: '17',
        valueC: '2',
      },
      {
        time: '9',
        valueA: '9',
        valueB: '18',
        valueC: '1',
      },
      {
        time: '10',
        valueA: '11',
        valueB: '13',
        valueC: '1',
      },
    ];

    const groups: any[] = ['valueA', 'valueB', 'valueC'];

    LineMulti('#'+this.chartId, data, groups);
  }
}
