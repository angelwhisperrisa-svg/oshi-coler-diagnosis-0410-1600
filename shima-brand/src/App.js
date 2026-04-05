import { useState } from "react";

const TYPES = {
  海風: {
    emoji: "🌊",
    color: "#5ba3c9",
    lightBg: "#eef7fc",
    desc: "開放的で自由な海風のように、流れに身をまかせながら心を整えるタイプ。深呼吸と波の音があなたの守り。",
    suggest: "波照間の海音ヒーリング × 海風壁紙",
    action: "今日は窓を開けて、空気を入れ替えてみてください。",
  },
  夜花: {
    emoji: "🌸",
    color: "#c490b0",
    lightBg: "#fdf0f7",
    desc: "夜にそっと咲くサガリバナのように、静かな時間の中で輝くタイプ。夜のひとり時間が心の栄養になります。",
    suggest: "夜花瞑想音源 × サガリバナ壁紙",
    action: "今夜は少し早めに電気を暗くして、ゆっくり過ごしてみてください。",
  },
  朝光: {
    emoji: "🌤️",
    color: "#d4a843",
    lightBg: "#fdf8ee",
    desc: "朝の光のように清らかで前向きなタイプ。小さな朝のルーティンが一日を整えてくれます。",
    suggest: "朝の整え音源 × 朝光壁紙",
    action: "明日の朝、起きたらまず水を一杯飲んでみてください。",
  },
  島畑: {
    emoji: "🌿",
    color: "#5a9e7a",
    lightBg: "#eef7f2",
    desc: "島の大地に根を張るように、ゆっくり丁寧に生きるタイプ。土や緑の香りが心を落ち着かせてくれます。",
    suggest: "島草木の香りサシェ × 緑の壁紙",
    action: "今日は植物や自然のものに少し触れてみてください。",
  },
};

const QUESTIONS = [
  {
    q: "今、心が一番求めているものは？",
    options: [
      { label: "広い空と、風", type: "海風" },
      { label: "静かな夜と、ひとり時間", type: "夜花" },
      { label: "明るい朝と、新しい一歩", type: "朝光" },
      { label: "大地のぬくもりと、ゆっくりした時間", type: "島畑" },
    ],
  },
  {
    q: "疲れたとき、自然とやっていることは？",
    options: [
      { label: "外に出て、空気を吸う", type: "海風" },
      { label: "部屋を暗くして、音楽を聴く", type: "夜花" },
      { label: "早寝して、朝すっきり起きる", type: "朝光" },
      { label: "お茶を飲みながら、ぼーっとする", type: "島畑" },
    ],
  },
  {
    q: "理想の休日の過ごし方は？",
    options: [
      { label: "海や川のそばで、のんびり", type: "海風" },
      { label: "夜に映画や本を楽しむ", type: "夜花" },
      { label: "早起きして、朝の散歩", type: "朝光" },
      { label: "庭や公園で、植物と過ごす", type: "島畑" },
    ],
  },
];

