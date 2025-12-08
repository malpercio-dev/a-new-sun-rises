const HOMESERVER_URL = "https://chat.anewsunrises.com";
const IDENTITY_SERVER_URL = "https://chat-auth.anewsunrises.com";
const FEDERATION_SERVER = "chat.anewsunrises.com:443";

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    switch (path) {
      case "/.well-known/matrix/client":
        return new Response(
          `{"m.homeserver": {"base_url": "${HOMESERVER_URL}"},"m.identity_server": {"base_url": "${IDENTITY_SERVER_URL}"}}`,
        );
      case "/.well-known/matrix/server":
        return new Response(`{"m.server": "${FEDERATION_SERVER}"}`);
      default:
        return new Response("Invalid request");
    }
  },
};
