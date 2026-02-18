import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about">
      <h1>Sobre</h1>
      <p>Página em desenvolvimento...</p>
    </div>
  `,
  styles: [`
    .about {
      padding: 80px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AboutComponent {}
