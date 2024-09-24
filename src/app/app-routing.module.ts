import { HalfdoughnutComponent } from '../widgets/halfdoughnut/halfdoughnut.component';
import { RadarComponent } from '../widgets/radar/radar.component';
import { LineComponent } from '../widgets/line/line.component';
import { GaugeMeterComponent } from '../widgets/gauge-meter/gauge-meter.component';
import { DoughnutComponent } from '../widgets/doughnut/doughnut.component';
import { PressureCurveComponent } from '../widgets/pressure-curve/pressure-curve.component';
import { ScatterComponent } from '../widgets/scatter/scatter.component';
import { PieComponent } from '../widgets/pie/pie.component';
import { BarComponent } from '../widgets/bar/bar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from '../widgets/timeline/timeline.component';
import { ViolinComponent } from '../widgets/violin/violin.component';
import { OverviewComponent } from '../widgets/overview/overview.component';
import { StackedColumnComponent } from '../widgets/stacked-column/stacked-column.component';
import { Bar3Component } from '../widgets/bar3/bar3.component';
import { AreaComponent } from '../widgets/area/area.component';
import { Area2Component } from '../widgets/area2/area2.component';
import { Line2Component } from '../widgets/line2/line2.component';
import { StackedColumn2Component } from '../widgets/stacked-column2/stacked-column2.component';
import { Timeline2Component } from '../widgets/timeline2/timeline2.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'bar', component: BarComponent },
  { path: 'bar3', component: Bar3Component },
  { path: 'pie', component: PieComponent },
  { path: 'scatter', component: ScatterComponent },
  { path: 'doughnut', component: DoughnutComponent },
  { path: 'guage', component: GaugeMeterComponent },
  { path: 'line', component: LineComponent },
  { path: 'line2', component: Line2Component },
  { path: 'radar', component: RadarComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'timeline2', component: Timeline2Component },
  { path: 'violin', component: ViolinComponent },
  { path: 'half-doughnut', component: HalfdoughnutComponent },
  { path: 'stacked-column', component: StackedColumnComponent },
  { path: 'stacked-column2', component: StackedColumn2Component },
  { path: 'area', component: AreaComponent },
  { path: 'area2', component: Area2Component },
  { path: 'pcurve', component: PressureCurveComponent },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: '**', component: PressureCurveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