export default function App() {
  const [step, setStep] = useState("top");
  const [scores, setScores] = useState({ 海風: 0, 夜花: 0, 朝光: 0, 島畑: 0 });
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState("");
  const [emailDone, setEmailDone] = useState(false);

  const handleAnswer = (type) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);
    if (currentQ + 1 >= QUESTIONS.length) {
      const top = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setResult(top);
      setStep("result");
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const reset = () => {
    setStep("top");
    setScores({ 海風: 0, 夜花: 0, 朝光: 0, 島畑: 0 });
    setCurrentQ(0);
    setResult(null);
    setEmail("");
    setEmailDone(false);
  };

  const t = result ? TYPES[result] : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #e8f4f8 0%, #f0f8f4 50%, #f8f0f8 100%)",
      fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Georgia', serif",
      color: "#3a3a3a",
    }}>

      {step === "top" && (
        <div style={{ maxWidth: 420, margin: "0 auto", padding: "0 24px" }}>

          {/* ヒーローエリア */}
          <div style={{
            background: "linear-gradient(160deg, #5ba3c9 0%, #7ec8a0 100%)",
            borderRadius: "0 0 40px 40px",
            padding: "60px 28px 48px",
            textAlign: "center",
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌊</div>
            <div style={{
              fontSize: 10, letterSpacing: "0.4em", color: "rgba(255,255,255,0.8)",
              marginBottom: 12, textTransform: "uppercase",
            }}>
              Shima to Kokoro
            </div>
            <h1 style={{
              fontSize: 22, fontWeight: "bold", lineHeight: 1.7,
              color: "#fff", margin: "0 0 16px",
            }}>
              海と島時間が教えてくれる<br />
              あなただけの、整え方
            </h1>
            <p style={{
              fontSize: 13, color: "rgba(255,255,255,0.85)",
              lineHeight: 2, margin: "0 0 32px",
            }}>
              忙しい毎日の中でも<br />
              やさしく自分を整えるための<br />
              小さなお守りを見つけましょう
            </p>
            <button onClick={() => setStep("quiz")} style={{
              padding: "16px 40px",
              borderRadius: 99,
              border: "none",
              background: "#fff",
              color: "#5ba3c9",
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: "0.1em",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}>
              無料診断をはじめる
            </button>
          </div>

          {/* タイプ紹介 */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: 11, color: "#8aaaba", letterSpacing: "0.25em",
              textAlign: "center", marginBottom: 16,
            }}>
              4つの整えタイプ
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {Object.entries(TYPES).map(([name, type]) => (
                <div key={name} style={{
                  background: type.lightBg,
                  borderRadius: 20, padding: "20px 16px",
                  textAlign: "center",
                  border: `1px solid ${type.color}30`,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{type.emoji}</div>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#2a4050" }}>
                    {name}タイプ
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* デジタル商品 */}
          <div style={{
            background: "#fff",
            borderRadius: 24, padding: "24px",
            marginBottom: 40,
            boxShadow: "0 4px 24px rgba(100,160,200,0.08)",
            border: "1px solid rgba(180,215,235,0.4)",
          }}>
            <div style={{
              fontSize: 11, color: "#8aaaba", letterSpacing: "0.25em",
              marginBottom: 16, textAlign: "center",
            }}>
              デジタル商品
            </div>
            {[
              { emoji: "✨", name: "有料詳細診断", price: "¥1,500" },
              { emoji: "🖼️", name: "デジタル壁紙セット", price: "¥800" },
              { emoji: "📱", name: "スマホ待受", price: "¥500" },
            ].map(item => (
              <div key={item.name} style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid rgba(180,215,235,0.3)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{item.emoji}</span>
                  <span style={{ fontSize: 14, color: "#3a5060" }}>{item.name}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: "bold", color: "#7ec8e0" }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "quiz" && (
        <div style={{ maxWidth: 420, margin: "0 auto", padding: "48px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 16 }}>
              {QUESTIONS.map((_, i) => (
                <div key={i} style={{
                  width: 32, height: 4, borderRadius: 99,
                  background: i <= currentQ ? "#7ec8e0" : "#e0edf4",
                }} />
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#b0c8d8", letterSpacing: "0.2em" }}>
              質問 {currentQ + 1} / {QUESTIONS.length}
            </div>
          </div>
          <div style={{
            background: "#fff", borderRadius: 24,
            padding: "32px 24px",
            boxShadow: "0 4px 24px rgba(100,160,200,0.08)",
            border: "1px solid rgba(180,215,235,0.4)",
          }}>
            <div style={{
              fontSize: 17, fontWeight: "bold", color: "#2a4050",
              lineHeight: 1.7, marginBottom: 28, textAlign: "center",
            }}>
              {QUESTIONS[currentQ].q}
            </div>
            {QUESTIONS[currentQ].options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt.type)} style={{
                display: "block", width: "100%",
                padding: "15px 20px", marginBottom: 10,
                borderRadius: 16,
                border: "1.5px solid rgba(180,215,235,0.6)",
                background: "rgba(245,252,255,0.8)",
                color: "#3a5060", fontSize: 14,
                cursor: "pointer", textAlign: "left",
                lineHeight: 1.5,
              }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "result" && t && (
        <div style={{ maxWidth: 420, margin: "0 auto", padding: "48px 24px" }}>
          <div style={{
            background: t.lightBg, borderRadius: 28,
            padding: "40px 28px", marginBottom: 16,
            border: `1.5px solid ${t.color}30`,
          }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>{t.emoji}</div>
              <div style={{ fontSize: 11, color: t.color, letterSpacing: "0.3em", marginBottom: 8 }}>
                あなたは
              </div>
              <div style={{ fontSize: 28, fontWeight: "bold", color: "#2a4050" }}>
                {result}タイプ
              </div>
            </div>
            <p style={{ fontSize: 14, color: "#5a6a74", lineHeight: 1.9, marginBottom: 20, textAlign: "center" }}>
              {t.desc}
            </p>
            <div style={{ background: "#fff", borderRadius: 16, padding: "16px 20px", marginBottom: 12, border: `1px solid ${t.color}20` }}>
              <div style={{ fontSize: 11, color: t.color, marginBottom: 6, letterSpacing: "0.15em" }}>今日のひとこと</div>
              <div style={{ fontSize: 13, color: "#5a6a74", lineHeight: 1.8 }}>{t.action}</div>
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: "14px 20px", border: `1px solid ${t.color}20` }}>
              <div style={{ fontSize: 11, color: t.color, marginBottom: 6, letterSpacing: "0.15em" }}>おすすめ</div>
              <div style={{ fontSize: 13, color: "#5a6a74" }}>{t.suggest}</div>
            </div>
          </div>
          <button onClick={() => setStep("gift")} style={{
            width: "100%", padding: "15px", borderRadius: 99, border: "none",
            background: "linear-gradient(135deg, #d4a8c0, #c090a8)",
            color: "#fff", fontSize: 14, fontWeight: "bold", cursor: "pointer", marginBottom: 12,
          }}>
            無料特典を受け取る
          </button>
          <button onClick={reset} style={{
            width: "100%", padding: "12px", borderRadius: 99,
            border: "1.5px solid rgba(180,215,235,0.6)",
            background: "transparent", color: "#8aaaba", fontSize: 13, cursor: "pointer",
          }}>
            もう一度診断する
          </button>
        </div>
      )}

      {step === "gift" && (
        <div style={{ maxWidth: 420, margin: "0 auto", padding: "48px 24px" }}>
          <div style={{
            background: "#fff", borderRadius: 24, padding: "36px 28px", marginBottom: 16,
            boxShadow: "0 4px 24px rgba(100,160,200,0.08)",
            border: "1px solid rgba(180,215,235,0.4)",
          }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎁</div>
              <div style={{ fontSize: 11, color: "#8ac0d8", letterSpacing: "0.25em", marginBottom: 8 }}>無料特典</div>
              <div style={{ fontSize: 18, fontWeight: "bold", color: "#2a4050", lineHeight: 1.6 }}>
                波照間の海<br />ヒーリングミュージック
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#8a9eaa", lineHeight: 1.9, textAlign: "center", marginBottom: 28 }}>
              日本最南端・波照間島の海の音。<br />島時間がそっとあなたを包みます。
            </p>
            {!emailDone ? (
              <>
                <input
                  type="email" placeholder="メールアドレスを入力"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{
                    width: "100%", padding: "14px 18px", borderRadius: 14,
                    border: "1.5px solid rgba(180,215,235,0.6)",
                    fontSize: 14, marginBottom: 12,
                    background: "rgba(245,252,255,0.8)",
                    color: "#3a5060", boxSizing: "border-box",
                  }}
                />
                <button onClick={() => setEmailDone(true)} style={{
                  width: "100%", padding: "14px", borderRadius: 99, border: "none",
                  background: "linear-gradient(135deg, #7ec8e0, #5aaecc)",
                  color: "#fff", fontSize: 14, fontWeight: "bold", cursor: "pointer",
                }}>
                  特典を受け取る
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", color: "#5a9e7a", fontSize: 15, fontWeight: "bold" }}>
                ありがとうございます<br />
                <span style={{ fontSize: 13, fontWeight: "normal", color: "#8a9eaa" }}>メールをご確認ください</span>
              </div>
            )}
          </div>
          {emailDone && (
            <button onClick={() => setStep("shop")} style={{
              width: "100%", padding: "15px", borderRadius: 99, border: "none",
              background: "linear-gradient(135deg, #7ab898, #5a9878)",
              color: "#fff", fontSize: 14, fontWeight: "bold", cursor: "pointer",
            }}>
              もっと整えたい方へ
            </button>
          )}
        </div>
      )}

      {step === "shop" && (
        <div style={{ maxWidth: 420, margin: "0 auto", padding: "48px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 11, color: "#8ac0d8", letterSpacing: "0.25em", marginBottom: 8 }}>デジタル商品</div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: "#2a4050" }}>あなたの整えを、深める</div>
          </div>
          {[
            { emoji: "✨", name: "有料詳細診断", desc: "あなたのタイプをより深く。具体的な整え方と毎日のヒントを詳しくお届け。", price: "¥1,500" },
            { emoji: "🖼️", name: "デジタル壁紙セット", desc: "4タイプ全ての壁紙。PCとスマホ用セット。", price: "¥800" },
            { emoji: "📱", name: "スマホ待受", desc: "島時間を毎日感じるための、やさしい待受画像セット。", price: "¥500" },
          ].map(item => (
            <div key={item.name} style={{
              background: "#fff", borderRadius: 20, padding: "20px 22px", marginBottom: 12,
              boxShadow: "0 2px 16px rgba(100,160,200,0.07)",
              border: "1px solid rgba(180,215,235,0.4)",
              display: "flex", gap: 14, alignItems: "center",
            }}>
              <div style={{ fontSize: 28 }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: "bold", color: "#2a4050", marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#8a9eaa", lineHeight: 1.7 }}>{item.desc}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#7ec8e0", whiteSpace: "nowrap" }}>{item.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}