import { Component, input, output } from '@angular/core';
import { Poi } from '../models/poi.model';

@Component({
  selector: 'search-bar',
  standalone: true,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {

  readonly placeholder = input('Search...');
  readonly query       = input('');
  readonly results     = input<Poi[]>([]);

  readonly queryChange    = output<string>();
  readonly resultSelected = output<Poi>();
  readonly inputFocused   = output<void>();

  protected onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.queryChange.emit(value);
  }

  protected onSelect(result: Poi) {
    this.resultSelected.emit(result);
  }

  protected onFocus() {
    this.inputFocused.emit();
  }


}