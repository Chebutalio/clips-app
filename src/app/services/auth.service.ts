import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

import { delay, filter, map, Observable, of, switchMap } from "rxjs";

import IUser from "../shared/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  public redirect: boolean = false;

  private usersCollection: AngularFirestoreCollection<IUser>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = auth.user
      .pipe(
        map(user => !!user)
      );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$
      .pipe(
        delay(1000),
      );
    this.router.events
      .pipe(
        filter( event => event instanceof NavigationEnd),
        map( event => this.route.firstChild),
        switchMap(route => route?.data ?? of({ authOnly: false }))
      )
      .subscribe((data) => {
        this.redirect = data.authOnly ?? false;
      });
  }

  public async createUser(userData: IUser) {
    if(!userData.password) {
      throw new Error('Password not provided!');
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
    );

    if(!userCred.user) {
      throw new Error("User can't be found");
    }

    await this.usersCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCred.user.updateProfile({
      displayName: userData.name,
    });
  }

  public async logout($event?: Event): Promise<void> {
    if($event) {
      $event.preventDefault();
    }

    await this.auth.signOut();

    if(this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
