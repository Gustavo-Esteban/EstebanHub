export interface Settings {
  id: string;
  company_name?: string;
  company_email?: string;
  company_phone?: string;
  company_whatsapp?: string;
  company_address?: string;
  company_logo_url?: string;
  company_description?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_linkedin?: string;
  social_github?: string;
  social_twitter?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  google_analytics_id?: string;
  email_notifications_enabled: boolean;
  notification_email?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateSettingsDto {
  company_name?: string;
  company_email?: string;
  company_phone?: string;
  company_whatsapp?: string;
  company_address?: string;
  company_logo_url?: string;
  company_description?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_linkedin?: string;
  social_github?: string;
  social_twitter?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  google_analytics_id?: string;
  email_notifications_enabled?: boolean;
  notification_email?: string;
}
