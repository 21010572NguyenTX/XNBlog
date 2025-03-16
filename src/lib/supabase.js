import { createClient } from '@supabase/supabase-js';

// Lấy biến môi trường từ .env với prefix VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Kiểm tra xem biến môi trường có tồn tại không
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Thiếu biến môi trường Supabase. Vui lòng kiểm tra file .env');
}

// Tạo client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Hàm tiện ích để lấy dữ liệu từ bảng
export async function fetchData(table, options = {}) {
  try {
    let query = supabase.from(table).select('*');
    
    // Thêm các tùy chọn nếu có
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending });
    }
    
    if (options.filters) {
      options.filters.forEach(filter => {
        query = query.filter(filter.column, filter.operator, filter.value);
      });
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Lỗi khi lấy dữ liệu từ Supabase:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Lỗi khi kết nối đến Supabase:', error);
    return null;
  }
}

// Hàm tiện ích để thêm dữ liệu vào bảng
export async function insertData(table, data) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select();
    
    if (error) {
      console.error('Lỗi khi thêm dữ liệu vào Supabase:', error);
      return { success: false, error };
    }
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Lỗi khi kết nối đến Supabase:', error);
    return { success: false, error };
  }
}

// Hàm tiện ích để cập nhật dữ liệu trong bảng
export async function updateData(table, id, data) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Lỗi khi cập nhật dữ liệu trong Supabase:', error);
      return { success: false, error };
    }
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Lỗi khi kết nối đến Supabase:', error);
    return { success: false, error };
  }
}

// Hàm tiện ích để xóa dữ liệu từ bảng
export async function deleteData(table, id) {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Lỗi khi xóa dữ liệu từ Supabase:', error);
      return { success: false, error };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Lỗi khi kết nối đến Supabase:', error);
    return { success: false, error };
  }
}

// Hàm tiện ích để tìm kiếm dữ liệu
export async function searchData(table, column, query) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('status', 'published')
      .ilike(column, `%${query}%`);
    
    if (error) {
      console.error('Lỗi khi tìm kiếm dữ liệu trong Supabase:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Lỗi khi kết nối đến Supabase:', error);
    return null;
  }
}
