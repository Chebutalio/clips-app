import { Component, Input } from '@angular/core';
import { AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() control!: AbstractControl;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() validationType: string = '';
}
