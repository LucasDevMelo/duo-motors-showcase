-- Adiciona role de admin para o usuário admin@duomotors.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('44e3b674-472d-4198-ae87-2c1f5d9f5729', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;