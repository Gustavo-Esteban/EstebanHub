import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- ======= NAVBAR ======= -->
    <nav class="navbar" [class.scrolled]="scrolled()">
      <div class="nav-container">
        <a [routerLink]="['/']" class="nav-logo">
          <span class="logo-text">Esteban<span class="logo-accent">Hub</span></span>
        </a>

        <div class="nav-links" [class.open]="menuOpen()">
          <a [routerLink]="['/']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"
            class="nav-link" (click)="closeMenu()">Início</a>
          <a [routerLink]="['/portfolio']" routerLinkActive="active"
            class="nav-link" (click)="closeMenu()">Portfólio</a>
          <a [routerLink]="['/servicos']" routerLinkActive="active"
            class="nav-link" (click)="closeMenu()">Serviços</a>
          <a [routerLink]="['/sobre']" routerLinkActive="active"
            class="nav-link" (click)="closeMenu()">Sobre</a>
          <a href="/#contato" class="nav-link" (click)="closeMenu()">Contato</a>
          <a href="/#contato" class="nav-cta" (click)="closeMenu()">
            Solicitar Orçamento
          </a>
        </div>

        <button class="hamburger" (click)="toggleMenu()" [class.active]="menuOpen()" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <!-- Backdrop for mobile menu -->
    <div class="nav-backdrop" [class.show]="menuOpen()" (click)="closeMenu()"></div>

    <!-- ======= PAGE CONTENT ======= -->
    <main>
      <router-outlet />
    </main>

    <!-- ======= FOOTER ======= -->
    <footer class="footer">
      <div class="footer-container">
        <!-- Top: Brand + Nav + Contact -->
        <div class="footer-top">
          <!-- Brand -->
          <div class="footer-brand">
            <div class="footer-logo">Esteban<span>Hub</span></div>
            <p class="footer-desc">
              Transformamos ideias em experiências digitais que convertem.
              Desenvolvimento web profissional com foco em resultados.
            </p>
            <div class="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener" class="social-icon" title="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-icon" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener" class="social-icon" title="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" class="social-icon social-whatsapp" title="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Navigation -->
          <div class="footer-col">
            <h4 class="footer-col-title">Navegação</h4>
            <ul class="footer-nav">
              <li><a [routerLink]="['/']">Início</a></li>
              <li><a [routerLink]="['/portfolio']">Portfólio</a></li>
              <li><a [routerLink]="['/servicos']">Serviços</a></li>
              <li><a [routerLink]="['/sobre']">Sobre</a></li>
              <li><a href="/#contato">Contato</a></li>
            </ul>
          </div>

          <!-- Services -->
          <div class="footer-col">
            <h4 class="footer-col-title">Serviços</h4>
            <ul class="footer-nav">
              <li><a [routerLink]="['/servicos']">Sites Institucionais</a></li>
              <li><a [routerLink]="['/servicos']">E-commerce</a></li>
              <li><a [routerLink]="['/servicos']">Landing Pages</a></li>
              <li><a [routerLink]="['/servicos']">SEO & Manutenção</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer-col">
            <h4 class="footer-col-title">Contato</h4>
            <ul class="footer-contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 10.7a19.79 19.79 0 01-3.07-8.67A2 2 0 012.88 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
                <a href="https://wa.me/5511970397086" target="_blank">(11) 97039-7086</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:contato@estebanhub.com">contato&#64;estebanhub.com</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Seg–Sex, 9h às 18h</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Divider -->
        <div class="footer-divider"></div>

        <!-- Bottom: Copyright + badge + admin -->
        <div class="footer-bottom">
          <p class="footer-copyright">
            &copy; {{ currentYear }} EstebanHub. Todos os direitos reservados.
          </p>
          <div class="footer-badge">
            <span class="badge-dot"></span>
            Desenvolvido com Angular & NestJS
          </div>
          <a [routerLink]="['/admin/login']" class="admin-link">
            Painel Admin
          </a>
        </div>
      </div>
    </footer>

    <!-- ======= WHATSAPP FAB ======= -->
    <a
      href="https://wa.me/5511970397086?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20um%20orçamento."
      target="_blank"
      rel="noopener"
      class="whatsapp-fab"
      title="Fale conosco no WhatsApp">
      <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span class="fab-tooltip">Fale conosco</span>
    </a>
  `,
  styles: [`
    /* ===== GLOBAL ===== */
    * { box-sizing: border-box; }

    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    main { min-height: 100vh; }

    /* ===== NAVBAR ===== */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      transition: all 0.3s ease;
      background: transparent;
    }

    .navbar.scrolled {
      background: rgba(15, 15, 35, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }

    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .nav-logo {
      text-decoration: none;
      flex-shrink: 0;
    }

    .logo-text {
      font-size: 22px;
      font-weight: 900;
      color: white;
      letter-spacing: -0.5px;
    }

    .logo-accent {
      background: linear-gradient(135deg, #667eea, #f093fb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .nav-link {
      padding: 8px 14px;
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.2s;
    }

    .nav-link:hover, .nav-link.active {
      color: white;
      background: rgba(255,255,255,0.1);
    }

    .nav-cta {
      margin-left: 8px;
      padding: 10px 22px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      text-decoration: none;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 700;
      transition: all 0.3s;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.35);
      white-space: nowrap;
    }

    .nav-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: background 0.2s;
    }

    .hamburger:hover { background: rgba(255,255,255,0.1); }

    .hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s;
    }

    .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    .nav-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 99;
      backdrop-filter: blur(2px);
    }

    /* ===== FOOTER ===== */
    .footer {
      background: #080818;
      color: white;
    }

    .footer-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 72px 24px 32px;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.3fr;
      gap: 48px;
      margin-bottom: 48px;
    }

    /* Brand */
    .footer-logo {
      font-size: 26px;
      font-weight: 900;
      margin-bottom: 16px;
      color: white;
    }

    .footer-logo span {
      background: linear-gradient(135deg, #667eea, #f093fb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .footer-desc {
      color: rgba(255,255,255,0.5);
      font-size: 14px;
      line-height: 1.7;
      margin: 0 0 28px;
      max-width: 280px;
    }

    .footer-social {
      display: flex;
      gap: 10px;
    }

    .social-icon {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      transition: all 0.25s;
    }

    .social-icon:hover {
      background: rgba(102, 126, 234, 0.2);
      border-color: rgba(102, 126, 234, 0.5);
      color: #667eea;
      transform: translateY(-3px);
    }

    .social-whatsapp:hover {
      background: rgba(37, 211, 102, 0.15);
      border-color: rgba(37, 211, 102, 0.4);
      color: #25d366;
    }

    /* Columns */
    .footer-col-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      margin: 0 0 20px;
    }

    .footer-nav {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-nav a {
      color: rgba(255,255,255,0.55);
      text-decoration: none;
      font-size: 14px;
      transition: color 0.2s;
      display: inline-block;
    }

    .footer-nav a:hover { color: white; }

    /* Contact column */
    .footer-contact {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .footer-contact li {
      display: flex;
      align-items: center;
      gap: 12px;
      color: rgba(255,255,255,0.55);
      font-size: 14px;
    }

    .footer-contact svg {
      flex-shrink: 0;
      opacity: 0.5;
    }

    .footer-contact a {
      color: rgba(255,255,255,0.55);
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-contact a:hover { color: white; }

    /* Divider */
    .footer-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
      margin-bottom: 28px;
    }

    /* Bottom */
    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .footer-copyright {
      color: rgba(255,255,255,0.3);
      font-size: 13px;
      margin: 0;
    }

    .footer-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255,255,255,0.25);
      font-size: 12px;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      background: #667eea;
      border-radius: 50%;
      animation: pulse-dot 2s infinite;
    }

    @keyframes pulse-dot {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.3); }
    }

    .admin-link {
      color: rgba(255,255,255,0.2);
      text-decoration: none;
      font-size: 12px;
      transition: color 0.2s;
    }

    .admin-link:hover { color: rgba(255,255,255,0.5); }

    /* ===== WHATSAPP FAB ===== */
    .whatsapp-fab {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 60px;
      height: 60px;
      background: #25d366;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
      z-index: 200;
      transition: all 0.3s;
      text-decoration: none;
    }

    .whatsapp-fab:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 30px rgba(37, 211, 102, 0.6);
    }

    .fab-tooltip {
      position: absolute;
      right: 70px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 13px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .whatsapp-fab:hover .fab-tooltip { opacity: 1; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 1024px) {
      .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
      .footer-brand { grid-column: 1 / -1; }
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 280px;
        flex-direction: column;
        align-items: flex-start;
        padding: 70px 24px 24px;
        gap: 8px;
        background: rgba(10, 10, 25, 0.98);
        backdrop-filter: blur(20px);
        border-left: 1px solid rgba(255,255,255,0.08);
        z-index: 100;
        overflow-y: auto;
      }

      .nav-links.open { display: flex; }

      .nav-backdrop.show { display: block; }

      .nav-link { width: 100%; padding: 12px 16px; font-size: 16px; }

      .nav-cta { width: 100%; text-align: center; margin: 8px 0 0; padding: 14px; border-radius: 12px; font-size: 15px; }

      .hamburger { display: flex; }

      .footer-top { grid-template-columns: 1fr; gap: 32px; }
      .footer-brand { grid-column: auto; }
      .footer-desc { max-width: 100%; }

      .footer-bottom { flex-direction: column; text-align: center; gap: 12px; }

      .whatsapp-fab { bottom: 20px; right: 20px; width: 54px; height: 54px; }

      .fab-tooltip { display: none; }
    }
  `]
})
export class PublicLayoutComponent {
  scrolled = signal(false);
  menuOpen = signal(false);
  currentYear = new Date().getFullYear();

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleMenu() {
    this.menuOpen.update((open) => {
      const next = !open;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = next ? 'hidden' : '';
      }
      return next;
    });
  }

  closeMenu() {
    this.menuOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
