import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() bgColo: string = 'blue';

  get backgroundColor() {
    return `bg-${this.bgColo}-400`;
  }

}
