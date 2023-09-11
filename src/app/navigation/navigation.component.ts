import { Component } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/compat/auth";

import { ModalService } from "../services/modal.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(
    public modal: ModalService,
    public auth: AuthService,
  ) { }

  public openModal($event: Event): void {
    $event.preventDefault();

    this.modal.toggleModal('auth');
  }
}
