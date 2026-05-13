-- 创建 textures bucket（公开读取）
INSERT INTO storage.buckets (id, name, public)
VALUES ('textures', 'textures', true)
ON CONFLICT (id) DO NOTHING;

-- 创建 models bucket（公开读取）
INSERT INTO storage.buckets (id, name, public)
VALUES ('models', 'models', true)
ON CONFLICT (id) DO NOTHING;

-- 允许匿名用户读取 textures
CREATE POLICY IF NOT EXISTS "Allow public read textures"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'textures');

-- 允许认证用户上传 textures
CREATE POLICY IF NOT EXISTS "Allow authenticated upload textures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'textures');

-- 允许匿名用户读取 models
CREATE POLICY IF NOT EXISTS "Allow public read models"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'models');

-- 允许认证用户上传 models
CREATE POLICY IF NOT EXISTS "Allow authenticated upload models"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'models');
