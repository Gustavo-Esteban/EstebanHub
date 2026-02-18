-- ============================================
-- EstebanHub - Storage Configuration
-- Supabase Storage Buckets and Policies
-- ============================================

-- IMPORTANTE: Execute este script no SQL Editor do Supabase
-- após executar o supabase-schema.sql

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Criar bucket para imagens de projetos
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Criar bucket para fotos de clientes (depoimentos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-photos', 'client-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Criar bucket para logos e assets gerais
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- LEITURA PÚBLICA (qualquer pessoa pode ver as imagens)

-- Policy: Public can view project images
CREATE POLICY "Public can view project images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

-- Policy: Public can view client photos
CREATE POLICY "Public can view client photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'client-photos');

-- Policy: Public can view assets
CREATE POLICY "Public can view assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'assets');

-- UPLOAD (apenas usuários autenticados)

-- Policy: Authenticated users can upload project images
CREATE POLICY "Authenticated users can upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );

-- Policy: Authenticated users can upload client photos
CREATE POLICY "Authenticated users can upload client photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'client-photos' AND
    auth.role() = 'authenticated'
  );

-- Policy: Authenticated users can upload assets
CREATE POLICY "Authenticated users can upload assets"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'assets' AND
    auth.role() = 'authenticated'
  );

-- DELETE (apenas usuários autenticados)

-- Policy: Authenticated users can delete project images
CREATE POLICY "Authenticated users can delete project images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );

-- Policy: Authenticated users can delete client photos
CREATE POLICY "Authenticated users can delete client photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'client-photos' AND
    auth.role() = 'authenticated'
  );

-- Policy: Authenticated users can delete assets
CREATE POLICY "Authenticated users can delete assets"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'assets' AND
    auth.role() = 'authenticated'
  );

-- UPDATE (apenas usuários autenticados)

-- Policy: Authenticated users can update project images
CREATE POLICY "Authenticated users can update project images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'project-images' AND
    auth.role() = 'authenticated'
  );

-- Policy: Authenticated users can update client photos
CREATE POLICY "Authenticated users can update client photos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'client-photos' AND
    auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'client-photos' AND
    auth.role() = 'authenticated'
  );

-- Policy: Authenticated users can update assets
CREATE POLICY "Authenticated users can update assets"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'assets' AND
    auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'assets' AND
    auth.role() = 'authenticated'
  );
