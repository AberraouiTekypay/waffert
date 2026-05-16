-- Waffert Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- WAITLIST ENTRIES
-- ============================================================
CREATE TABLE IF NOT EXISTS waitlist_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  currency TEXT,
  monthly_amount TEXT,
  is_halal BOOLEAN DEFAULT FALSE,
  interested_in TEXT[] DEFAULT '{}',
  source TEXT DEFAULT 'website',
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_waitlist_country ON waitlist_entries (country);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_entries (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_is_halal ON waitlist_entries (is_halal);

-- ============================================================
-- QUIZ RESPONSES
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id TEXT,
  -- Quiz answers
  country TEXT,
  currency TEXT,
  target_currency TEXT,
  monthly_amount INTEGER,
  lump_sum INTEGER,
  time_horizon INTEGER,
  risk_tolerance TEXT,
  goal TEXT,
  is_halal BOOLEAN DEFAULT FALSE,
  wants_diaspora BOOLEAN DEFAULT FALSE,
  needs_guidance BOOLEAN DEFAULT FALSE,
  -- Computed
  risk_score INTEGER,
  risk_label TEXT,
  primary_basket TEXT,
  alternative_baskets TEXT[],
  -- Lead info (if provided after quiz)
  email TEXT,
  name TEXT
);

CREATE INDEX IF NOT EXISTS idx_quiz_country ON quiz_responses (country);
CREATE INDEX IF NOT EXISTS idx_quiz_primary_basket ON quiz_responses (primary_basket);
CREATE INDEX IF NOT EXISTS idx_quiz_is_halal ON quiz_responses (is_halal);
CREATE INDEX IF NOT EXISTS idx_quiz_created_at ON quiz_responses (created_at);

-- ============================================================
-- CONSULTATION REQUESTS
-- ============================================================
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  monthly_amount TEXT,
  preferred_time TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
  assigned_to TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_consultation_status ON consultation_requests (status);
CREATE INDEX IF NOT EXISTS idx_consultation_email ON consultation_requests (email);

-- ============================================================
-- BASKETS (reference data)
-- ============================================================
CREATE TABLE IF NOT EXISTS baskets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  risk_level TEXT NOT NULL,
  risk_score INTEGER,
  time_horizon TEXT,
  target_user TEXT,
  goal TEXT,
  conservative_return DECIMAL(5,2),
  base_return DECIMAL(5,2),
  optimistic_return DECIMAL(5,2),
  icon TEXT,
  is_halal BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- BASKET ALLOCATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS basket_allocations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  basket_id UUID REFERENCES baskets(id),
  asset_class TEXT NOT NULL,
  range_min INTEGER NOT NULL,
  range_max INTEGER NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0
);

-- ============================================================
-- COMPLIANCE CONSENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS compliance_consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id TEXT,
  email TEXT,
  consent_type TEXT NOT NULL, -- 'quiz_educational', 'waitlist_marketing', 'consultation_disclaimer'
  ip_address TEXT,
  user_agent TEXT,
  consented BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================================================
-- ANALYTICS SNAPSHOTS (daily aggregations)
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  snapshot_date DATE NOT NULL UNIQUE,
  quiz_starts INTEGER DEFAULT 0,
  quiz_completions INTEGER DEFAULT 0,
  waitlist_signups INTEGER DEFAULT 0,
  consultation_requests INTEGER DEFAULT 0,
  top_countries JSONB DEFAULT '{}',
  top_baskets JSONB DEFAULT '{}',
  halal_percentage DECIMAL(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details JSONB,
  ip_address TEXT
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Waitlist: anyone can insert, only service role can read
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts on waitlist" ON waitlist_entries FOR INSERT WITH CHECK (true);

-- Quiz responses: anyone can insert
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts on quiz_responses" ON quiz_responses FOR INSERT WITH CHECK (true);

-- Consultation requests: anyone can insert
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts on consultation_requests" ON consultation_requests FOR INSERT WITH CHECK (true);

-- Baskets: public read
ALTER TABLE baskets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public reads on baskets" ON baskets FOR SELECT USING (true);

-- Basket allocations: public read
ALTER TABLE basket_allocations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public reads on basket_allocations" ON basket_allocations FOR SELECT USING (true);

-- Compliance consents: anyone can insert
ALTER TABLE compliance_consents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts on compliance_consents" ON compliance_consents FOR INSERT WITH CHECK (true);
