export async function onRequestDelete(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const fileName = url.searchParams.get('fileName');

    if (!id || !fileName) {
      return Response.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // 1. R2에서 이미지 삭제
    await env.BUCKET.delete(fileName);

    // 2. D1에서 데이터 삭제
    await env.DB.prepare("DELETE FROM portfolios WHERE id = ?").bind(id).run();

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
