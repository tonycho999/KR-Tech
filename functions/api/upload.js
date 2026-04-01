export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const projectUrl = formData.get('projectUrl') || '';
    const category = formData.get('category') || 'Others';
    
    // 🚨 여러 이미지 파일 가져오기 (name="files"로 보낼 예정)
    const files = formData.getAll('files'); 

    if (!title || !description || files.length === 0) {
      return Response.json({ error: 'Missing required fields or images' }, { status: 400 });
    }

    // 🚨 최대 4장 제한 체크
    if (files.length > 4) {
      return Response.json({ error: 'Maximum 4 images allowed per project.' }, { status: 400 });
    }

    // 1. D1에 메인 데이터 먼저 저장 (ID 생성)
    const projectId = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO portfolios (id, category, title, description, projectUrl) VALUES (?, ?, ?, ?, ?)"
    ).bind(projectId, category, title, description, projectUrl).run();

    // 2. 여러 이미지 업로드 및 DB 저장 처리
    const uploadPromises = files.map(async (file, index) => {
      // R2에 저장 (고유파일명 생성)
      const fileName = `${crypto.randomUUID()}-${file.name}`;
      await env.BUCKET.put(fileName, file.stream(), {
        httpMetadata: { contentType: file.type }
      });

      // project_images 테이블에 정보 저장
      const imageId = crypto.randomUUID();
      return env.DB.prepare(
        "INSERT INTO project_images (id, portfolioId, fileName, sequence) VALUES (?, ?, ?, ?)"
      ).bind(imageId, projectId, fileName, index).run();
    });

    // 모든 업로드 작업이 완료될 때까지 대기
    await Promise.all(uploadPromises);

    return Response.json({ success: true, id: projectId });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
