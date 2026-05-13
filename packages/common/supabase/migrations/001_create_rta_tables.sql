-- 材质库
CREATE TABLE IF NOT EXISTS rta_materials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  texture_url TEXT,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  thickness INTEGER NOT NULL DEFAULT 18,
  amoeba_coefficient NUMERIC NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 五金件库
CREATE TABLE IF NOT EXISTS rta_hardware (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hinge', 'handle', 'slide', 'connector', 'shelf_pin')),
  unit_price NUMERIC NOT NULL DEFAULT 0,
  default_quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 柜体模型资产
CREATE TABLE IF NOT EXISTS rta_cabinet_models (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  model_url TEXT NOT NULL,
  preview_url TEXT,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOM 记录（与订单关联）
CREATE TABLE IF NOT EXISTS rta_bom_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL,
  line_item_id TEXT,
  bom_json JSONB NOT NULL DEFAULT '[]',
  erp_order_id TEXT,
  erp_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 空间生成任务记录
CREATE TABLE IF NOT EXISTS rta_space_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL,
  prompt_id TEXT,
  comfyui_status TEXT DEFAULT 'pending',
  result_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Amoeba 核算记录
CREATE TABLE IF NOT EXISTS rta_amoeba_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL,
  revenue NUMERIC NOT NULL DEFAULT 0,
  material_direct_cost NUMERIC NOT NULL DEFAULT 0,
  labor_cost NUMERIC NOT NULL DEFAULT 0,
  amoeba_coefficient NUMERIC NOT NULL DEFAULT 1,
  estimated_profit NUMERIC NOT NULL DEFAULT 0,
  profit_margin NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 触发器：自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'rta_materials_updated_at') THEN
    CREATE TRIGGER rta_materials_updated_at BEFORE UPDATE ON rta_materials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'rta_hardware_updated_at') THEN
    CREATE TRIGGER rta_hardware_updated_at BEFORE UPDATE ON rta_hardware
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'rta_bom_records_updated_at') THEN
    CREATE TRIGGER rta_bom_records_updated_at BEFORE UPDATE ON rta_bom_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'rta_space_generation_jobs_updated_at') THEN
    CREATE TRIGGER rta_space_generation_jobs_updated_at BEFORE UPDATE ON rta_space_generation_jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'rta_amoeba_calculations_updated_at') THEN
    CREATE TRIGGER rta_amoeba_calculations_updated_at BEFORE UPDATE ON rta_amoeba_calculations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
