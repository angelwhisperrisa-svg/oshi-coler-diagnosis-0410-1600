const CHANNEL_ACCESS_TOKEN = (process.env.LINE_CHANNEL_ACCESS_TOKEN || "").trim();

const COLOR_MESSAGES = {
  mint: `🌿 あなたの推し色は「ミントグリーン」

人を支えることが、あなたにとって自然なこと。
それはとても美しい才能です。

ただ今は——
少し周りを優先しすぎているかもしれません。

もしそうなら、こっそり試してみて🌿

・自分の時間を少しだけ優先する
・無理に合わせるのをやめる

それだけで、あなたの心はふっと軽くなるはずです。

─────────────────
🌿 本来のあなたは
もっと自然体でいられる人です。

でも今は、少し「整えすぎている」状態かもしれません。

─────────────────
この先では…

✦ 本来のあなたの状態
✦ ズレの理由
✦ 整え方

をもう少し深くお伝えします。

「あなたの本当の状態を、推し色で知りたい」🌿

─────────────────
🛍️ さらに詳しい鑑定はこちら
https://kaorinkobo.base.shop`,

  rose: `🌹 あなたの推し色は「ローズピンク」

感情豊かに愛せる人——
それがあなたの本質です。

ただ今は——
少し気持ちが強くなりすぎているかもしれません。

もしそうなら、こっそり試してみて🌹

・相手ではなく、自分の気持ちを見てみる
・少しだけ距離を取る

それだけで、気持ちはふっと落ち着いていきます。

─────────────────
🌹 本来のあなたは
愛を受け取りながら与えられる人です。

でも今は、少し「与える側」に偏っている状態かもしれません。

─────────────────
この先では…

✦ 本来のあなたの状態
✦ 感情のズレの理由
✦ 整え方

をもう少し深くお伝えします。

「あなたの本当の状態を、推し色で知りたい」🌹

─────────────────
🛍️ さらに詳しい鑑定はこちら
https://kaorinkobo.base.shop`,

  lavender: `🪻 あなたの推し色は「ラベンダー」

感性がとても豊かな人——
それがあなたの本質です。

ただ今は——
少し内側に寄りすぎているかもしれません。

もしそうなら、こっそり試してみて🪻

・感じたことを少し言葉にする
・小さく外に出してみる

それだけで、あなたの中の流れが変わっていきます。

─────────────────
🪻 本来のあなたは
感性を現実に活かせる人です。

でも今は、少し「感じるだけ」で止まっている状態かもしれません。

─────────────────
この先では…

✦ 本来のあなたの状態
✦ ズレの理由
✦ 現実への活かし方

をもう少し深くお伝えします。

「あなたの本当の状態を、推し色で知りたい」🪻

─────────────────
🛍️ さらに詳しい鑑定はこちら
https://kaorinkobo.base.shop`,

  ivory: `☀️ あなたの推し色は「アイボリー」

安定した判断ができる、芯のある人——
それがあなたの本質です。

ただ今は——
少し感情を抑えすぎているかもしれません。

もしそうなら、こっそり試してみて☀️

・自分の気持ちを少し言葉にする
・楽しいと感じることを選ぶ

それだけで、あなたの内側がふっと動き始めます。

─────────────────
☀️ 本来のあなたは
安定と感情の両方を持てる人です。

でも今は、少し「整いすぎている」状態かもしれません。

─────────────────
この先では…

✦ 本来のあなたの状態
✦ ズレの理由
✦ 感情の整え方

をもう少し深くお伝えします。

「あなたの本当の状態を、推し色で知りたい」☀️

─────────────────
🛍️ さらに詳しい鑑定はこちら
https://kaorinkobo.base.shop`,

  skyblue: `🩵 あなたの推し色は「スカイブルー」

自由に動ける、風のような人——
それがあなたの本質です。

ただ今は——
少し流れに任せすぎているかもしれません。

もしそうなら、こっそり試してみて🩵

・1つだけ続けることを決める
・少しだけ深く向き合う

それだけで、あなたの中に変化が生まれます。

─────────────────
🩵 本来のあなたは
自由と継続を両方持てる人です。

でも今は、少し「軽さ」に寄っている状態かもしれません。

─────────────────
この先では…

✦ 本来のあなたの状態
✦ ズレの理由
✦ 深くなるための方法

をもう少し深くお伝えします。

「あなたの本当の状態を、推し色で知りたい」🩵

─────────────────
🛍️ さらに詳しい鑑定はこちら
https://kaorinkobo.base.shop`,
};

const VALID_TYPES = ["mint", "rose", "lavender", "ivory", "skyblue"];

function normalizeType(v) {
  const t = String(v || "").trim().toLowerCase();

  if (VALID_TYPES.includes(t)) return t;

  if (t.startsWith("color=")) {
    const x = t.slice("color=".length);
    if (VALID_TYPES.includes(x)) return x;
  }

  return null;
}

function decodeJwtPayload(token) {
  try {
    const parts = String(token || "").split(".");
    if (parts.length < 2) return null;

    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
    const json = Buffer.from(b64 + pad, "base64").toString("utf8");
    return JSON.parse(json);
  } catch (_) {
    return null;
  }
}

async function resolveUserId({ lineUserId, accessToken, idToken }) {
  if (lineUserId) return lineUserId;

  if (accessToken) {
    const profileRes = await fetch("https://api.line.me/v2/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const raw = await profileRes.text().catch(() => "");
    if (profileRes.ok) {
      try {
        const profile = JSON.parse(raw);
        if (profile?.userId) return profile.userId;
      } catch (_) {
        // ignore
      }
    } else {
      console.log("[push-result] profile api failed:", profileRes.status, raw.slice(0, 500));
    }
  }

  if (idToken) {
    const payload = decodeJwtPayload(idToken);
    if (payload?.sub) return payload.sub;
  }

  return null;
}

async function pushMessage(to, text) {
  const response = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      to,
      messages: [{ type: "text", text }],
    }),
  });

  const raw = await response.text().catch(() => "");
  console.log("[push-result] LINE push status:", response.status);

  if (!response.ok) {
    console.log("[push-result] LINE push body:", raw.slice(0, 500));
    throw new Error(`LINE push failed: ${response.status}`);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, detail: "Method not allowed" });
  }

  if (!CHANNEL_ACCESS_TOKEN) {
    return res.status(500).json({ success: false, detail: "Missing LINE_CHANNEL_ACCESS_TOKEN" });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : (req.body || {});

    const { resultType, lineUserId, accessToken, idToken } = body;

    const type = normalizeType(resultType);
    if (!type) {
      return res.status(400).json({ success: false, detail: "Invalid resultType" });
    }

    const to = await resolveUserId({ lineUserId, accessToken, idToken });
    if (!to) {
      return res.status(400).json({
        success: false,
        detail: "LINE user could not be identified",
      });
    }

    const text = COLOR_MESSAGES[type];
    if (!text) {
      return res.status(400).json({ success: false, detail: "Message not found for type" });
    }

    await pushMessage(to, text);

    return res.status(200).json({
      success: true,
      pushed: true,
      resultType: type,
    });
  } catch (e) {
    console.error("[push-result] error:", e);
    return res.status(500).json({
      success: false,
      detail: e?.message || "Unexpected error",
    });
  }
};