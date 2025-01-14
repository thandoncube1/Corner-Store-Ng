// server.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

const ANGULAR_DIST_PATH = "./dist/corner_store/browser";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  let filepath = url.pathname;

  // Serve static files from Angular dist
  if (filepath === '/') {
    filepath = '/index.html';
  }

  try {
    const absolutePath = join(Deno.cwd(), ANGULAR_DIST_PATH, filepath);
    const content = await Deno.readFile(absolutePath);

    // Set appropriate content type
    const contentType = getContentType(filepath);
    return new Response(content, {
      headers: {
        "content-type": contentType,
      },
    });
  } catch {
    // If file not found, return index.html for client-side routing
    const indexPath = join(Deno.cwd(), ANGULAR_DIST_PATH, 'index.html');
    const indexContent = await Deno.readFile(indexPath);
    return new Response(indexContent, {
      headers: {
        "content-type": "text/html",
      },
    });
  }
}

function getContentType(filepath: string): string {
  const ext = filepath.split('.').pop()?.toLowerCase();
  const contentTypes: Record<string, string> = {
    'html': 'text/html',
    'js': 'application/javascript',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'json': 'application/json'
  };
  return contentTypes[ext || ''] || 'application/octet-stream';
}

// Start server
const port = 4200;
console.log(`Server running on http://localhost:${port}`);
await serve(handler, { port });