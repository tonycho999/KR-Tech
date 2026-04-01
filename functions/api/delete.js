export async function onRequestDelete(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return Response.json({ error: 'Missing project ID' }, { status: 400 });
    }

    // 1. 삭제할 프로젝트에 연관된 이미지 파일명들 가져오기
    const { results: images } = await env.DB.prepare(
      "SELECT fileName FROM project_images WHERE portfolioId = ?"
    ).bind(id).all();

    // 2. R2에서 모든 관련 이미지 삭제
    const deletePromises = images.map(img => env.BUCKET.delete(img.fileName));
    await Promise.all(deletePromises);

    // 3. D1에서 프로젝트 삭제 (ON DELETE CASCADE 설정으로 project_images 데이터도 자동 삭제됨)
    await env.DB.prepare("DELETE FROM portfolios WHERE id = ?").bind(id).run();

    return Response.json({ success: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
