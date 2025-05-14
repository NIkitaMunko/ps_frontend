import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'controls-component',
  imports: [],
  templateUrl: './controls.component.html',
  standalone: true,
  styleUrl: './controls.component.scss'
})
export class ControlsComponent {
  @Output() onDirectionChange = new EventEmitter<string>();
  @Output() onReset = new EventEmitter();

  moveTile(direction: string): void {
    this.onDirectionChange.emit(direction);
  }

  reset(): void {
    this.onReset.emit();
  }
}
