import { Component, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-add-poi-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-poi-modal.html',
  styleUrl: './add-poi-modal.css',
})
export class AddPoiModal {
  
  label = '';
  desc  = '';

  add    = output<{ label: string; description: string }>();
  cancel = output<void>();

  onAdd() {
    this.add.emit({ label: this.label, description: this.desc });
  }

  onCancel() {
    this.cancel.emit();
  }

}