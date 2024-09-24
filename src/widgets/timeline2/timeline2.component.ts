import { AfterViewInit, Component } from '@angular/core';
import UniqueId from '../../app/_helpers-d3';

@Component({
  selector: 'timeline-table',
  templateUrl: './timeline2.component.html',
  styleUrls: ['./timeline2.component.scss'],
})
export class Timeline2Component implements AfterViewInit {
  public chartId: string = UniqueId(10);

  public calWidthStyle = {
    '--first-td-body-width': '100px',
    '--legend-width-y': '100px',
  };

  public xAxis: any[] = [];
  public yAxis: any[] = [];
  public seriesData: any[] = [];

  public initWidth() {
    const timelineContainer: any = document.getElementById(this.chartId) as any;
    const firstTdwidth =
      timelineContainer.querySelector(
        'table.table-sequence tbody tr:nth-child(2) td:nth-child(1)'
      ).clientWidth || 100;
    this.calWidthStyle = {
      '--first-td-body-width': firstTdwidth + 'px',
      '--legend-width-y': '100px',
    };
    console.log(this.calWidthStyle);
  }

  ngOnInit(): void {
    this.xAxis = ['2013', '2014', '2015', '2016', '2017', '2018', '2019'];
    this.yAxis = [
      'D123459',
      'E123459',
    ];
    this.seriesData = [
      {
        yAxis: 'D123459',
        xAxis: '2013',
        type: "warning",
        step: 2,
        group: [{ task1: 10, type: "success" }, { task2: 20, type: "warning" }],
      },
      {
        yAxis: 'E123459',
        xAxis: '2015',
        type: "success",
        step: 3,
        group: [{ task1: 10, type: "success" }, { task2: 20, type: "warning" }, { task3: 50, type: "secondary" }],
      },
    ];
  }

  public getSeries(yAxis: any, xAxis: any) {
    return this.seriesData.find((row) => {
      return row.yAxis == yAxis && row.xAxis == xAxis;
    })
  }

  ngAfterViewInit(): void {
    this.initWidth();
    window.addEventListener('resize', () => this.initWidth());
  }
}
