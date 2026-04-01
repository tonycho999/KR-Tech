export async function onRequestGet(context) {
  const { env } = context;
  try {
    // 1. 모든 포트폴리오 가져오기
    const { results: projects } = await env.DB.prepare(
      "SELECT * FROM portfolios ORDER BY createdAt DESC"
    ).all();

    // 2. 각 프로젝트별 이미지 목록 가져와서 합치기
    const projectsWithImages = await Promise.all(projects.map(async (project) => {
      const { results: images } = await env.DB.prepare(
        "SELECT fileName FROM project_images WHERE portfolioId = ? ORDER BY sequence ASC"
      ).bind(project.id).all();
      
      return {
        ...project,
        // 파일명만 추출해서 배열로 만듦
        imageNames: images.map(img => img.fileName) 
      };
    }));

    return Response.json(projectsWithImages);
  } catch (e) {
    console.error(e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
