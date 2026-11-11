import { computed, Injectable, signal } from '@angular/core';
import { createClient, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  private ready : Promise<void>

  readonly session = signal<Session | null>(null);
  readonly isLoggedIn = computed(()=> this.session() != null);

  constructor()
  {
    this.ready= this.supabase.auth.getSession().then(({data})=>this.session.set(data.session));
    this.supabase.auth.onAuthStateChange((_event, session) => this.session.set(session));

  }

  whenReady()
  {
    
 const timeout = new Promise<void>((resolve) => setTimeout(resolve, 3000));
  return Promise.race([this.ready, timeout]);  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
     if (error) throw error;
    this.session.set(data.session);
    if (error) throw error;
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }
}
