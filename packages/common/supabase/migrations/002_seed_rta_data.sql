INSERT INTO rta_materials (id, name, texture_url, unit_price, thickness, amoeba_coefficient)
VALUES
  ('mat-001', 'E0级实木颗粒板-白橡', '/textures/white-oak.jpg', 180, 18, 1.15),
  ('mat-002', 'E0级实木颗粒板-胡桃', '/textures/walnut.jpg', 220, 18, 1.18),
  ('mat-003', 'E1级多层实木板-灰布纹', '/textures/grey-fabric.jpg', 260, 18, 1.22),
  ('mat-004', '进口PET肤感板-轻奢灰', '/textures/pet-grey.jpg', 380, 18, 1.30),
  ('mat-005', '9mm背板-白橡', '/textures/back-white-oak.jpg', 95, 9, 1.10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO rta_hardware (id, name, type, unit_price, default_quantity)
VALUES
  ('hw-001', '百隆快装铰链-直臂', 'hinge', 12.5, 2),
  ('hw-002', '百隆快装铰链-中臂', 'hinge', 13.2, 2),
  ('hw-003', '铝合金拉手-128mm', 'handle', 18.0, 1),
  ('hw-004', '三节静音滑轨-450mm', 'slide', 35.0, 2),
  ('hw-005', '三合一连接件', 'connector', 1.2, 8),
  ('hw-006', '层板托', 'shelf_pin', 0.8, 4)
ON CONFLICT (id) DO NOTHING;
