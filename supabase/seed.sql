-- Seed data for Waffert baskets
-- Run after schema.sql

INSERT INTO baskets (slug, name, tagline, risk_level, risk_score, time_horizon, conservative_return, base_return, optimistic_return, icon, is_halal) VALUES
  ('global-growth', 'Global Growth Basket', 'Long-term wealth through global equity exposure', 'growth', 4, '10+ years', 4.5, 7.5, 11.0, '🌍', false),
  ('conservative-eur', 'Conservative EUR Basket', 'Steady preservation in euros with modest growth', 'conservative', 2, '3–7 years', 1.5, 3.0, 4.5, '🛡️', false),
  ('usd-wealth-protection', 'USD Wealth Protection Basket', 'Preserve wealth in the world''s reserve currency', 'moderate', 3, '5–10 years', 3.0, 5.5, 8.0, '💵', false),
  ('halal-global', 'Halal Global Basket', 'Global growth, Shariah-compliant principles', 'balanced', 3, '7–15 years', 4.0, 6.5, 9.5, '☪️', true),
  ('child-education', 'Child Education Basket', 'Building your child''s educational future', 'balanced', 3, '5–18 years', 3.5, 5.5, 8.0, '🎓', false),
  ('retirement-builder', 'Retirement Builder Basket', 'Building the wealth for a comfortable retirement', 'growth', 4, '10–30 years', 4.5, 7.0, 10.0, '🌅', false),
  ('dividend-income', 'Dividend Income Basket', 'Regular income from global dividend-paying companies', 'moderate', 3, '5–15 years', 3.0, 5.0, 7.5, '💰', false),
  ('defensive-inflation', 'Defensive Inflation Protection Basket', 'Protect your wealth against the erosion of inflation', 'conservative', 2, '3–10 years', 2.0, 4.0, 6.5, '⚖️', false),
  ('emerging-market-diaspora', 'Emerging Market Diaspora Basket', 'Capture growth from your home region and beyond', 'aggressive', 5, '10–20 years', 4.0, 8.0, 14.0, '🌱', false)
ON CONFLICT (slug) DO NOTHING;
