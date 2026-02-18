export interface Testimonial {
  id: string;
  client_name: string;
  client_company?: string;
  client_role?: string;
  client_photo_url?: string;
  content: string;
  rating?: number;
  project_id?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTestimonialDto {
  client_name: string;
  client_company?: string;
  client_role?: string;
  client_photo_url?: string;
  content: string;
  rating?: number;
  project_id?: string;
  featured?: boolean;
  status?: 'draft' | 'published' | 'archived';
  order_index?: number;
}

export interface UpdateTestimonialDto extends Partial<CreateTestimonialDto> {}
