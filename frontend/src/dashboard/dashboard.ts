import { Component, output, signal } from "@angular/core";
import { FindRoute } from "../find-route/find-route";
import { DashBar } from "../dash-bar/dash-bar";
import { CoordsNamed } from "../models/coords-named.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[FindRoute, DashBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  readonly locationSelected = output<CoordsNamed>();
  
  protected readonly isOpen = signal(true);

  protected toggle(): void {
    this.isOpen.update(v => !v);
  }
  
}