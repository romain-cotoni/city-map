import { Coords } from "./coords.model";

export interface CoordsNamed extends Coords {
  label       : string;
  description?: string;
}