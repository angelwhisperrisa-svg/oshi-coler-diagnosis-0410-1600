const VALID_TYPES = ["mint", "rose", "lavender", "ivory", "skyblue"];

const TYPE_LABEL = {
  mint: "🌿ミント",
  rose: "🌹ローズ",
  lavender: "🪻ラベンダー",
  ivory: "☀️アイボリー",
  skyblue: "🩵スカイブルー"
};

/** サーバー側の鑑定コピー（push-result と揃える） */
const PUSH_BODY = {
  mint: `【ミントグリーン】
あなたは、人を支えることが自然にできる人です。周りを優先しすぎていないか、一度立ち止まってみてください。
・自分の時間を少しだけ優先する
・無理に合わせるのをやめる
本来のあなたは、もっと自然体でいられる人です。`,
  rose: `【ローズピンク】
あなたは、感情豊かに愛せる人です。気持ちが強くなりすぎていないか、自分の内側も見てあげてください。
・相手ではなく、自分の気持ちを見てみる
・少しだけ距離を取る
本来のあなたは、愛を受け取りながら与えられる人です。`,
  lavender: `【ラベンダー】
あなたは、とても感性が豊かな人です。内側に寄りすぎていないか、少し外に出してみてください。
・感じたことを少し言葉にする
・小さく外に出してみる
本来のあなたは、感性を現実に活かせる人です。`,
  ivory: `【アイボリー】
あなたは、安定した判断ができる人です。感情を抑えすぎていないか、優しく向き合ってみてください。
・自分の気持ちを少し言葉にする
・楽しいと感じることを選ぶ
本来のあなたは、安定と感情の両方を持てる人です。`,
  skyblue: `【スカイブルー】
あなたは、自由に動ける人です。流れに任せすぎていないか、一つ決めてみてください。
・1つだけ続けることを決める
・少しだけ深く向き合う
本来のあなたは、自由と継続を両方持てる人です。`
};

const MAX_TEXT = 4800;

function splitLineMessages(text) {
  const t = text.trim();
  if (t.length <= MAX_TEXT) return [{ type: "text", text: t }];
  const parts = [];
  let rest = t;
  while (rest.length > 0) {
    parts.push(rest.slice(0, MAX_TEXT));
    rest = rest.slice(MAX_TEXT);
  }
  return parts.map((body) => ({ type: "text", text: body }));
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!channelAccessToken) {
    res.status(500).json({ error: "Server missing LINE_CHANNEL_ACCESS_TOKEN" });
    return;
  }

  let payload = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload || "{}");
    } catch {
      res.status(400).json({ error: "Invalid JSON body" });
      return;
    }
  }

  const { userId, resultKey } = payload || {};
  if (!userId || typeof userId !== "string" || !VALID_TYPES.includes(resultKey)) {
    res.status(400).json({ error: "Invalid userId or resultKey" });
    return;
  }

  const siteBase = (process.env.PUBLIC_SITE_URL || "https://shima-brand.vercel.app").replace(/\/$/, "");
  const fullUrl = `${siteBase}/result?type=${encodeURIComponent(resultKey)}&mode=full`;
  const label = TYPE_LABEL[resultKey] || resultKey;
  const serverBody = PUSH_BODY[resultKey] || "";

  const block1 = `【推し色診断・結果】\nあなたの推し色は「${label}」タイプです。\n\n${serverBody}\n\nこのメッセージで診断は完了です。続きはLINEのリッチメニューからご利用ください。\n\n▼フル鑑定ページ\n${fullUrl}`;
  const messages = splitLineMessages(block1);

  const pushRes = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${channelAccessToken}`
    },
    body: JSON.stringify({ to: userId, messages })
  });

  if (!pushRes.ok) {
    const detail = await pushRes.text();
    console.error("[save-result] LINE push failed", pushRes.status, detail);
    res.status(502).json({
      error: "LINE Messaging API push failed",
      status: pushRes.status,
      detail: detail.slice(0, 500)
    });
    return;
  }

  res.status(200).json({ ok: true, resultKey });
};
