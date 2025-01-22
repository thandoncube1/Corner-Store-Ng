// server.ts
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { join } from 'https://deno.land/std@0.224.0/path/mod.ts';

const ANGULAR_DIST_PATH = './dist/corner_store/browser';

async function handler(req: Request): Promise<Response> {
  const url: URL = new URL(req.url);
  let filepath: string = url.pathname;

  // Serve a get route to fetch Product Data
  if (filepath === '/api/v1/GetAllProducts') {
    try {
      const response = await fetch(
        'https://freeapi.miniprojectideas.com/api/amazon/GetAllProducts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Forward any authorization headers you may need
            ...req.headers,
          },
          // Forward the request body
          body: req.body,
        }
      );

      // The data response from products
      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch product results\n' + error }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }

  // Serve product by ID from Angular fetch
  if (filepath === '/api/v1/GetProductById') {
    const productId: string = url.searchParams.get('id') ?? '';
    if (!productId) {
      return new Response(JSON.stringify({
          error:'Product Id is required'
      }), {
          status: 400,
          headers: {
              "Content-Type": "application/json"
          }
      })
    }
    try {
      const response: Response = await fetch(
        `https://freeapi.miniprojectideas.com/api/amazon/GetProductById?id=${productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...req.headers,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Product not found.');
      }

      const data = await response.json();
      // Logging purposes
      console.log("Product ID:", data.data.productId);
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error:
            error instanceof Error ? error.message : 'Failed to fetch product',
        }),
        {
          status:
            error instanceof Error && error.message === 'Product not found.'
              ? 404
              : 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }

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
        'content-type': contentType,
      },
    });
  } catch {
    // If file not found, return index.html for client-side routing
    const indexPath = join(Deno.cwd(), ANGULAR_DIST_PATH, 'index.html');
    const indexContent = await Deno.readFile(indexPath);
    return new Response(indexContent, {
      headers: {
        'content-type': 'text/html',
      },
    });
  }
}

function getContentType(filepath: string): string {
  const ext = filepath.split('.').pop()?.toLowerCase();
  const contentTypes: Record<string, string> = {
    html: 'text/html',
    js: 'application/javascript',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    json: 'application/json',
  };
  return contentTypes[ext || ''] || 'application/octet-stream';
}

// Start server
const port: number = 4200;
console.log(`Server running on http://localhost:${port}`);
await serve(handler, { port });
