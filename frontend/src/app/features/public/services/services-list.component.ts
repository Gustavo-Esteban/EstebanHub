import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="services-page">
      <!-- Header -->
      <section class="page-header">
        <div class="container">
          <h1>Nossos Serviços</h1>
          <p>Soluções digitais completas para transformar seu negócio online</p>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="services-section">
        <div class="container">
          <!-- Static services (always shown) -->
          <div class="services-grid">
            <div class="service-card" *ngFor="let service of defaultServices">
              <div class="card-icon">{{ service.icon }}</div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <ul class="features-list">
                <li *ngFor="let feature of service.features">✓ {{ feature }}</li>
              </ul>
              <a href="#contato" class="service-cta">Solicitar Orçamento →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="process-section">
        <div class="container">
          <div class="section-header">
            <h2>Como Trabalhamos</h2>
            <p>Um processo claro e transparente do início ao fim</p>
          </div>
          <div class="process-steps">
            <div class="step">
              <div class="step-number">01</div>
              <h4>Briefing</h4>
              <p>Entendemos seu negócio, objetivos e o público-alvo do seu projeto</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step">
              <div class="step-number">02</div>
              <h4>Proposta</h4>
              <p>Desenvolvemos uma proposta personalizada com prazo e investimento</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step">
              <div class="step-number">03</div>
              <h4>Desenvolvimento</h4>
              <p>Construímos com atualizações frequentes e feedback constante</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step">
              <div class="step-number">04</div>
              <h4>Entrega</h4>
              <p>Lançamento, treinamento e suporte pós-entrega</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Us Section -->
      <section class="why-section">
        <div class="container">
          <div class="why-grid">
            <div class="why-content">
              <h2>Por que escolher a EstebanHub?</h2>
              <div class="reasons">
                <div class="reason">
                  <div class="reason-icon">🎯</div>
                  <div>
                    <h4>Foco em Resultados</h4>
                    <p>Sites desenvolvidos para converter visitantes em clientes</p>
                  </div>
                </div>
                <div class="reason">
                  <div class="reason-icon">⚡</div>
                  <div>
                    <h4>Performance Máxima</h4>
                    <p>Carregamento rápido e SEO otimizado para melhor ranqueamento</p>
                  </div>
                </div>
                <div class="reason">
                  <div class="reason-icon">🛡️</div>
                  <div>
                    <h4>Tecnologia Atual</h4>
                    <p>6 anos de experiência em grandes empresas (XP, Bradesco, TIM)</p>
                  </div>
                </div>
                <div class="reason">
                  <div class="reason-icon">🤝</div>
                  <div>
                    <h4>Suporte Contínuo</h4>
                    <p>Acompanhamento e suporte após o lançamento do projeto</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="why-stats">
              <div class="stat">
                <div class="stat-value">6+</div>
                <div class="stat-label">Anos de Experiência</div>
              </div>
              <div class="stat">
                <div class="stat-value">100%</div>
                <div class="stat-label">Projetos Entregues</div>
              </div>
              <div class="stat">
                <div class="stat-value">⚡</div>
                <div class="stat-label">Tecnologia de Ponta</div>
              </div>
              <div class="stat">
                <div class="stat-value">🏆</div>
                <div class="stat-label">Qualidade Garantida</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .services-page { min-height: 100vh; background: #f9fafb; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .page-header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 100px 20px 60px; text-align: center; color: white; }
    .page-header h1 { font-size: 48px; margin: 0 0 16px; font-weight: 800; }
    .page-header p { font-size: 20px; opacity: 0.85; max-width: 600px; margin: 0 auto; }
    .services-section { padding: 80px 20px; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 32px; }
    .service-card { background: white; border-radius: 16px; padding: 36px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: all 0.4s; display: flex; flex-direction: column; }
    .service-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(0,0,0,0.15); }
    .card-icon { font-size: 48px; margin-bottom: 20px; }
    .service-card h3 { font-size: 22px; color: #1a1a1a; margin: 0 0 14px; font-weight: 700; }
    .service-card p { color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0 0 20px; }
    .features-list { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
    .features-list li { color: #374151; font-size: 14px; padding-left: 4px; }
    .service-cta { color: #6366f1; text-decoration: none; font-weight: 700; font-size: 15px; margin-top: auto; }
    .service-cta:hover { text-decoration: underline; }
    .process-section { padding: 80px 20px; background: white; }
    .section-header { text-align: center; margin-bottom: 60px; }
    .section-header h2 { font-size: 36px; color: #1a1a1a; margin: 0 0 12px; }
    .section-header p { color: #6b7280; font-size: 18px; }
    .process-steps { display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; }
    .step { text-align: center; max-width: 200px; }
    .step-number { font-size: 48px; font-weight: 900; color: #e0e7ff; margin-bottom: 12px; font-family: monospace; }
    .step h4 { font-size: 18px; margin: 0 0 8px; color: #1a1a1a; }
    .step p { font-size: 14px; color: #6b7280; line-height: 1.5; }
    .step-arrow { font-size: 32px; color: #d1d5db; }
    .why-section { padding: 80px 20px; }
    .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .why-content h2 { font-size: 36px; color: #1a1a1a; margin: 0 0 32px; }
    .reasons { display: flex; flex-direction: column; gap: 24px; }
    .reason { display: flex; gap: 16px; align-items: flex-start; }
    .reason-icon { font-size: 32px; flex-shrink: 0; }
    .reason h4 { margin: 0 0 6px; font-size: 18px; color: #1a1a1a; }
    .reason p { margin: 0; font-size: 15px; color: #6b7280; }
    .why-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .stat { background: white; border-radius: 16px; padding: 30px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
    .stat-value { font-size: 36px; font-weight: 800; color: #6366f1; margin-bottom: 8px; }
    .stat-label { font-size: 14px; color: #6b7280; font-weight: 600; }
    @media (max-width: 768px) {
      .page-header h1 { font-size: 32px; }
      .services-grid { grid-template-columns: 1fr; }
      .process-steps { flex-direction: column; }
      .step-arrow { transform: rotate(90deg); }
      .why-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ServicesListComponent implements OnInit {
  defaultServices = [
    {
      icon: '🏢',
      title: 'Sites Institucionais',
      description: 'Sites profissionais que representam sua empresa com credibilidade e elegância, gerando confiança nos clientes.',
      features: [
        'Design responsivo (mobile + desktop)',
        'SEO otimizado para buscas',
        'Integração com WhatsApp',
        'Formulário de contato',
        'Google Analytics',
        'Hospedagem configurada'
      ]
    },
    {
      icon: '🛒',
      title: 'E-commerce / Lojas Virtuais',
      description: 'Lojas online completas e otimizadas para vender 24h por dia, com gestão de produtos e pedidos.',
      features: [
        'Catálogo de produtos',
        'Carrinho e checkout',
        'Integração com pagamentos',
        'Gestão de estoque',
        'Relatórios de vendas',
        'Painel administrativo'
      ]
    },
    {
      icon: '🚀',
      title: 'Landing Pages',
      description: 'Páginas de alta conversão focadas em capturar leads e transformar visitantes em clientes qualificados.',
      features: [
        'Design orientado a conversão',
        'Formulários integrados',
        'A/B Testing',
        'Integração com CRM',
        'Velocidade máxima (Core Web Vitals)',
        'Pixel do Facebook e Google Ads'
      ]
    },
    {
      icon: '⚙️',
      title: 'Manutenção & SEO',
      description: 'Mantenha seu site sempre atualizado, seguro e no topo das buscas do Google.',
      features: [
        'Atualizações de conteúdo',
        'Otimização de SEO',
        'Backup automático',
        'Monitoramento de performance',
        'Relatórios mensais',
        'Suporte técnico prioritário'
      ]
    }
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    // Services are mostly static; can load dynamic ones from API in future
  }
}
