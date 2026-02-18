import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="project-form">
      <div class="header">
        <div>
          <button class="btn-back" [routerLink]="['/admin/projetos']">
            ← Voltar
          </button>
          <h1>{{ isEditMode ? 'Editar Projeto' : 'Novo Projeto' }}</h1>
        </div>
      </div>

      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
        <p>{{ isEditMode ? 'Carregando projeto...' : 'Salvando projeto...' }}</p>
      </div>

      <form [formGroup]="projectForm" (ngSubmit)="onSubmit()" *ngIf="!loading">
        <div class="form-grid">
          <!-- Left Column -->
          <div class="form-column">
            <div class="form-group">
              <label for="title">Título *</label>
              <input
                id="title"
                type="text"
                formControlName="title"
                placeholder="Nome do projeto"
                (blur)="generateSlug()"
              >
              <div class="error" *ngIf="projectForm.get('title')?.invalid && projectForm.get('title')?.touched">
                Título é obrigatório
              </div>
            </div>

            <div class="form-group">
              <label for="slug">Slug *</label>
              <input
                id="slug"
                type="text"
                formControlName="slug"
                placeholder="projeto-exemplo"
              >
              <small>URL amigável (gerado automaticamente do título)</small>
              <div class="error" *ngIf="projectForm.get('slug')?.invalid && projectForm.get('slug')?.touched">
                Slug é obrigatório
              </div>
            </div>

            <div class="form-group">
              <label for="short_description">Descrição Curta *</label>
              <textarea
                id="short_description"
                formControlName="short_description"
                rows="2"
                placeholder="Breve descrição do projeto (1-2 linhas)"
              ></textarea>
              <div class="error" *ngIf="projectForm.get('short_description')?.invalid && projectForm.get('short_description')?.touched">
                Descrição curta é obrigatória
              </div>
            </div>

            <div class="form-group">
              <label for="description">Descrição Completa</label>
              <textarea
                id="description"
                formControlName="description"
                rows="6"
                placeholder="Descrição detalhada do projeto, desafios, soluções implementadas..."
              ></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="client_name">Nome do Cliente</label>
                <input
                  id="client_name"
                  type="text"
                  formControlName="client_name"
                  placeholder="Nome da empresa"
                >
              </div>

              <div class="form-group">
                <label for="project_url">URL do Projeto</label>
                <input
                  id="project_url"
                  type="url"
                  formControlName="project_url"
                  placeholder="https://exemplo.com"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="technologies">Tecnologias</label>
              <input
                id="technologies"
                type="text"
                formControlName="technologiesInput"
                placeholder="React, Node.js, PostgreSQL (separado por vírgula)"
                (blur)="updateTechnologies()"
              >
              <div class="tech-tags" *ngIf="technologies.length > 0">
                <span class="tech-tag" *ngFor="let tech of technologies; let i = index">
                  {{ tech }}
                  <button type="button" (click)="removeTechnology(i)">×</button>
                </span>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="form-column">
            <div class="form-group">
              <label for="category">Categoria *</label>
              <select id="category" formControlName="category">
                <option value="">Selecione uma categoria</option>
                <option value="institutional">Institucional</option>
                <option value="ecommerce">E-commerce</option>
                <option value="landing-page">Landing Page</option>
              </select>
              <div class="error" *ngIf="projectForm.get('category')?.invalid && projectForm.get('category')?.touched">
                Categoria é obrigatória
              </div>
            </div>

            <div class="form-group">
              <label for="status">Status *</label>
              <select id="status" formControlName="status">
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
                <option value="archived">Arquivado</option>
              </select>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="featured">
                <span>Projeto em Destaque</span>
              </label>
              <small>Aparece na seção de destaques da home</small>
            </div>

            <div class="form-group">
              <label for="order_index">Ordem de Exibição</label>
              <input
                id="order_index"
                type="number"
                formControlName="order_index"
                placeholder="0"
                min="0"
              >
              <small>Ordem de exibição (menor número aparece primeiro)</small>
            </div>

            <div class="form-group">
              <label for="thumbnail_url">URL da Imagem de Capa</label>
              <input
                id="thumbnail_url"
                type="url"
                formControlName="thumbnail_url"
                placeholder="https://exemplo.com/imagem.jpg"
              >
              <small>Imagem principal do projeto (thumbnail)</small>

              <div class="image-preview" *ngIf="projectForm.get('thumbnail_url')?.value">
                <img [src]="projectForm.get('thumbnail_url')?.value" alt="Preview">
              </div>
            </div>

            <div class="form-group">
              <label for="images">Galeria de Imagens (URLs)</label>
              <textarea
                id="images"
                formControlName="imagesInput"
                rows="4"
                placeholder="Cole URLs de imagens, uma por linha"
                (blur)="updateImages()"
              ></textarea>
              <small>Uma URL por linha</small>

              <div class="images-grid" *ngIf="images.length > 0">
                <div class="image-item" *ngFor="let img of images; let i = index">
                  <img [src]="img" alt="Gallery image">
                  <button type="button" class="remove-img" (click)="removeImage(i)">×</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" [routerLink]="['/admin/projetos']">
            Cancelar
          </button>
          <button type="submit" class="btn-primary" [disabled]="projectForm.invalid || saving">
            {{ saving ? 'Salvando...' : (isEditMode ? 'Atualizar Projeto' : 'Criar Projeto') }}
          </button>
        </div>

        <div class="error-message" *ngIf="errorMessage">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .project-form {
      padding: 40px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      margin-bottom: 40px;
    }

    .btn-back {
      background: none;
      border: none;
      color: #6366f1;
      font-size: 16px;
      cursor: pointer;
      padding: 0;
      margin-bottom: 15px;
      display: inline-block;
    }

    .btn-back:hover {
      text-decoration: underline;
    }

    .header h1 {
      margin: 0;
      color: #1a1a1a;
      font-size: 32px;
    }

    .loading {
      text-align: center;
      padding: 60px 20px;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    form {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }

    .form-column {
      display: flex;
      flex-direction: column;
      gap: 24px;
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
    }

    label {
      font-weight: 600;
      color: #374151;
      font-size: 14px;
    }

    input, select, textarea {
      padding: 12px 16px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 15px;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #6366f1;
    }

    small {
      color: #6b7280;
      font-size: 13px;
    }

    .error {
      color: #ef4444;
      font-size: 13px;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-weight: normal;
    }

    .checkbox-label input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .tech-tag {
      background: #e0e7ff;
      color: #3730a3;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .tech-tag button {
      background: none;
      border: none;
      color: #3730a3;
      font-size: 18px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }

    .image-preview {
      margin-top: 12px;
      border-radius: 8px;
      overflow: hidden;
      max-width: 100%;
    }

    .image-preview img {
      width: 100%;
      height: auto;
      display: block;
    }

    .images-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .image-item {
      position: relative;
      aspect-ratio: 16/9;
      border-radius: 8px;
      overflow: hidden;
    }

    .image-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .remove-img {
      position: absolute;
      top: 4px;
      right: 4px;
      background: rgba(239, 68, 68, 0.9);
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }

    .btn-primary {
      padding: 12px 32px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: transform 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      padding: 12px 32px;
      background: #f3f4f6;
      color: #1a1a1a;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
    }

    .error-message {
      margin-top: 20px;
      padding: 12px 16px;
      background: #fef2f2;
      color: #ef4444;
      border-radius: 8px;
      text-align: center;
    }
  `]
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode = false;
  projectId: string | null = null;
  loading = false;
  saving = false;
  errorMessage: string | null = null;
  technologies: string[] = [];
  images: string[] = [];

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      short_description: ['', Validators.required],
      description: [''],
      client_name: [''],
      project_url: [''],
      thumbnail_url: [''],
      category: ['', Validators.required],
      status: ['draft', Validators.required],
      featured: [false],
      order_index: [0],
      technologiesInput: [''],
      imagesInput: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      this.isEditMode = !!this.projectId && this.projectId !== 'new';

      if (this.isEditMode && this.projectId) {
        this.loadProject(this.projectId);
      }
    });
  }

  async loadProject(id: string) {
    this.loading = true;
    this.errorMessage = null;

    try {
      const project = await this.projectsService.getProjectById(id);

      // Set technologies
      this.technologies = project.technologies || [];

      // Set images
      this.images = project.images || [];

      // Populate form
      this.projectForm.patchValue({
        title: project.title,
        slug: project.slug,
        short_description: project.short_description,
        description: project.description,
        client_name: project.client_name,
        project_url: project.project_url,
        thumbnail_url: project.thumbnail_url,
        category: project.category,
        status: project.status,
        featured: project.featured,
        order_index: project.order_index,
        technologiesInput: this.technologies.join(', '),
        imagesInput: this.images.join('\n')
      });
    } catch (err: any) {
      this.errorMessage = err.message || 'Erro ao carregar projeto';
    } finally {
      this.loading = false;
    }
  }

  generateSlug() {
    const title = this.projectForm.get('title')?.value;
    if (title && !this.projectForm.get('slug')?.value) {
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      this.projectForm.patchValue({ slug });
    }
  }

  updateTechnologies() {
    const input = this.projectForm.get('technologiesInput')?.value;
    if (input) {
      this.technologies = input
        .split(',')
        .map((tech: string) => tech.trim())
        .filter((tech: string) => tech.length > 0);
    }
  }

  removeTechnology(index: number) {
    this.technologies.splice(index, 1);
    this.projectForm.patchValue({
      technologiesInput: this.technologies.join(', ')
    });
  }

  updateImages() {
    const input = this.projectForm.get('imagesInput')?.value;
    if (input) {
      this.images = input
        .split('\n')
        .map((url: string) => url.trim())
        .filter((url: string) => url.length > 0 && url.startsWith('http'));
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.projectForm.patchValue({
      imagesInput: this.images.join('\n')
    });
  }

  async onSubmit() {
    if (this.projectForm.invalid) {
      Object.keys(this.projectForm.controls).forEach(key => {
        this.projectForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.saving = true;
    this.errorMessage = null;

    try {
      // Update technologies and images from inputs
      this.updateTechnologies();
      this.updateImages();

      const formValue = this.projectForm.value;
      const projectData = {
        title: formValue.title,
        slug: formValue.slug,
        short_description: formValue.short_description,
        description: formValue.description || '',
        client_name: formValue.client_name || '',
        project_url: formValue.project_url || '',
        thumbnail_url: formValue.thumbnail_url || '',
        category: formValue.category,
        status: formValue.status,
        featured: formValue.featured,
        order_index: formValue.order_index || 0,
        technologies: this.technologies,
        images: this.images
      };

      if (this.isEditMode && this.projectId) {
        await this.projectsService.updateProject(this.projectId, projectData);
      } else {
        await this.projectsService.createProject(projectData);
      }

      this.router.navigate(['/admin/projetos']);
    } catch (err: any) {
      this.errorMessage = err.message || 'Erro ao salvar projeto';
    } finally {
      this.saving = false;
    }
  }
}
