import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarComponent } from '../widgets/bar/bar.component';
import { PieComponent } from '../widgets/pie/pie.component';
import { ScatterComponent } from '../widgets/scatter/scatter.component';
import { DoughnutComponent } from '../widgets/doughnut/doughnut.component';
import { LineComponent } from '../widgets/line/line.component';
import { ViolinComponent } from '../widgets/violin/violin.component';
import { AreaComponent } from '../widgets/area/area.component';
import { RadarComponent } from '../widgets/radar/radar.component';
import { StackedColumnComponent } from '../widgets/stacked-column/stacked-column.component';
import { GaugeMeterComponent } from '../widgets/gauge-meter/gauge-meter.component';
import { PressureCurveComponent } from '../widgets/pressure-curve/pressure-curve.component';
import { TimelineComponent } from '../widgets/timeline/timeline.component';

import { OverviewComponent } from '../widgets/overview/overview.component';
import { HalfdoughnutComponent } from '../widgets/halfdoughnut/halfdoughnut.component';
import { Bar3Component } from '../widgets/bar3/bar3.component';
import { Area2Component } from '../widgets/area2/area2.component';
import { StackedColumn2Component } from '../widgets/stacked-column2/stacked-column2.component';
import { Line2Component } from '../widgets/line2/line2.component';
import { Timeline2Component } from '../widgets/timeline2/timeline2.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    DoughnutComponent,
    LineComponent,
    ViolinComponent,
    AreaComponent,
    RadarComponent,
    StackedColumnComponent,
    GaugeMeterComponent,
    PressureCurveComponent,
    TimelineComponent,
    OverviewComponent,
    HalfdoughnutComponent,
    Bar3Component,
    Area2Component,
    StackedColumn2Component,
    Line2Component,
    Timeline2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
