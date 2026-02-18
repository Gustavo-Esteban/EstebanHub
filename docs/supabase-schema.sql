-- ============================================
-- EstebanHub - Database Schema
-- Supabase PostgreSQL Setup
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- PROJECTS TABLE
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  client_name VARCHAR(255),
  project_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  images JSONB DEFAULT '[]',
  technologies JSONB DEFAULT '[]',
  category VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'published',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TESTIMONIALS TABLE
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(255) NOT NULL,
  client_company VARCHAR(255),
  client_role VARCHAR(255),
  client_photo_url VARCHAR(500),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'published',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LEADS TABLE
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  message TEXT,
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  contacted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SERVICES TABLE
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description VARCHAR(500),
  description TEXT,
  icon VARCHAR(100),
  features JSONB DEFAULT '[]',
  pricing_info TEXT,
  thumbnail_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'published',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SETTINGS TABLE
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255),
  company_email VARCHAR(255),
  company_phone VARCHAR(50),
  company_whatsapp VARCHAR(50),
  company_address TEXT,
  company_logo_url VARCHAR(500),
  company_description TEXT,
  social_facebook VARCHAR(500),
  social_instagram VARCHAR(500),
  social_linkedin VARCHAR(500),
  social_github VARCHAR(500),
  social_twitter VARCHAR(500),
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  meta_keywords TEXT,
  google_analytics_id VARCHAR(100),
  email_notifications_enabled BOOLEAN DEFAULT true,
  notification_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (
  company_name,
  company_email,
  company_whatsapp,
  meta_title,
  meta_description
) VALUES (
  'EstebanHub',
  'contato@estebanhub.com',
  '5511999999999',
  'EstebanHub - Criação de Sites e Landing Pages',
  'Desenvolvimento de sites institucionais, e-commerce e landing pages com foco em conversão e performance.'
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_services_slug ON services(slug);

-- ============================================
-- TRIGGERS (Updated At)
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (site público pode ler dados publicados)

-- Projects: público pode ver apenas projetos publicados
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (status = 'published');

-- Testimonials: público pode ver apenas depoimentos publicados
CREATE POLICY "Public can view published testimonials"
  ON testimonials FOR SELECT
  USING (status = 'published');

-- Services: público pode ver apenas serviços publicados
CREATE POLICY "Public can view published services"
  ON services FOR SELECT
  USING (status = 'published');

-- Settings: público pode ler configurações
CREATE POLICY "Public can view settings"
  ON settings FOR SELECT
  USING (true);

-- Leads: público pode inserir leads (formulário de contato)
CREATE POLICY "Public can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- ADMIN POLICIES (apenas usuários autenticados têm acesso total)

-- Projects: admin pode fazer tudo
CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Testimonials: admin pode fazer tudo
CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Leads: admin pode ver e atualizar
CREATE POLICY "Authenticated users can manage leads"
  ON leads FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Services: admin pode fazer tudo
CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Settings: admin pode atualizar
CREATE POLICY "Authenticated users can update settings"
  ON settings FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
