-- Tạo bảng contacts để lưu thông tin liên hệ
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index cho tìm kiếm
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts (email);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts (created_at);
