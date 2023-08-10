import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() bgColor: string = 'blue';

  get backgroundColor() {
    return `bg-${this.bgColor}-400`;
  }

}
