import { supabase } from '../../lib/supabase';

export async function post({ request }) {
  try {
    const { commentId } = await request.json();
    
    if (!commentId) {
      return new Response(
        JSON.stringify({ success: false, message: 'Comment ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Lấy bình luận hiện tại
    const { data: comment, error: getError } = await supabase
      .from('comments')
      .select('likes')
      .eq('id', commentId)
      .single();
    
    if (getError) {
      return new Response(
        JSON.stringify({ success: false, message: getError.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Tăng số lượt thích
    const currentLikes = comment.likes || 0;
    const newLikes = currentLikes + 1;
    
    // Cập nhật bình luận
    const { error: updateError } = await supabase
      .from('comments')
      .update({ likes: newLikes })
      .eq('id', commentId);
    
    if (updateError) {
      return new Response(
        JSON.stringify({ success: false, message: updateError.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ success: true, likes: newLikes }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
