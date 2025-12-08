const HOMESERVER_URL = "https://chat.anewsunrises.com";
const IDENTITY_SERVER_URL = "https://chat-auth.anewsunrises.com";
const FEDERATION_SERVER = "chat.anewsunrises.com:443";

// Respond to OPTIONS method
export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Max-Age": "86400",
    },
  });
};

// Set CORS to all /api responses
export const onRequest = async (context) => {
  const response = await context.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Max-Age", "86400");
  return response;
};

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    let response;
    switch (path) {
      case "/.well-known/matrix/client":
        response = new Response(
          `{"m.homeserver": {"base_url": "${HOMESERVER_URL}"},"m.identity_server": {"base_url": "${IDENTITY_SERVER_URL}"}}`,
        );
        break;
      case "/.well-known/matrix/server":
        response = new Response(`{"m.server": "${FEDERATION_SERVER}"}`);
        break;
      default:
        response = new Response("Invalid request");
        break;
    }
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Max-Age", "86400");
    return response;
  },
};
