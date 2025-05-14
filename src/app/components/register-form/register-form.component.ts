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
  standalone: true,
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  @Input() player_name: string;
  @Output() playerDataSubmitted = new EventEmitter<{ name: string; password: string }>();

  temp_name: string;
  temp_pass: string;

  setPlayerName(): void {
    this.player_name = this.temp_name;
    this.playerDataSubmitted.emit({
      name: this.temp_name,
      password: this.temp_pass
    });
  }
}
