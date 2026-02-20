import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="home">
      <!-- ======= HERO SECTION ======= -->
      <section class="hero" id="inicio">
        <div class="hero-bg"></div>
        <div class="container">
          <div class="hero-content">
            <div class="hero-badge">🚀 Desenvolvimento Web Profissional</div>
            <h1 class="hero-title">
              Transformamos suas <span class="highlight">ideias</span> em
              <span class="highlight">resultados</span> digitais
            </h1>
            <p class="hero-subtitle">
              Sites institucionais, e-commerce e landing pages de alta conversão.
              6 anos de experiência em XP Investimentos, Bradesco e TIM.
            </p>
            <div class="hero-ctas">
              <a href="#contato" class="btn btn-primary">
                💬 Solicitar Orçamento Grátis
              </a>
              <a [routerLink]="['/portfolio']" class="btn btn-outline">
                Ver Portfólio →
              </a>
            </div>
            <div class="hero-trust">
              <div class="trust-item">✅ Sem mensalidade</div>
              <div class="trust-item">✅ Entrega garantida</div>
              <div class="trust-item">✅ Suporte incluído</div>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="scroll-indicator">
          <div class="scroll-dot"></div>
        </div>
      </section>

      <!-- ======= SERVICES SECTION ======= -->
      <section class="services" id="servicos">
        <div class="container">
          <div class="section-header">
            <h2>O que fazemos</h2>
            <p>Soluções digitais completas para o seu negócio crescer online</p>
          </div>
          <div class="services-grid">
            <div class="service-card" *ngFor="let service of services">
              <div class="service-icon">{{ service.icon }}</div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.desc }}</p>
              <a [routerLink]="['/servicos']" class="service-link">Saiba mais →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ======= PORTFOLIO PREVIEW ======= -->
      <section class="portfolio-preview" id="portfolio">
        <div class="container">
          <div class="section-header">
            <h2>Projetos em Destaque</h2>
            <p>Cases de sucesso que mostram nossa expertise</p>
          </div>

          <div class="loading-row" *ngIf="loadingProjects">
            <div class="spinner"></div>
          </div>

          <div class="projects-grid" *ngIf="!loadingProjects">
            <div class="project-card" *ngFor="let p of featuredProjects">
              <div class="project-image">
                <img *ngIf="p.thumbnail_url" [src]="p.thumbnail_url" [alt]="p.title" loading="lazy">
                <div *ngIf="!p.thumbnail_url" class="project-placeholder">
                  <span>🖥️</span>
                </div>
                <div class="project-overlay">
                  <a [routerLink]="['/portfolio', p.slug]" class="overlay-btn">Ver Case</a>
                </div>
                <div class="project-category">{{ getCategoryLabel(p.category) }}</div>
              </div>
              <div class="project-info">
                <h3>{{ p.title }}</h3>
                <p>{{ p.short_description }}</p>
                <div class="project-techs" *ngIf="p.technologies?.length > 0">
                  <span *ngFor="let tech of p.technologies?.slice(0, 3)">{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="empty-projects" *ngIf="!loadingProjects && featuredProjects.length === 0">
            <p>Em breve novos projetos serão publicados!</p>
          </div>

          <div class="section-cta">
            <a [routerLink]="['/portfolio']" class="btn btn-outline-dark">
              Ver Todos os Projetos →
            </a>
          </div>
        </div>
      </section>

      <!-- ======= TESTIMONIALS SECTION ======= -->
      <section class="testimonials" id="depoimentos" *ngIf="testimonials.length > 0">
        <div class="container">
          <div class="section-header">
            <h2>O que dizem nossos clientes</h2>
            <p>Resultados reais de quem confiou em nós</p>
          </div>
          <div class="testimonials-grid">
            <div class="testimonial-card" *ngFor="let t of testimonials">
              <div class="stars">
                <span *ngFor="let s of [1,2,3,4,5]" [class.active]="s <= t.rating">★</span>
              </div>
              <p class="testimonial-text">"{{ t.content }}"</p>
              <div class="testimonial-author">
                <div class="author-avatar">
                  <img *ngIf="t.client_photo_url" [src]="t.client_photo_url" [alt]="t.client_name">
                  <span *ngIf="!t.client_photo_url">{{ t.client_name[0] }}</span>
                </div>
                <div>
                  <strong>{{ t.client_name }}</strong>
                  <small>{{ t.client_company }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ======= ABOUT SECTION ======= -->
      <section class="about" id="sobre">
        <div class="container">
          <div class="about-grid">
            <div class="about-content">
              <h2>Quem está por trás da EstebanHub</h2>
              <p>
                Sou desenvolvedor front-end com <strong>6 anos de experiência</strong> no mercado financeiro
                e de telecomunicações, passando por empresas como <strong>XP Investimentos, Bradesco e TIM</strong>.
              </p>
              <p>
                Essa experiência me permitiu trabalhar com projetos de alta complexidade e padrão de qualidade
                elevado. Agora trago esse mesmo nível de excelência para pequenas e médias empresas através da EstebanHub.
              </p>
              <div class="about-highlights">
                <div class="highlight-item">
                  <div class="h-icon">🏦</div>
                  <div>
                    <strong>XP Investimentos</strong>
                    <span>Fintech líder no Brasil</span>
                  </div>
                </div>
                <div class="highlight-item">
                  <div class="h-icon">🏧</div>
                  <div>
                    <strong>Bradesco</strong>
                    <span>Maior banco privado do Brasil</span>
                  </div>
                </div>
                <div class="highlight-item">
                  <div class="h-icon">📡</div>
                  <div>
                    <strong>TIM Brasil</strong>
                    <span>Gigante das telecomunicações</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="about-stats">
              <div class="stat-card">
                <div class="stat-number">6+</div>
                <div class="stat-label">Anos de Experiência</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">3</div>
                <div class="stat-label">Grandes Empresas</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">100%</div>
                <div class="stat-label">Entrega Garantida</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">⚡</div>
                <div class="stat-label">Performance Máxima</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ======= CONTACT SECTION ======= -->
      <section class="contact" id="contato">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-info">
              <h2>Vamos conversar?</h2>
              <p>
                Preencha o formulário e entraremos em contato em até 24 horas.
                Orçamento gratuito e sem compromisso.
              </p>
              <div class="contact-methods">
                <div class="contact-method">
                  <span class="method-icon">💬</span>
                  <div>
                    <strong>WhatsApp</strong>
                    <a href="https://wa.me/5511970397086" target="_blank">
                      (11) 97039-7086
                    </a>
                  </div>
                </div>
                <div class="contact-method">
                  <span class="method-icon">📧</span>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:contato@estebanhub.com">
                      contato@estebanhub.com
                    </a>
                  </div>
                </div>
                <div class="contact-method">
                  <span class="method-icon">⏰</span>
                  <div>
                    <strong>Horário</strong>
                    <span>Seg-Sex, 9h às 18h</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="contact-form-wrap">
              <form [formGroup]="contactForm" (ngSubmit)="submitContact()">
                <div class="form-row">
                  <div class="form-group">
                    <label>Nome *</label>
                    <input type="text" formControlName="name" placeholder="Seu nome">
                    <div class="field-error" *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
                      Nome é obrigatório
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Telefone</label>
                    <input type="tel" formControlName="phone" placeholder="(11) 97039-7086">
                  </div>
                </div>

                <div class="form-group">
                  <label>Email *</label>
                  <input type="email" formControlName="email" placeholder="seu@email.com">
                  <div class="field-error" *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                    Email válido é obrigatório
                  </div>
                </div>

                <div class="form-group">
                  <label>Empresa</label>
                  <input type="text" formControlName="company" placeholder="Nome da sua empresa">
                </div>

                <div class="form-group">
                  <label>Mensagem *</label>
                  <textarea formControlName="message" rows="5"
                    placeholder="Conte-nos sobre seu projeto: tipo de site, objetivo, prazo..."></textarea>
                  <div class="field-error" *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
                    Por favor, descreva seu projeto
                  </div>
                </div>

                <button type="submit" class="btn btn-submit" [disabled]="contactForm.invalid || submitting">
                  {{ submitting ? 'Enviando...' : '📨 Enviar Mensagem' }}
                </button>

                <div class="form-success" *ngIf="formSubmitted">
                  ✅ Mensagem enviada! Retornaremos em breve.
                </div>

                <div class="form-error" *ngIf="formError">
                  ❌ {{ formError }}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    * { box-sizing: border-box; }

    .home { min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

    /* ===== HERO ===== */
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      background: #0f0f23;
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 30% 50%, rgba(102, 126, 234, 0.3) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 20%, rgba(118, 75, 162, 0.2) 0%, transparent 50%);
      animation: pulse 8s ease-in-out infinite alternate;
    }

    @keyframes pulse {
      0% { opacity: 0.8; }
      100% { opacity: 1; }
    }

    .hero .container { position: relative; z-index: 1; padding: 120px 20px 80px; }

    .hero-content { max-width: 780px; }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 8px 20px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 32px;
    }

    .hero-title {
      font-size: 64px;
      font-weight: 900;
      color: white;
      line-height: 1.1;
      margin: 0 0 24px;
      letter-spacing: -1px;
    }

    .hero-title .highlight {
      background: linear-gradient(135deg, #667eea, #f093fb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 20px;
      color: rgba(255,255,255,0.8);
      line-height: 1.6;
      margin: 0 0 40px;
      max-width: 600px;
    }

    .hero-ctas {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }

    .btn {
      padding: 16px 36px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition: all 0.3s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5); }

    .btn-outline {
      background: transparent;
      color: white;
      border: 2px solid rgba(255,255,255,0.4);
    }

    .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: white; }

    .hero-trust {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    .trust-item {
      color: rgba(255,255,255,0.7);
      font-size: 14px;
    }

    .scroll-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .scroll-dot {
      width: 8px;
      height: 8px;
      background: rgba(255,255,255,0.5);
      border-radius: 50%;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); opacity: 0.5; }
      50% { transform: translateY(10px); opacity: 1; }
    }

    /* ===== SECTION HEADER ===== */
    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-header h2 {
      font-size: 42px;
      font-weight: 800;
      color: #1a1a1a;
      margin: 0 0 12px;
    }

    .section-header p {
      font-size: 18px;
      color: #6b7280;
      margin: 0;
    }

    /* ===== SERVICES ===== */
    .services {
      padding: 100px 20px;
      background: #f9fafb;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 28px;
    }

    .service-card {
      background: white;
      border-radius: 20px;
      padding: 40px 30px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      transition: all 0.4s;
      cursor: pointer;
    }

    .service-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.12);
    }

    .service-icon {
      font-size: 52px;
      margin-bottom: 20px;
    }

    .service-card h3 {
      font-size: 20px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 12px;
    }

    .service-card p {
      color: #6b7280;
      font-size: 15px;
      line-height: 1.6;
      margin: 0 0 20px;
    }

    .service-link {
      color: #6366f1;
      font-weight: 700;
      text-decoration: none;
      font-size: 15px;
    }

    .service-link:hover { text-decoration: underline; }

    /* ===== PORTFOLIO PREVIEW ===== */
    .portfolio-preview {
      padding: 100px 20px;
      background: white;
    }

    .loading-row {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #e5e7eb;
      border-top: 4px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 28px;
      margin-bottom: 50px;
    }

    .project-card {
      background: #f9fafb;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.4s;
    }

    .project-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
    }

    .project-image {
      position: relative;
      height: 220px;
      overflow: hidden;
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }

    .project-card:hover .project-image img {
      transform: scale(1.06);
    }

    .project-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea20, #764ba220);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 64px;
    }

    .project-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .project-card:hover .project-overlay {
      opacity: 1;
    }

    .overlay-btn {
      padding: 10px 24px;
      background: white;
      color: #6366f1;
      border-radius: 30px;
      font-weight: 700;
      text-decoration: none;
    }

    .project-category {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 5px 14px;
      background: rgba(255,255,255,0.95);
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      color: #6366f1;
    }

    .project-info {
      padding: 20px;
    }

    .project-info h3 {
      font-size: 18px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 8px;
    }

    .project-info p {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
      margin: 0 0 12px;
    }

    .project-techs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .project-techs span {
      padding: 3px 10px;
      background: #e0e7ff;
      color: #4f46e5;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 600;
    }

    .empty-projects {
      text-align: center;
      padding: 40px;
      color: #9ca3af;
    }

    .section-cta {
      text-align: center;
    }

    .btn-outline-dark {
      padding: 14px 36px;
      border: 2px solid #1a1a1a;
      color: #1a1a1a;
      background: transparent;
      border-radius: 50px;
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      transition: all 0.3s;
      display: inline-block;
    }

    .btn-outline-dark:hover {
      background: #1a1a1a;
      color: white;
    }

    /* ===== TESTIMONIALS ===== */
    .testimonials {
      padding: 100px 20px;
      background: #f9fafb;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .testimonial-card {
      background: white;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.06);
    }

    .stars { margin-bottom: 16px; }
    .stars span { font-size: 20px; color: #d1d5db; }
    .stars span.active { color: #fbbf24; }

    .testimonial-text {
      font-size: 15px;
      color: #374151;
      line-height: 1.7;
      font-style: italic;
      margin: 0 0 20px;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .author-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
      flex-shrink: 0;
    }

    .author-avatar img { width: 100%; height: 100%; object-fit: cover; }

    .testimonial-author > div:not(.author-avatar) {
      display: flex;
      flex-direction: column;
    }

    .testimonial-author strong { color: #1a1a1a; font-size: 15px; }
    .testimonial-author small { color: #9ca3af; font-size: 13px; }

    /* ===== ABOUT ===== */
    .about {
      padding: 100px 20px;
      background: white;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .about-content h2 {
      font-size: 40px;
      font-weight: 800;
      color: #1a1a1a;
      margin: 0 0 20px;
      line-height: 1.2;
    }

    .about-content p {
      color: #6b7280;
      font-size: 16px;
      line-height: 1.7;
      margin-bottom: 16px;
    }

    .about-highlights {
      margin-top: 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .highlight-item {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .h-icon {
      width: 52px;
      height: 52px;
      background: #f0f0ff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      flex-shrink: 0;
    }

    .highlight-item > div:not(.h-icon) {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .highlight-item strong { color: #1a1a1a; font-size: 16px; }
    .highlight-item span { color: #6b7280; font-size: 14px; }

    .about-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .stat-card {
      background: #f9fafb;
      border-radius: 16px;
      padding: 30px;
      text-align: center;
    }

    .stat-number {
      font-size: 48px;
      font-weight: 900;
      color: #6366f1;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 14px;
      color: #6b7280;
      font-weight: 600;
    }

    /* ===== CONTACT ===== */
    .contact {
      padding: 100px 20px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
    }

    .contact-info h2 {
      font-size: 42px;
      font-weight: 800;
      color: white;
      margin: 0 0 20px;
    }

    .contact-info > p {
      color: rgba(255,255,255,0.7);
      font-size: 16px;
      line-height: 1.7;
      margin-bottom: 40px;
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .contact-method {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .method-icon {
      font-size: 28px;
      width: 52px;
      text-align: center;
    }

    .contact-method > div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .contact-method strong {
      color: rgba(255,255,255,0.5);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .contact-method a, .contact-method span {
      color: white;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
    }

    .contact-method a:hover { text-decoration: underline; }

    .contact-form-wrap {
      background: white;
      border-radius: 24px;
      padding: 40px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    .form-group label {
      font-weight: 600;
      color: #374151;
      font-size: 14px;
    }

    .form-group input, .form-group textarea {
      padding: 12px 16px;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      font-size: 15px;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: #6366f1;
    }

    .field-error { color: #ef4444; font-size: 13px; }

    .btn-submit {
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .btn-submit:hover:not(:disabled) { transform: translateY(-2px); }

    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

    .form-success {
      margin-top: 16px;
      padding: 14px;
      background: #d1fae5;
      color: #065f46;
      border-radius: 10px;
      text-align: center;
      font-weight: 600;
    }

    .form-error {
      margin-top: 16px;
      padding: 14px;
      background: #fef2f2;
      color: #ef4444;
      border-radius: 10px;
      text-align: center;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 1024px) {
      .hero-title { font-size: 48px; }
      .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    }

    @media (max-width: 768px) {
      .hero-title { font-size: 36px; }
      .section-header h2 { font-size: 30px; }
      .projects-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .about-stats { grid-template-columns: 1fr 1fr; }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProjects: any[] = [];
  testimonials: any[] = [];
  loadingProjects = false;
  contactForm: FormGroup;
  submitting = false;
  formSubmitted = false;
  formError: string | null = null;

  services = [
    { icon: '🏢', title: 'Sites Institucionais', desc: 'Sites profissionais que transmitem credibilidade e geram confiança em seus clientes.' },
    { icon: '🛒', title: 'E-commerce', desc: 'Lojas virtuais completas para vender seus produtos 24 horas por dia, 7 dias por semana.' },
    { icon: '🚀', title: 'Landing Pages', desc: 'Páginas de conversão otimizadas para transformar visitantes em leads e clientes.' },
    { icon: '⚙️', title: 'SEO e Manutenção', desc: 'Ranqueamento no Google e manutenção técnica para seu site sempre perfeito.' }
  ];

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProjects();
    this.loadTestimonials();
  }

  async loadProjects() {
    this.loadingProjects = true;
    try {
      const all = await firstValueFrom(this.api.get<any[]>('projects'));
      this.featuredProjects = all.filter(p => p.featured).slice(0, 6);
      if (this.featuredProjects.length === 0) {
        this.featuredProjects = all.slice(0, 6);
      }
    } catch (err) {
      // fail silently on public page
    } finally {
      this.loadingProjects = false;
    }
  }

  async loadTestimonials() {
    try {
      this.testimonials = await firstValueFrom(this.api.get<any[]>('testimonials'));
      this.testimonials = this.testimonials.slice(0, 3);
    } catch (err) {
      // fail silently
    }
  }

  getCategoryLabel(category: string): string {
    return { 'institutional': 'Institucional', 'ecommerce': 'E-commerce', 'landing-page': 'Landing Page' }[category] || category;
  }

  async submitContact() {
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(k => this.contactForm.get(k)?.markAsTouched());
      return;
    }

    this.submitting = true;
    this.formError = null;
    this.formSubmitted = false;

    try {
      const payload = {
        ...this.contactForm.value,
        source: 'contact-form'
      };
      await firstValueFrom(this.api.post('leads', payload));
      this.formSubmitted = true;
      this.contactForm.reset();
    } catch (err: any) {
      this.formError = 'Erro ao enviar mensagem. Tente novamente ou nos contate via WhatsApp.';
    } finally {
      this.submitting = false;
    }
  }
}
