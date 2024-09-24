import AreaDensity from "./AreaDensity";
import AreaLine from "./AreaLine";
import Bar from "./Bar";
import HalfDoughnut from "./HalfDoughnut";
import LineMulti from "./LineMulti";
import Radar from "./Radar";
import StackedColumnVertical from "./StackedColumnVertical";
import StackedColumnHorizental from "./StackedColumnHorizental";
import Timeline from "./Timeline";
import Violin from "./Violin";

export default function UniqueId(length: any): string {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result + "-" + (+new Date());
}

export {
  AreaDensity,
  AreaLine,
  Bar,
  HalfDoughnut,
  LineMulti,
  Radar,
  StackedColumnVertical,
  StackedColumnHorizental,
  Timeline,
  Violin,
};
