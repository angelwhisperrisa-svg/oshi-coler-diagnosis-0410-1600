export const config = { runtime: "edge" };

async function verifyLineSignature(rawBody, signature, channelSecret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(channelSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
  const digest = btoa(String.fromCharCode(...new Uint8Array(sigBuf)));
  return digest === signature;
}

export default async function handler(request) {
  if (request.method === "GET") {
    return new Response("ok", { status: 200 });
  }
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const secret = process.env.LINE_CHANNEL_SECRET;
  if (!secret) {
    return new Response("LINE_CHANNEL_SECRET not configured", { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-line-signature");
  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const valid = await verifyLineSignature(rawBody, signature, secret);
  if (!valid) {
    return new Response("Invalid signature", { status: 403 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
