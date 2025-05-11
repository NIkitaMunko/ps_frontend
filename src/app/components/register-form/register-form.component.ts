import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'register-form',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  @Input() player_name: string;
  @Output() playerNameSubmitted = new EventEmitter<string>();

  temp_name: string;

  setPlayerName(): void {
    this.player_name = this.temp_name;
    this.playerNameSubmitted.emit(this.player_name);
  }
}
