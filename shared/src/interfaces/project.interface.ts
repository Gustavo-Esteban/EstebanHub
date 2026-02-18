export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  client_name?: string;
  project_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  category?: 'institutional' | 'ecommerce' | 'landing-page';
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectDto {
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  client_name?: string;
  project_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  category?: 'institutional' | 'ecommerce' | 'landing-page';
  featured?: boolean;
  status?: 'draft' | 'published' | 'archived';
  order_index?: number;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}
