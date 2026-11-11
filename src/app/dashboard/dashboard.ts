import { Component, inject } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private auth = inject(Auth);
private router = inject(Router);

async logout() {
    this.auth.session.set(null);   // the signal is already public on the service
  await this.auth.signOut();
  await  this.router.navigate(['/login']);
}
}
