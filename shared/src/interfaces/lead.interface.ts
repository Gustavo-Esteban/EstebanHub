export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: 'contact-form' | 'whatsapp' | 'landing-page';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
  notes?: string;
  contacted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLeadDto {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: 'contact-form' | 'whatsapp' | 'landing-page';
}

export interface UpdateLeadDto {
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
  notes?: string;
  contacted_at?: string;
}
