import { computed, Injectable, signal } from '@angular/core';
import { createClient, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  readonly session = signal<Session | null>(null);
  readonly isLoggedIn = computed(()=> this.session() != null);

  constructor()
  {
    this.supabase.auth.getSession().then(({data})=>this.session.set(data.session));
  }

    async signIn(email: string, password: string) {
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }
}
