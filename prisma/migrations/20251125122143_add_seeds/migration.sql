-- Seed Categories
INSERT INTO "Category" ("id", "name")
VALUES
  (gen_random_uuid(), 'Leadership'),
  (gen_random_uuid(), 'Productivity'),
  (gen_random_uuid(), 'Communication'),
  (gen_random_uuid(), 'Creativity'),
  (gen_random_uuid(), 'Wellness')
ON CONFLICT ("name") DO NOTHING;

-- Seed Languages
INSERT INTO "Language" ("id", "code", "name")
VALUES
  (gen_random_uuid(), 'en', 'English'),
  (gen_random_uuid(), 'es', 'Spanish'),
  (gen_random_uuid(), 'fr', 'French'),
  (gen_random_uuid(), 'it', 'Italian')
ON CONFLICT ("code") DO NOTHING;

-- Seed Providers
INSERT INTO "Provider" ("id", "name")
VALUES
  (gen_random_uuid(), 'Linkedin'),
  (gen_random_uuid(), 'Mentor'),
  (gen_random_uuid(), 'Pack'),
  (gen_random_uuid(), 'Skilla')
ON CONFLICT ("name") DO NOTHING;

-- Seed Roles
INSERT INTO "Role" ("id", "name")
VALUES
  (gen_random_uuid(), 'Mentor/Coach'),
  (gen_random_uuid(), 'Mentee/Coachee')
ON CONFLICT ("name") DO NOTHING;
