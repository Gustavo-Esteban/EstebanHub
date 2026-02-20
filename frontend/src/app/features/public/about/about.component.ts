import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="about-page">
      <!-- HERO -->
      <section class="about-hero">
        <div class="container">
          <div class="hero-grid">
            <div class="hero-text">
              <p class="eyebrow">Sobre a EstebanHub</p>
              <h1>
                Estratégia, design e código
                <span class="highlight">no mesmo lugar</span>
              </h1>
              <p class="subtitle">
                A EstebanHub nasceu para conectar negócios a resultados digitais reais.
                Unimos experiência em grandes empresas com a agilidade de um estúdio
                enxuto para entregar sites que geram leads, autoridade e vendas.
              </p>
              <div class="hero-badges">
                <div class="badge">
                  <span class="badge-label">Experiência</span>
                  <span class="badge-value">6+ anos</span>
                  <span class="badge-desc">XP Investimentos, Bradesco, TIM</span>
                </div>
                <div class="badge">
                  <span class="badge-label">Especialidade</span>
                  <span class="badge-value">Front-end</span>
                  <span class="badge-desc">Angular, React, performance e UX</span>
                </div>
              </div>
              <div class="hero-ctas">
                <a routerLink="/" fragment="contato" class="btn btn-primary">
                  💬 Falar sobre um projeto
                </a>
                <a routerLink="/portfolio" class="btn btn-outline">
                  Ver cases →
                </a>
              </div>
            </div>
            <div class="hero-card">
              <div class="hero-avatar">GE</div>
              <h3>Gustavo Esteban</h3>
              <p class="hero-role">Front-end & Product Designer</p>
              <p class="hero-bio">
                Desenvolvedor focado em criar experiências claras e objetivas,
                com base em dados, boas práticas de UX e código limpo.
              </p>
              <ul class="hero-list">
                <li>Experiência em produtos digitais de alta escala</li>
                <li>Foco em performance, SEO e conversão</li>
                <li>Atuação do briefing ao deploy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- VALORES -->
      <section class="about-values">
        <div class="container">
          <div class="section-header">
            <h2>O que guia nosso trabalho</h2>
            <p>Princípios que aplicamos em cada projeto, independente do tamanho.</p>
          </div>
          <div class="values-grid">
            <div class="value-card">
              <div class="icon">🎯</div>
              <h3>Foco em resultado</h3>
              <p>
                Cada tela é pensada para gerar ações claras: cliques, contatos e vendas.
                Layout bonito é importante, mas conversão vem primeiro.
              </p>
            </div>
            <div class="value-card">
              <div class="icon">🤝</div>
              <h3>Parceria de verdade</h3>
              <p>
                Trabalhamos próximo do cliente, traduzindo termos técnicos e
                mantendo você sempre no controle das decisões.
              </p>
            </div>
            <div class="value-card">
              <div class="icon">⚙️</div>
              <h3>Qualidade técnica</h3>
              <p>
                Stack moderna com Angular e NestJS, além de soluções em WordPress
                otimizadas na Hostinger, sempre com boas práticas de código e
                infraestrutura preparada para crescer junto com o seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- PROCESSO -->
      <section class="about-process">
        <div class="container">
          <div class="section-header">
            <h2>Como conduzimos um projeto</h2>
            <p>Um passo a passo claro do primeiro contato até o pós-lançamento.</p>
          </div>
          <div class="process-grid">
            <div class="step">
              <span class="step-number">01</span>
              <h3>Descoberta</h3>
              <p>
                Entendemos seu momento, público, concorrentes e objetivos. A partir
                disso definimos o escopo ideal e o posicionamento do site.
              </p>
            </div>
            <div class="step">
              <span class="step-number">02</span>
              <h3>Arquitetura e design</h3>
              <p>
                Organizamos a estrutura das páginas, criamos o layout e validamos
                com você antes de escrever uma linha de código.
              </p>
            </div>
            <div class="step">
              <span class="step-number">03</span>
              <h3>Desenvolvimento</h3>
              <p>
                Implementamos o front-end e o painel administrativo, conectando
                formulários, integrações e áreas dinâmicas.
              </p>
            </div>
            <div class="step">
              <span class="step-number">04</span>
              <h3>Teste, lançamento e suporte</h3>
              <p>
                Testamos em diferentes dispositivos, ajustamos detalhes finais e
                acompanhamos os primeiros dias no ar para garantir estabilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA FINAL -->
      <section class="about-cta">
        <div class="container">
          <div class="cta-card">
            <div>
              <h2>Pronto para tirar seu projeto do papel?</h2>
              <p>
                Envie uma mensagem com a sua ideia e em até 24h retornamos com
                uma proposta clara, sem compromisso.
              </p>
            </div>
            <div class="cta-actions">
              <a routerLink="/" fragment="contato" class="btn btn-primary">
                💬 Solicitar orçamento
              </a>
              <a
                href="https://wa.me/5511970397086?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20falar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener"
                class="btn btn-outline"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .about-page {
      min-height: 100vh;
      background: #0f172a;
      color: #e5e7eb;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .about-hero {
      padding: 140px 0 80px;
      background:
        radial-gradient(circle at top left, rgba(96, 165, 250, 0.25), transparent 60%),
        radial-gradient(circle at bottom right, rgba(129, 140, 248, 0.3), transparent 55%);
    }

    .hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(0, 1.2fr);
      gap: 40px;
      align-items: center;
    }

    .hero-text h1 {
      font-size: 46px;
      line-height: 1.1;
      margin: 12px 0 20px;
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    .highlight {
      color: #60a5fa;
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-size: 12px;
      color: #9ca3af;
    }

    .subtitle {
      max-width: 520px;
      color: #9ca3af;
      font-size: 16px;
    }

    .hero-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin: 28px 0 24px;
    }

    .badge {
      background: rgba(15, 23, 42, 0.9);
      border-radius: 16px;
      padding: 12px 16px;
      border: 1px solid rgba(148, 163, 184, 0.4);
      min-width: 180px;
    }

    .badge-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #9ca3af;
    }

    .badge-value {
      display: block;
      font-size: 18px;
      font-weight: 700;
      color: #e5e7eb;
    }

    .badge-desc {
      font-size: 13px;
      color: #9ca3af;
    }

    .hero-ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 10px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 26px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 15px;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.25s ease;
      border: 1px solid transparent;
    }

    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: white;
      box-shadow: 0 18px 40px rgba(79, 70, 229, 0.35);
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 22px 50px rgba(79, 70, 229, 0.45);
    }

    .btn-outline {
      background: transparent;
      color: #e5e7eb;
      border-color: rgba(148, 163, 184, 0.5);
    }

    .btn-outline:hover {
      background: rgba(15, 23, 42, 0.9);
      border-color: #6366f1;
      color: #e5e7eb;
    }

    .hero-card {
      background: rgba(15, 23, 42, 0.95);
      border-radius: 24px;
      padding: 28px 24px;
      border: 1px solid rgba(148, 163, 184, 0.4);
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.8);
    }

    .hero-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #22c55e);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 22px;
      color: white;
      margin-bottom: 16px;
    }

    .hero-card h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
    }

    .hero-role {
      margin: 4px 0 12px;
      font-size: 14px;
      color: #9ca3af;
    }

    .hero-bio {
      font-size: 14px;
      color: #d1d5db;
      margin-bottom: 14px;
    }

    .hero-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 14px;
      color: #e5e7eb;
    }

    .hero-list li::before {
      content: "•";
      margin-right: 6px;
      color: #60a5fa;
    }

    .about-values {
      padding: 60px 0;
      background: #020617;
    }

    .section-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .section-header h2 {
      font-size: 30px;
      margin-bottom: 8px;
    }

    .section-header p {
      color: #9ca3af;
      font-size: 15px;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
    }

    .value-card {
      background: #020617;
      border-radius: 18px;
      padding: 24px 22px;
      border: 1px solid rgba(31, 41, 55, 0.9);
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.6);
    }

    .value-card .icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: rgba(55, 65, 81, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      font-size: 20px;
    }

    .value-card h3 {
      margin: 0 0 8px;
      font-size: 18px;
    }

    .value-card p {
      margin: 0;
      font-size: 14px;
      color: #d1d5db;
    }

    .about-process {
      padding: 70px 0 60px;
      background: #020617;
      border-top: 1px solid rgba(15, 23, 42, 0.9);
    }

    .process-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 20px;
    }

    .step {
      background: #020617;
      border-radius: 18px;
      padding: 24px 20px;
      border: 1px solid rgba(31, 41, 55, 0.9);
      position: relative;
    }

    .step-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 999px;
      background: rgba(37, 99, 235, 0.18);
      color: #93c5fd;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .step h3 {
      margin: 0 0 8px;
      font-size: 17px;
    }

    .step p {
      margin: 0;
      font-size: 14px;
      color: #d1d5db;
    }

    .about-cta {
      padding: 70px 0 90px;
      background: #020617;
      border-top: 1px solid rgba(15, 23, 42, 0.9);
    }

    .cta-card {
      background: radial-gradient(circle at top left, rgba(96, 165, 250, 0.35), transparent 60%),
                  radial-gradient(circle at bottom right, rgba(52, 211, 153, 0.25), transparent 55%),
                  #020617;
      border-radius: 24px;
      padding: 32px 28px;
      border: 1px solid rgba(148, 163, 184, 0.4);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.9);
    }

    .cta-card h2 {
      margin: 0 0 8px;
      font-size: 26px;
    }

    .cta-card p {
      margin: 0;
      color: #e5e7eb;
      font-size: 15px;
      max-width: 520px;
    }

    .cta-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    @media (max-width: 960px) {
      .hero-grid {
        grid-template-columns: minmax(0, 1fr);
      }

      .about-hero {
        padding-top: 120px;
      }

      .values-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .process-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .cta-card {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    @media (max-width: 640px) {
      .hero-text h1 {
        font-size: 34px;
      }

      .values-grid,
      .process-grid {
        grid-template-columns: minmax(0, 1fr);
      }

      .cta-card h2 {
        font-size: 22px;
      }
    }
  `]
})
export class AboutComponent {}
