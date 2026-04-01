export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const projectUrl = formData.get('projectUrl') || '';
    const category = formData.get('category') || '기타'; // 카테고리 추가
    const file = formData.get('file');

    if (!file || !title || !description) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. R2에 이미지 저장
    const fileName = `${crypto.randomUUID()}-${file.name}`;
    await env.BUCKET.put(fileName, file.stream(), {
      httpMetadata: { contentType: file.type }
    });

    // 2. D1에 데이터 저장 (category 칸 추가)
    const id = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO portfolios (id, title, description, projectUrl, fileName, category) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(id, title, description, projectUrl, fileName, category).run();

    return Response.json({ success: true, id });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
