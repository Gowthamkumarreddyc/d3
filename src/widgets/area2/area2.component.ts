import { AfterViewInit, Component, ElementRef, Input } from "@angular/core";
import UniqueId from "../../app/_helpers-d3/index";
import { AreadensityService } from "src/services/areadensity/areadensity.service";
import { AreaDensityType } from "src/interfaces/areadensity.interface";

@Component({
  selector: "wissen-area-density-chart",
  templateUrl: "./area2.component.html",
  styleUrls: ["./area2.component.scss"],
})
export class Area2Component implements AfterViewInit {

  public chartId: string = UniqueId(10);
  private element!:HTMLElement;
  @Input() areaDensityData!: Array<AreaDensityType>;

  constructor(private areaDensityService:AreadensityService, private elementRef:ElementRef) {}

  ngAfterViewInit(): void {
    this.element = this.elementRef.nativeElement.querySelector('.chart');
    this.areaDensityService.createAreadDensityChart(this.element, this.areaDensityData);


    // AreaDensity("#" + this.chartId, data);
  }
}

