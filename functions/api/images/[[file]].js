export async function onRequestGet(context) {
  const { env, params } = context;
  const fileName = params.file[0];
  
  const object = await env.BUCKET.get(fileName);
  if (!object) return new Response('Not found', { status: 404 });
  
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  
  return new Response(object.body, { headers });
}
