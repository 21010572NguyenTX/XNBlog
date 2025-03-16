const { createClient } = require('@supabase/supabase-js');

// Lấy biến môi trường từ Netlify
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// Tạo client Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.handler = async (event, context) => {
  try {
    // Xử lý các yêu cầu API
    const path = event.path.replace('/.netlify/functions/api', '');
    
    // Ví dụ: xử lý yêu cầu lấy bài viết
    if (path === '/posts' && event.httpMethod === 'GET') {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    }
    
    // Xử lý các yêu cầu khác
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not Found' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
