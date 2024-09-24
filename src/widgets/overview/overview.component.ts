import { Component, OnInit } from '@angular/core';
import { BarType } from 'src/interfaces/bar.interface';
import jsonData from '../../assets/data.json';
import { RadarType } from 'src/interfaces/radar.interface';
import { AreaDensityType } from 'src/interfaces/areadensity.interface';
import areadensitydata from '../../assets/areadensity.json';
import { VerticalStackedColumnType } from 'src/interfaces/verticalstackedcolumn.interface';
import { HorizontalStackedColumnType } from 'src/interfaces/horizontalstackedcolumn.interface';
import { DoughnutType } from 'src/interfaces/doughnut.interface';
import { HalfdoughnutType } from 'src/interfaces/halfdoughnut.interface';
import { ViolinType } from 'src/interfaces/violin.interface';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public barChartData!: Array<BarType>;
  public radarChartData!: Array<RadarType>;
  public areaDensityChartData!: Array<AreaDensityType>;
  public differentColorBarData!: Array<BarType>;
  public stackedVerticalColumn!: Array<VerticalStackedColumnType>;
  public verticalStackedSubgroup!: Array<any>;
  public horizontalStackedData!: Array<HorizontalStackedColumnType>;
  public horizontalStackedColumn!: Array<any>;
  public horizontalStackedGroup!: Array<any>;
  public doughnutChartData!: Array<DoughnutType>;
  public halfdoughnutData!: Array<HalfdoughnutType>;
  public gaugeChartData: number = 4;
  public violinChartData!: Array<ViolinType>;
  public violinGroup!: any[];


  ngOnInit(): void {
    this.barChartData = jsonData.barChartData;
    this.radarChartData = jsonData.radarChartData;
    this.areaDensityChartData = areadensitydata.areaDensityData;
    this.differentColorBarData = jsonData.barWithDifferentcolor;
    this.stackedVerticalColumn = jsonData.stackedColumnVerticalData;
    this.verticalStackedSubgroup = jsonData.subgroups;
    this.horizontalStackedData = jsonData.stackedHorizontalColumnData;
    this.horizontalStackedColumn = jsonData.horizontalColumns;
    this.horizontalStackedGroup = jsonData.horizontalSubgroups;
    this.doughnutChartData = jsonData.doughnutData;
    this.halfdoughnutData = jsonData.halfDoughnutData;
    this.violinChartData = jsonData.violinData;
    this.violinGroup = jsonData.violinGroups;
  }


}
