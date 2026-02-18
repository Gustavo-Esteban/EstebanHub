export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  icon?: string;
  features?: string[];
  pricing_info?: string;
  thumbnail_url?: string;
  status: 'draft' | 'published' | 'archived';
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CreateServiceDto {
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  icon?: string;
  features?: string[];
  pricing_info?: string;
  thumbnail_url?: string;
  status?: 'draft' | 'published' | 'archived';
  order_index?: number;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> {}
