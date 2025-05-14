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
    const name = this.temp_name?.trim();
    if (!name) {
      this.player_name = 'guest';
      this.playerDataSubmitted.emit({
        name: 'guest',
        password: ''
      });
      return;
    }

    if (!this.temp_pass?.trim()) return;

    this.player_name = name;
    this.playerDataSubmitted.emit({
      name,
      password: this.temp_pass
    });
  }
}
