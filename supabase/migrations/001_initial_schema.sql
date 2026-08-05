-- ============================================================
-- Merchandiser Platform — Initial Database Schema
-- Multi-tenant merchandising & retail execution system
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TENANT & AUTH
-- ============================================================

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#4CAF50',
  secondary_color TEXT DEFAULT '#F9A825',
  is_active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  full_name_ar TEXT,
  avatar_url TEXT,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('platform_admin', 'tenant_admin', 'supervisor', 'merchandiser', 'warehouse_staff', 'viewer')),
  permissions TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  preferred_locale TEXT DEFAULT 'ar' CHECK (preferred_locale IN ('en', 'ar')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- STORES & LOCATIONS
-- ============================================================

CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name TEXT NOT NULL,
  name_ar TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  region_id UUID REFERENCES regions(id),
  name TEXT NOT NULL,
  name_ar TEXT,
  chain TEXT,
  address TEXT,
  address_ar TEXT,
  city TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geofence_radius_m INTEGER DEFAULT 100,
  contact_name TEXT,
  contact_phone TEXT,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- PRODUCTS
-- ============================================================

CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name TEXT NOT NULL,
  name_ar TEXT,
  parent_id UUID REFERENCES product_categories(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  category_id UUID REFERENCES product_categories(id),
  name TEXT NOT NULL,
  name_ar TEXT,
  sku TEXT,
  barcode TEXT,
  image_url TEXT,
  unit TEXT DEFAULT 'piece',
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- VISITS & FIELD EXECUTION
-- ============================================================

CREATE TABLE visit_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name TEXT NOT NULL,
  name_ar TEXT,
  steps JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  merchandiser_id UUID NOT NULL REFERENCES profiles(id),
  template_id UUID REFERENCES visit_templates(id),
  supervisor_id UUID REFERENCES profiles(id),
  scheduled_date DATE NOT NULL,
  scheduled_time_start TIME,
  scheduled_time_end TIME,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('draft', 'scheduled', 'assigned', 'in_progress', 'completed', 'delayed', 'missed', 'cancelled')),
  check_in_at TIMESTAMPTZ,
  check_in_lat DOUBLE PRECISION,
  check_in_lng DOUBLE PRECISION,
  check_in_distance_m INTEGER,
  check_in_outside_geofence BOOLEAN DEFAULT false,
  check_in_reason TEXT,
  check_out_at TIMESTAMPTZ,
  check_out_lat DOUBLE PRECISION,
  check_out_lng DOUBLE PRECISION,
  steps_completed JSONB DEFAULT '[]',
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- PHOTOS & EVIDENCE
-- ============================================================

CREATE TABLE visit_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  visit_id UUID NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT DEFAULT 'general' CHECK (category IN ('before', 'after', 'shelf', 'display', 'issue', 'expiry', 'general')),
  caption TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  taken_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- EXPIRY TRACKING
-- ============================================================

CREATE TABLE expiry_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  visit_id UUID REFERENCES visits(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  product_id UUID NOT NULL REFERENCES products(id),
  merchandiser_id UUID NOT NULL REFERENCES profiles(id),
  batch_number TEXT,
  expiry_date DATE NOT NULL,
  quantity INTEGER DEFAULT 1,
  photo_url TEXT,
  status TEXT DEFAULT 'reported' CHECK (status IN ('reported', 'confirmed', 'removed', 'returned')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- RETURNS
-- ============================================================

CREATE TABLE returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  merchandiser_id UUID NOT NULL REFERENCES profiles(id),
  supervisor_id UUID REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected', 'awaiting_pickup', 'collected', 'warehouse_received', 'resolved')),
  reason TEXT NOT NULL CHECK (reason IN ('expired', 'damaged', 'recalled', 'overstock', 'other')),
  notes TEXT,
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  collected_at TIMESTAMPTZ,
  warehouse_received_at TIMESTAMPTZ,
  warehouse_received_by UUID REFERENCES profiles(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE return_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_id UUID NOT NULL REFERENCES returns(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  batch_number TEXT,
  expiry_date DATE,
  photo_url TEXT,
  condition TEXT DEFAULT 'expired' CHECK (condition IN ('expired', 'damaged', 'good')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ISSUES & QUALITY
-- ============================================================

CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  visit_id UUID REFERENCES visits(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  reported_by UUID NOT NULL REFERENCES profiles(id),
  assigned_to UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('out_of_stock', 'display', 'pricing', 'damage', 'competitor', 'staff', 'equipment', 'other')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed', 'escalated')),
  photo_url TEXT,
  resolution TEXT,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- CAMPAIGNS
-- ============================================================

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name TEXT NOT NULL,
  name_ar TEXT,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
  target_stores UUID[] DEFAULT '{}',
  target_products UUID[] DEFAULT '{}',
  checklist JSONB DEFAULT '[]',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- NOTIFICATIONS & AUDIT
-- ============================================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  title TEXT NOT NULL,
  title_ar TEXT,
  body TEXT,
  body_ar TEXT,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error', 'assignment', 'approval')),
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_profiles_tenant ON profiles(tenant_id);
CREATE INDEX idx_profiles_role ON profiles(tenant_id, role);
CREATE INDEX idx_stores_tenant ON stores(tenant_id);
CREATE INDEX idx_stores_region ON stores(tenant_id, region_id);
CREATE INDEX idx_products_tenant ON products(tenant_id);
CREATE INDEX idx_products_category ON products(tenant_id, category_id);
CREATE INDEX idx_visits_tenant ON visits(tenant_id);
CREATE INDEX idx_visits_store ON visits(tenant_id, store_id);
CREATE INDEX idx_visits_merchandiser ON visits(tenant_id, merchandiser_id);
CREATE INDEX idx_visits_date ON visits(tenant_id, scheduled_date);
CREATE INDEX idx_visits_status ON visits(tenant_id, status);
CREATE INDEX idx_visit_photos_visit ON visit_photos(visit_id);
CREATE INDEX idx_expiry_tenant ON expiry_records(tenant_id);
CREATE INDEX idx_expiry_date ON expiry_records(tenant_id, expiry_date);
CREATE INDEX idx_returns_tenant ON returns(tenant_id);
CREATE INDEX idx_returns_status ON returns(tenant_id, status);
CREATE INDEX idx_issues_tenant ON issues(tenant_id);
CREATE INDEX idx_issues_status ON issues(tenant_id, status);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_audit_tenant ON audit_log(tenant_id);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE expiry_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE return_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Helper function: get current user's tenant_id
CREATE OR REPLACE FUNCTION public.get_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM profiles WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function: get current user's role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Tenant policies: platform_admin sees all, others see own tenant
CREATE POLICY "Platform admins see all tenants" ON tenants
  FOR SELECT TO authenticated
  USING (public.get_user_role() = 'platform_admin');

CREATE POLICY "Users see own tenant" ON tenants
  FOR SELECT TO authenticated
  USING (id = public.get_tenant_id());

-- Profiles: users see profiles in same tenant
CREATE POLICY "Users see own tenant profiles" ON profiles
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_tenant_id() OR public.get_user_role() = 'platform_admin');

CREATE POLICY "Users update own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- Generic tenant isolation policy for all data tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'regions', 'stores', 'product_categories', 'products',
    'visit_templates', 'visits', 'visit_photos', 'expiry_records',
    'returns', 'issues', 'campaigns',
    'notifications', 'audit_log'
  ])
  LOOP
    -- SELECT: tenant isolation
    EXECUTE format(
      'CREATE POLICY "Tenant isolation select" ON %I FOR SELECT TO authenticated USING (tenant_id = public.get_tenant_id() OR public.get_user_role() = ''platform_admin'')',
      tbl
    );
    -- INSERT: must match own tenant
    EXECUTE format(
      'CREATE POLICY "Tenant isolation insert" ON %I FOR INSERT TO authenticated WITH CHECK (tenant_id = public.get_tenant_id())',
      tbl
    );
    -- UPDATE: tenant isolation
    EXECUTE format(
      'CREATE POLICY "Tenant isolation update" ON %I FOR UPDATE TO authenticated USING (tenant_id = public.get_tenant_id())',
      tbl
    );
  END LOOP;
END $$;

-- return_items doesn't have tenant_id directly, use join
DROP POLICY IF EXISTS "Tenant isolation select" ON return_items;
DROP POLICY IF EXISTS "Tenant isolation insert" ON return_items;
DROP POLICY IF EXISTS "Tenant isolation update" ON return_items;

CREATE POLICY "Return items via return" ON return_items
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM returns WHERE returns.id = return_items.return_id AND returns.tenant_id = public.get_tenant_id()
  ));

-- Notifications: users only see their own
DROP POLICY IF EXISTS "Tenant isolation select" ON notifications;
CREATE POLICY "Users see own notifications" ON notifications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users update own notifications" ON notifications
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'tenants', 'profiles', 'stores', 'products',
    'visits', 'expiry_records', 'returns', 'issues', 'campaigns'
  ])
  LOOP
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
      tbl
    );
  END LOOP;
END $$;
