-- Adicionar roles de admin aos usuários existentes
INSERT INTO public.user_roles (user_id, role) 
VALUES 
  ('0a9a0ce8-40b4-47de-b71c-7407ccd603f8', 'admin'),
  ('f5633ca4-44ca-4cf5-8673-6bde3f46cab5', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;