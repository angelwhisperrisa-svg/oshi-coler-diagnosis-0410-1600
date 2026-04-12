0326 Claude 石垣島フードロス整え。

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- ★ここを差し替え（ページタイトル） -->
<title>香り結び診断 — KORIN KOBO 薫凛香房</title>
<meta name="description" content="石垣島の香房KORINKOBOが贈る、あなたに合う香りのお守り診断。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Shippori+Mincho:wght@400;500&display=swap" rel="stylesheet">

<style>
/* ============================================================
   CSS VARIABLES
=====================sac======================================= */
:root {
  --cream:       #fdf9f3;
  --sand:        #f0e8d8;
  --sand2:       #e8dcc8;
  --linen:       #ede4d4;
  --gold:        #c9a84c;
  --gold-light:  #e8c96a;
  --gold-glow:   rgba(201,168,76,0.25);
  --ocean:       #6aaccc;
  --ocean-deep:  #3a7a9c;
  --ocean-light: #b8d8e8;
  --sage:        #7a9e7e;
  --lavender:    #9b8ab8;
  --text:        #3a3020;
  --text-sub:    #7a6850;
  --text-light:  #a89878;
  --white:       #ffffff;
  /* type colors */
  --blue-type:   #5a9ab8;
  --purple-type: #9b82b8;
  --green-type:  #7a9e7e;
  --gold-type:   #c9a84c;

  --radius-sm: 12px;
  --radius-md: 24px;
  --radius-lg: 40px;
  --shadow:    0 8px 40px rgba(58,48,32,0.10);
  --shadow-sm: 0 2px 12px rgba(58,48,32,0.08);
  --font-serif: 'Shippori Mincho', 'Noto Serif JP', serif;
  --font-disp:  'Cormorant Garamond', 'Noto Serif JP', serif;
  --font-body:  'Noto Serif JP', serif;
  --transition: 0.5s cubic-bezier(0.4,0,0.2,1);
}

/* ============================================================
   RESET & BASE
============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--cream);
  color: var(--text);
  line-height: 1.9;
  font-size: 15px;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ============================================================
   BACKGROUND — ocean light shimmer
============================================================ */
body::before {
  content: '';
  position: fixed; inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(106,172,204,0.18) 0%, transparent 55%),
    radial-gradient(ellipse 60% 40% at 100% 80%, rgba(201,168,76,0.10) 0%, transparent 50%),
    radial-gradient(ellipse 50% 50% at 0% 50%, rgba(106,172,204,0.08) 0%, transparent 50%);
  pointer-events: none; z-index: 0;
}

/* ============================================================
   SCREENS
============================================================ */
.screen {
  display: none;
  position: relative; z-index: 1;
  min-height: 100vh;
  animation: screenIn 0.8s ease both;
}
.screen.active { display: block; }
#screen-start.active { display: flex; flex-direction: column; align-items: center; }

@keyframes screenIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ============================================================
   GLOW OVERLAY (answer effect)
============================================================ */
#glow-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.22) 0%, transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}
#glow-overlay.glow { opacity: 1; }

/* ============================================================
   START SCREEN
============================================================ */
#screen-start {
  padding: 0;
  background: linear-gradient(175deg, #fdf9f3 0%, #eef6fa 45%, #fdf9f3 100%);
}

.start-ocean {
  width: 100%;
  height: 280px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #b8d8e8 0%, #7abcd8 40%, #5aaace 70%, #d4eedc 100%);
}
/* Animated waves */
.wave {
  position: absolute; bottom: 0; left: -100%; right: -100%;
  height: 60px;
  background: var(--cream);
  border-radius: 50% 50% 0 0 / 30px 30px 0 0;
  animation: waveMove linear infinite;
}
.wave:nth-child(1) { animation-duration: 6s; opacity: 1;   bottom: 0; }
.wave:nth-child(2) { animation-duration: 8s; opacity: 0.6; bottom: 12px; background: rgba(253,249,243,0.7); }
.wave:nth-child(3) { animation-duration: 10s;opacity: 0.4; bottom: 22px; background: rgba(253,249,243,0.4); }
@keyframes waveMove {
  0%   { transform: translateX(0); }
  50%  { transform: translateX(30%); }
  100% { transform: translateX(0); }
}

/* Sun shimmer */
.ocean-sun {
  position: absolute; top: 32px; left: 50%; transform: translateX(-50%);
  width: 70px; height: 70px; border-radius: 50%;
  background: radial-gradient(circle, #fff9d0 0%, #f0d060 40%, rgba(240,180,40,0.3) 70%, transparent 100%);
  box-shadow: 0 0 40px 20px rgba(240,210,80,0.3);
  animation: sunPulse 4s ease-in-out infinite;
}
@keyframes sunPulse {
  0%,100% { box-shadow: 0 0 40px 20px rgba(240,210,80,0.3); }
  50%      { box-shadow: 0 0 60px 30px rgba(240,210,80,0.5); }
}

/* Goddess image */
.goddess-wrap {
  position: absolute;
  bottom: 0; left: 50%; transform: translateX(-50%);
  width: 200px;
  z-index: 2;
  filter: drop-shadow(0 4px 24px rgba(201,168,76,0.35));
  animation: goddessBob 5s ease-in-out infinite;
}
.goddess-wrap img {
  width: 100%; height: auto; display: block;
  border-radius: 50% 50% 0 0 / 60% 60% 0 0;
}
/* Placeholder if no image */
.goddess-placeholder {
  width: 200px; height: 200px;
  border-radius: 50% 50% 0 0 / 60% 60% 0 0;
  background: radial-gradient(circle at 40% 35%, #fff3c0, #e8c050 50%, #c09020);
  display: flex; align-items: center; justify-content: center;
  font-size: 80px;
  box-shadow: 0 0 40px rgba(201,168,76,0.4);
}
@keyframes goddessBob {
  0%,100% { transform: translateX(-50%) translateY(0); }
  50%      { transform: translateX(-50%) translateY(-8px); }
}

/* Start content below hero */
.start-content {
  width: 100%; max-width: 520px;
  padding: 40px 28px 60px;
  text-align: center;
}
.brand-label {
  font-family: var(--font-disp);
  font-size: 11px;
  letter-spacing: 0.35em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 16px;
}
.start-title {
  font-family: var(--font-serif);
  font-size: clamp(20px, 6vw, 26px);
  font-weight: 500;
  color: var(--text);
  line-height: 1.7;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}
.start-title em {
  font-style: normal;
  color: var(--gold);
}
.start-sub {
  font-size: 13px;
  color: var(--text-sub);
  line-height: 2;
  margin-bottom: 36px;
}
.gold-divider {
  width: 60px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 0 auto 36px;
}
.start-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  background: linear-gradient(135deg, #d4a84c 0%, #c09030 100%);
  color: #fff8e8;
  border: none; border-radius: 50px;
  padding: 18px 48px;
  font-family: var(--font-serif);
  font-size: 15px; letter-spacing: 0.1em;
  cursor: pointer;
  box-shadow: 0 6px 28px rgba(192,144,48,0.35);
  transition: all var(--transition);
  width: 100%; max-width: 320px;
}
.start-btn:hover, .start-btn:active {
  transform: translateY(-3px);
  box-shadow: 0 10px 36px rgba(192,144,48,0.5);
}
.start-note {
  margin-top: 16px;
  font-size: 11.5px;
  color: var(--text-light);
  line-height: 1.9;
}

/* Shell decorations */
.shell-deco {
  font-size: 22px;
  letter-spacing: 12px;
  color: var(--ocean);
  opacity: 0.5;
  margin: 24px 0 0;
}

/* ============================================================
   QUESTION SCREEN
============================================================ */
#screen-question { padding-top: 0; background: var(--cream); }

.q-header {
  background: rgba(253,249,243,0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(201,168,76,0.15);
  padding: 16px 20px 14px;
  position: sticky; top: 0; z-index: 10;
}
.q-header-inner { max-width: 520px; margin: 0 auto; }

.progress-label {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 10px;
}
.progress-label-left {
  font-family: var(--font-disp);
  font-size: 11px; letter-spacing: 0.2em;
  color: var(--gold);
  text-transform: uppercase;
}
.progress-label-right { font-size: 12px; color: var(--text-light); }

.progress-track {
  height: 3px;
  background: var(--sand2);
  border-radius: 99px; overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--ocean-light), var(--gold));
  border-radius: 99px;
  transition: width 0.6s ease;
}

.q-body { padding: 36px 20px 60px; max-width: 520px; margin: 0 auto; }
.q-num {
  font-family: var(--font-disp);
  font-size: 11px; letter-spacing: 0.25em;
  color: var(--text-light);
  margin-bottom: 18px;
  text-transform: uppercase;
}
.q-text {
  font-family: var(--font-serif);
  font-size: clamp(17px, 5vw, 21px);
  font-weight: 500; color: var(--text);
  line-height: 1.85; margin-bottom: 8px;
}
.q-sub {
  font-size: 13px; color: var(--text-sub);
  line-height: 1.9; margin-bottom: 32px;
}

.q-options { display: flex; flex-direction: column; gap: 14px; }

.q-option {
  background: var(--white);
  border: 1.5px solid rgba(201,168,76,0.15);
  border-radius: var(--radius-md);
  padding: 18px 22px;
  font-family: var(--font-body);
  font-size: 14.5px; color: var(--text);
  cursor: pointer;
  transition: all 0.35s ease;
  text-align: left; line-height: 1.7;
  box-shadow: var(--shadow-sm);
  display: flex; align-items: flex-start; gap: 14px;
  position: relative; overflow: hidden;
}
.q-option::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(201,168,76,0.06), rgba(106,172,204,0.04));
  opacity: 0; transition: opacity 0.3s;
}
.q-option:hover { border-color: rgba(201,168,76,0.4); transform: translateY(-2px); box-shadow: var(--shadow); }
.q-option:hover::before { opacity: 1; }
.q-option.selected {
  background: linear-gradient(135deg, rgba(240,232,216,0.8), rgba(253,249,243,0.9));
  border-color: var(--gold);
  box-shadow: 0 4px 24px rgba(201,168,76,0.2);
}
.q-option.selected::before { opacity: 1; }

.opt-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--sand2); flex-shrink: 0; margin-top: 7px;
  transition: background 0.3s, transform 0.3s;
}
.q-option.selected .opt-dot {
  background: var(--gold);
  transform: scale(1.3);
  box-shadow: 0 0 8px rgba(201,168,76,0.5);
}

.q-next {
  margin-top: 32px; width: 100%; padding: 17px;
  background: linear-gradient(135deg, #d4a84c, #c09030);
  color: #fff8e8; border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-serif);
  font-size: 15px; letter-spacing: 0.1em;
  cursor: pointer; transition: all var(--transition);
  opacity: 0.3; pointer-events: none;
  box-shadow: 0 4px 20px rgba(192,144,48,0.2);
}
.q-next.enabled { opacity: 1; pointer-events: auto; }
.q-next.enabled:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(192,144,48,0.4); }

/* ============================================================
   LEAD CAPTURE SCREEN
============================================================ */
#screen-lead {
  background: linear-gradient(160deg, #eef6fa 0%, #fdf9f3 100%);
  display: flex; flex-direction: column; align-items: center;
}
#screen-lead.active { display: flex; }

.lead-inner {
  width: 100%; max-width: 520px;
  padding: 60px 28px 80px;
  text-align: center;
}

.lead-goddess {
  width: 140px; height: 140px; margin: 0 auto 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(201,168,76,0.3);
  box-shadow: 0 0 40px rgba(201,168,76,0.25), 0 0 80px rgba(106,172,204,0.15);
  animation: goldPulse 4s ease-in-out infinite;
}
.lead-goddess img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
.lead-goddess-ph {
  width: 100%; height: 100%;
  background: radial-gradient(circle at 40% 35%, #fff3c0, #e8c050 50%, #c09020);
  display: flex; align-items: center; justify-content: center;
  font-size: 60px;
}

@keyframes goldPulse {
  0%,100% { box-shadow: 0 0 40px rgba(201,168,76,0.25), 0 0 80px rgba(106,172,204,0.15); }
  50%      { box-shadow: 0 0 60px rgba(201,168,76,0.45), 0 0 100px rgba(106,172,204,0.25); }
}

.lead-eyebrow {
  font-family: var(--font-disp);
  font-size: 11px; letter-spacing: 0.28em;
  color: var(--gold); text-transform: uppercase;
  margin-bottom: 14px;
}
.lead-title {
  font-family: var(--font-serif);
  font-size: clamp(19px, 6vw, 24px);
  font-weight: 500; color: var(--text);
  line-height: 1.7; margin-bottom: 12px;
}
.lead-body {
  font-size: 14px; color: var(--text-sub);
  line-height: 2; margin-bottom: 36px;
}

.lead-card {
  background: var(--white);
  border: 1px solid rgba(201,168,76,0.18);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  box-shadow: var(--shadow);
  margin-bottom: 16px;
}

/* LINE btn */
.btn-line {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  background: #06C755; color: #fff;
  border: none; border-radius: 50px;
  padding: 16px 24px;
  font-family: var(--font-body); font-size: 14.5px;
  cursor: pointer; text-decoration: none;
  transition: all 0.3s; width: 100%;
  box-shadow: 0 4px 20px rgba(6,199,85,0.25);
  letter-spacing: 0.04em;
}
.btn-line:hover { background: #05b34c; transform: translateY(-2px); box-shadow: 0 6px 28px rgba(6,199,85,0.38); }

.divider-or {
  display: flex; align-items: center; gap: 12px;
  margin: 20px 0;
  font-size: 12px; color: var(--text-light);
}
.divider-or::before, .divider-or::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, var(--sand2), transparent);
}

.mail-input-wrap { display: flex; flex-direction: column; gap: 12px; }
.mail-input {
  width: 100%; padding: 15px 18px;
  background: var(--cream);
  border: 1.5px solid var(--sand2);
  border-radius: var(--radius-md);
  font-family: var(--font-body); font-size: 15px; color: var(--text);
  outline: none; transition: border-color 0.3s;
}
.mail-input:focus { border-color: var(--gold); }

.btn-submit {
  width: 100%; padding: 16px;
  background: linear-gradient(135deg, #d4a84c, #c09030);
  color: #fff8e8; border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-serif); font-size: 15px;
  letter-spacing: 0.08em; cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(192,144,48,0.25);
}
.btn-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(192,144,48,0.4); }

.lead-note {
  font-size: 11px; color: var(--text-light);
  line-height: 1.9; margin-top: 14px;
}

/* ============================================================
   RESULT SCREEN
============================================================ */
#screen-result { background: var(--cream); }

/* Hero band */
.result-hero {
  padding: 56px 24px 48px; text-align: center;
  position: relative; overflow: hidden;
}
.result-hero-bg {
  position: absolute; inset: 0;
  transition: background 0.8s ease;
}
.result-hero-inner { position: relative; z-index: 1; max-width: 520px; margin: 0 auto; }

.result-badge {
  display: inline-block;
  border: 1px solid rgba(255,255,255,0.5);
  color: rgba(255,255,255,0.8);
  font-family: var(--font-disp);
  font-size: 10px; letter-spacing: 0.25em;
  padding: 5px 18px; border-radius: 50px;
  margin-bottom: 18px; text-transform: uppercase;
}
.result-icon-wrap {
  width: 90px; height: 90px; margin: 0 auto 20px;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
  border: 2px solid rgba(255,255,255,0.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 38px;
  box-shadow: 0 0 40px rgba(255,255,255,0.15);
}
.result-type-name {
  font-family: var(--font-serif);
  font-size: clamp(22px, 7vw, 30px);
  font-weight: 500; color: #fff;
  letter-spacing: 0.08em; margin-bottom: 10px; line-height: 1.4;
}
.result-type-tag {
  font-family: var(--font-disp);
  font-size: 13px; color: rgba(255,255,255,0.75);
  letter-spacing: 0.12em; font-style: italic;
}

/* Result body */
.result-body { max-width: 520px; margin: 0 auto; padding: 40px 20px 80px; }

.result-card {
  background: var(--white);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: var(--radius-lg);
  padding: 30px 26px;
  margin-bottom: 20px;
  box-shadow: var(--shadow);
}

.card-eyebrow {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-disp);
  font-size: 10.5px; letter-spacing: 0.2em;
  color: var(--text-light); text-transform: uppercase;
  margin-bottom: 14px;
}
.card-eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--gold); flex-shrink: 0;
}

/* Goddess message */
.goddess-msg {
  background: linear-gradient(135deg, rgba(240,232,216,0.5), rgba(238,246,250,0.5));
  border-radius: var(--radius-md);
  padding: 20px 22px; margin-top: 14px;
  font-size: 14.5px; color: var(--text);
  line-height: 2.05;
  border-left: 3px solid var(--gold-light);
}

/* Sache card */
.sache-visual {
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 18px;
  position: relative;
}
.sache-img { width: 100%; height: 220px; object-fit: cover; display: block; }
.sache-ph {
  width: 100%; height: 220px;
  display: flex; align-items: center; justify-content: center;
  font-size: 80px;
  transition: background 0.8s ease;
}
.sache-name {
  font-family: var(--font-serif);
  font-size: 18px; font-weight: 500;
  color: var(--text); margin-bottom: 8px;
  letter-spacing: 0.06em;
}
.sache-en {
  font-family: var(--font-disp);
  font-size: 12px; color: var(--text-light);
  letter-spacing: 0.15em; font-style: italic;
  margin-bottom: 14px;
}
.sache-desc {
  font-size: 13.5px; color: var(--text-sub);
  line-height: 2;
}

/* Buy button */
.btn-buy {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; padding: 18px;
  background: linear-gradient(135deg, #d4a84c, #c09030);
  color: #fff8e8; border: none;
  border-radius: 50px;
  font-family: var(--font-serif); font-size: 15px;
  letter-spacing: 0.08em; cursor: pointer;
  text-decoration: none;
  transition: all var(--transition);
  box-shadow: 0 6px 28px rgba(192,144,48,0.35);
  margin-top: 8px;
}
.btn-buy:hover { transform: translateY(-3px); box-shadow: 0 10px 36px rgba(192,144,48,0.5); }

/* Food loss section */
.foodloss-card {
  background: linear-gradient(135deg, rgba(122,158,126,0.1), rgba(106,172,204,0.08));
  border: 1px solid rgba(122,158,126,0.25);
  border-radius: var(--radius-lg);
  padding: 30px 26px;
  margin-bottom: 20px;
  box-shadow: var(--shadow-sm);
}
.foodloss-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(122,158,126,0.15);
  color: var(--sage);
  border: 1px solid rgba(122,158,126,0.3);
  border-radius: 50px; padding: 4px 14px;
  font-size: 11px; letter-spacing: 0.12em;
  margin-bottom: 16px;
}
.foodloss-title {
  font-family: var(--font-serif);
  font-size: 17px; font-weight: 500;
  color: var(--text); margin-bottom: 10px; line-height: 1.6;
}
.foodloss-body {
  font-size: 13.5px; color: var(--text-sub);
  line-height: 2; margin-bottom: 20px;
}
.foodloss-items {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 10px; margin-bottom: 20px;
}
.foodloss-item {
  background: var(--white);
  border: 1px solid rgba(122,158,126,0.2);
  border-radius: var(--radius-sm);
  padding: 14px 12px;
  text-align: center;
  transition: all 0.3s;
}
.foodloss-item:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }
.fi-icon { font-size: 28px; margin-bottom: 6px; display: block; }
.fi-name { font-size: 12px; color: var(--text); font-weight: 500; letter-spacing: 0.05em; }
.fi-note { font-size: 11px; color: var(--text-light); margin-top: 2px; }

/* ★ここを差し替え（BASE フードロス商品URL） */
.btn-foodloss {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 15px;
  background: var(--white);
  color: var(--sage);
  border: 1.5px solid var(--sage);
  border-radius: 50px;
  font-family: var(--font-body); font-size: 14px;
  letter-spacing: 0.06em; cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}
.btn-foodloss:hover { background: rgba(122,158,126,0.08); transform: translateY(-2px); }

/* Retry */
.btn-retry {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 14px;
  background: transparent; color: var(--text-light);
  border: 1px solid var(--sand2); border-radius: 50px;
  font-family: var(--font-body); font-size: 13px;
  cursor: pointer; transition: all 0.3s;
  margin-top: 8px;
}
.btn-retry:hover { border-color: var(--gold); color: var(--text-sub); }

/* ============================================================
   DISCLAIMER
============================================================ */
.disclaimer {
  background: var(--sand);
  border-radius: var(--radius-md);
  padding: 16px 18px; margin: 8px 0 24px;
  font-size: 11.5px; color: var(--text-light);
  line-height: 1.9; text-align: center;
}

/* ============================================================
   FOOTER
============================================================ */
.site-footer {
  text-align: center;
  padding: 32px 20px 48px;
  font-family: var(--font-disp);
  font-size: 11px; letter-spacing: 0.2em;
  color: var(--text-light);
  border-top: 1px solid var(--sand2);
}
.footer-logo {
  font-size: 16px; letter-spacing: 0.15em;
  color: var(--gold); margin-bottom: 6px;
}

/* ============================================================
   RESPONSIVE
============================================================ */
@media (max-width: 375px) {
  .start-title { font-size: 18px; }
  .q-text { font-size: 16px; }
  .result-type-name { font-size: 20px; }
  .foodloss-items { grid-template-columns: 1fr 1fr; }
}
</style>
</head>
<body>

<!-- Glow overlay for answer effect -->
<div id="glow-overlay"></div>

<!-- ====================================================
     SCREEN 1: START
==================================================== -->
<div id="screen-start" class="screen active">

  <!-- Ocean hero -->
  <div class="start-ocean">
    <div class="ocean-sun"></div>
    <!-- Goddess image / placeholder -->
    <div class="goddess-wrap">
      <!-- ★ここを差し替え（女神画像パス） -->
      <img src="path/to/image_0.png" alt="ひまわり女神" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
      <div class="goddess-placeholder" style="display:none;">🌻</div>
    </div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>

  <!-- Content -->
  <div class="start-content">
    <p class="brand-label">KORIN KOBO — 薫凛香房</p>
    <h1 class="start-title">
      今のあなたに合う<br>
      <em>整え方</em>を<br>
      少し見つけてみませんか？
    </h1>
    <p class="start-sub">
      石垣島の自然と香りが紡ぐ、<br>
      あなただけの小さなお守り診断。<br>
      10問でわかる「今の心と体の声」。
    </p>
    <div class="gold-divider"></div>
    <button class="start-btn" id="startBtn">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M8 5v6M6 9l2 2 2-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
      診断を始める（無料）
    </button>
    <p class="start-note">所要時間：約3分 ／ 登録は任意です</p>
    <div class="shell-deco">🐚 ✦ 🌺</div>
  </div>

</div><!-- /screen-start -->


<!-- ====================================================
     SCREEN 2: QUESTION
==================================================== -->
<div id="screen-question" class="screen">

  <div class="q-header">
    <div class="q-header-inner">
      <div class="progress-label">
        <span class="progress-label-left">整い度</span>
        <span class="progress-label-right" id="prog-pct">0%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" id="prog-fill" style="width:0%"></div>
      </div>
    </div>
  </div>

  <div class="q-body">
    <p class="q-num" id="q-num">Question 01 / 10</p>
    <h2 class="q-text" id="q-text"></h2>
    <p class="q-sub" id="q-sub"></p>
    <div class="q-options" id="q-options"></div>
    <button class="q-next" id="q-next">次の問いへ →</button>
  </div>

</div><!-- /screen-question -->


<!-- ====================================================
     SCREEN 3: LEAD CAPTURE
==================================================== -->
<div id="screen-lead" class="screen">
  <div class="lead-inner">

    <div class="lead-goddess">
      <!-- ★ここを差し替え（女神画像パス） -->
      <img src="path/to/image_0.png" alt="女神" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
      <div class="lead-goddess-ph" style="display:none;">🌻</div>
    </div>

    <p class="lead-eyebrow">Your Result is Ready</p>
    <h2 class="lead-title">
      あなたへの<br>
      「香りのお守り」が見つかりました
    </h2>
    <p class="lead-body">
      診断結果をお届けするために、<br>
      LINEの友だち追加またはメールアドレスの<br>
      ご登録をお願いします。<br>
      <small style="color:var(--text-light);">※登録なしでもスキップして確認できます。</small>
    </p>

    <div class="lead-card">
      <!-- ★ここを差し替え（LINE公式アカウントURL） -->
      <a class="btn-line" href="https://line.me/R/ti/p/YOUR_LINE_ID" target="_blank" rel="noopener" id="lineRegBtn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.031 2 11c0 2.7 1.28 5.122 3.296 6.786-.127.445-.525 1.61-.604 1.861-.098.31.114.306.24.223.098-.064 1.558-1.023 2.19-1.45.754.118 1.53.18 2.323.18 5.522 0 10-4.03 10-9 0-4.97-4.478-9-10-9z"/></svg>
        LINEで友だち追加して結果を見る
      </a>

      <div class="divider-or">または</div>

      <div class="mail-input-wrap">
        <input class="mail-input" type="email" id="lead-email" placeholder="メールアドレスを入力" autocomplete="email">
        <button class="btn-submit" id="leadSubmitBtn">登録して結果を見る ✦</button>
      </div>
    </div>

    <p class="lead-note">
      ご登録いただいた情報は、診断結果のお届けおよびKORIN KOBOからの<br>
      お知らせにのみ使用します。
    </p>
    <br>
    <button class="btn-retry" id="skipBtn" style="border-color:transparent;font-size:12px;color:var(--text-light);">
      今はスキップして結果だけ見る →
    </button>

  </div>
</div><!-- /screen-lead -->


<!-- ====================================================
     SCREEN 4: RESULT
==================================================== -->
<div id="screen-result" class="screen">

  <!-- Hero -->
  <div class="result-hero">
    <div class="result-hero-bg" id="result-hero-bg"></div>
    <div class="result-hero-inner">
      <div class="result-badge">YOUR KAORIN TYPE</div>
      <div class="result-icon-wrap" id="result-icon">🌊</div>
      <h2 class="result-type-name" id="result-type-name">——</h2>
      <p class="result-type-tag" id="result-type-tag">——</p>
    </div>
  </div>

  <!-- Body -->
  <div class="result-body">

    <!-- Goddess message -->
    <div class="result-card">
      <div class="card-eyebrow">
        <span class="card-eyebrow-dot"></span>
        女神からのメッセージ
      </div>
      <div class="goddess-msg" id="goddess-msg">……</div>
    </div>

    <!-- Recommended sache -->
    <div class="result-card">
      <div class="card-eyebrow">
        <span class="card-eyebrow-dot"></span>
        あなたへの香りのお守り
      </div>
      <div class="sache-visual">
        <!-- ★ここを差し替え（香り結びサシェ画像パス） -->
        <img class="sache-img" id="sache-img" src="path/to/image_5.png" alt="香り結びサシェ" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <div class="sache-ph" id="sache-ph" style="display:none;">🎀</div>
      </div>
      <p class="sache-name" id="sache-name">——</p>
      <p class="sache-en" id="sache-en">——</p>
      <p class="sache-desc" id="sache-desc">……</p>
      <!-- ★ここを差し替え（BASE 商品URL） -->
      <a class="btn-buy" id="buy-btn" href="https://your-base-shop.base.shop/items/XXXXXXXX" target="_blank" rel="noopener">
        🛒 あなたの整えサシェをカートに入れる
      </a>
    </div>

    <!-- Food loss section -->
    <div class="foodloss-card">
      <div class="foodloss-badge">
        🌿 石垣島フードロスプロジェクト
      </div>
      <h3 class="foodloss-title">
        香りと一緒に、島の恵みも<br>受け取ってみませんか
      </h3>
      <p class="foodloss-body">
        石垣島では、規格外・余剰となった農産物や加工品が毎年大量に廃棄されています。
        KORIN KOBOはそんな「もったいない島の恵み」を、あなたの食卓へ届けるプロジェクトを支援しています。
        香りで心を整えながら、食でも島とつながってみませんか。
      </p>
      <div class="foodloss-items">
        <div class="foodloss-item">
          <span class="fi-icon">🍍</span>
          <div class="fi-name">規格外パイン</div>
          <div class="fi-note">形は不揃い、味は本物</div>
        </div>
        <div class="foodloss-item">
          <span class="fi-icon">🥭</span>
          <div class="fi-name">訳ありマンゴー</div>
          <div class="fi-note">完熟・数量限定</div>
        </div>
        <div class="foodloss-item">
          <span class="fi-icon">🌿</span>
          <div class="fi-name">島のハーブ</div>
          <div class="fi-note">収穫過多・送料込み</div>
        </div>
        <div class="foodloss-item">
          <span class="fi-icon">🧴</span>
          <div class="fi-name">島塩・黒糖</div>
          <div class="fi-note">加工品・数量限定</div>
        </div>
      </div>
      <!-- ★ここを差し替え（フードロス商品ページURL） -->
      <a class="btn-foodloss" href="https://your-base-shop.base.shop/categories/foodloss" target="_blank" rel="noopener">
        🌺 石垣島フードロス商品を見る
      </a>
    </div>

    <p class="disclaimer">
      この診断は商品のご提案を目的としたものです。<br>
      医療的なアドバイスではありません。
    </p>

    <button class="btn-retry" id="retryBtn">↩ もう一度診断する</button>

  </div>

  <footer class="site-footer">
    <div class="footer-logo">KORIN KOBO</div>
    薫凛香房 — 石垣島より、香りと光をお届けします
  </footer>

</div><!-- /screen-result -->


<script>
/* ============================================================
   QUESTIONS DATA (10問)
============================================================ */
var questions = [
  {
    text: "今の自分の状態を、石垣島の海に例えるとしたら？",
    sub: "直感で選んでみてください。",
    options: [
      { label: "波が立ちっぱなしで、なかなか凪にならない", scores: { blue:3, purple:1, green:1, gold:0 } },
      { label: "深いところで静かに揺れている感じ",         scores: { blue:1, purple:3, green:1, gold:0 } },
      { label: "透明だけど、底が重く沈んでいる感じ",        scores: { blue:0, purple:1, green:3, gold:1 } },
      { label: "光が差して、キラキラと輝いている",          scores: { blue:0, purple:0, green:0, gold:3 } }
    ]
  },
  {
    text: "最近の睡眠について、正直なところを選んでください。",
    sub: "寝ているけど、回復している感じがしない——そんなことはありますか？",
    options: [
      { label: "なかなか寝つけない日が続いている",           scores: { blue:3, purple:1, green:0, gold:0 } },
      { label: "眠りが浅く、夢ばかり見る",                   scores: { blue:1, purple:3, green:0, gold:0 } },
      { label: "寝ても疲れが取れない感じがする",             scores: { blue:1, purple:1, green:3, gold:0 } },
      { label: "おおむねよく眠れている",                      scores: { blue:0, purple:0, green:0, gold:3 } }
    ]
  },
  {
    text: "今、あなたの体の中で一番「重さ」を感じる場所は？",
    sub: "感覚でいいです、ふと思い浮かんだ場所を。",
    options: [
      { label: "肩や首のまわり",    scores: { blue:3, purple:1, green:1, gold:0 } },
      { label: "胸やみぞおちのあたり", scores: { blue:1, purple:3, green:1, gold:0 } },
      { label: "腰や足のだるさ",    scores: { blue:1, purple:0, green:3, gold:0 } },
      { label: "特にない、軽い",    scores: { blue:0, purple:0, green:0, gold:3 } }
    ]
  },
  {
    text: "自分に「お疲れさまでした」と言えるのは、どんなとき？",
    sub: "あなたが本当に休めたと感じる瞬間。",
    options: [
      { label: "全部終わったとき。それまで休めない",        scores: { blue:3, purple:1, green:0, gold:0 } },
      { label: "感情が落ち着いたとき",                       scores: { blue:0, purple:3, green:1, gold:0 } },
      { label: "体を動かし終えて、ほっとしたとき",          scores: { blue:1, purple:0, green:3, gold:0 } },
      { label: "気づいたら自然に言えている",                 scores: { blue:0, purple:0, green:0, gold:3 } }
    ]
  },
  {
    text: "「香り」と聞いて、一番最初に心が動くのはどれ？",
    sub: "好き嫌いではなく、ふと引き寄せられるもの。",
    options: [
      { label: "海風や潮の香り、清々しい青さ",              scores: { blue:3, purple:0, green:1, gold:0 } },
      { label: "夜の花や深い木の香り、落ち着く重み",        scores: { blue:0, purple:3, green:1, gold:0 } },
      { label: "森や葉っぱ、深呼吸したくなる緑の香り",      scores: { blue:0, purple:1, green:3, gold:0 } },
      { label: "太陽と花、エネルギーにあふれた明るい香り",  scores: { blue:1, purple:0, green:0, gold:3 } }
    ]
  },
  {
    text: "誰かに「今どう？」と聞かれたとき、正直な答えは？",
    sub: "人に見せている顔じゃなく、本音のほう。",
    options: [
      { label: "忙しい、でもなんとかなってる——と言う",      scores: { blue:3, purple:0, green:1, gold:0 } },
      { label: "うまく言葉にできないけど、なんかしんどい",  scores: { blue:0, purple:3, green:1, gold:0 } },
      { label: "疲れた、少し休みたい",                       scores: { blue:1, purple:1, green:3, gold:0 } },
      { label: "おかげさまで、いい感じ",                     scores: { blue:0, purple:0, green:0, gold:3 } }
    ]
  },
  {
    text: "一人の時間ができたら、あなたはどうしたい？",
    sub: "今の自分が本当に欲しいもの。",
    options: [
      { label: "ぼーっと海を見て、何も考えたくない",        scores: { blue:3, purple:1, green:0, gold:0 } },
      { label: "映画や音楽で、感情をゆっくり動かしたい",    scores: { blue:0, purple:3, green:0, gold:0 } },
      { label: "自然の中を歩いて、体を動かしたい",          scores: { blue:1, purple:0, green:3, gold:0 } },
      { label: "好きなことに夢中になって、時間を忘れたい",  scores: { blue:0, purple:0, green:1, gold:3 } }
    ]
  },
  {
    text: "石垣島の「島時間」という言葉を聞いて、感じることは？",
    sub: "正解はありません。",
    options: [
      { label: "いいな、早くそこに行きたい——と焦る",        scores: { blue:3, purple:0, green:1, gold:0 } },
      { label: "懐かしい、泣きたくなるような感覚",          scores: { blue:0, purple:3, green:1, gold:0 } },
      { label: "深呼吸できそう、とにかく静かにしたい",      scores: { blue:0, purple:1, green:3, gold:0 } },
      { label: "もう少し自分の中に持っている気がする",      scores: { blue:0, purple:0, green:0, gold:3 } }
    ]
  },
  {
    text: "小さなお守りを贈るとしたら、今の自分にどんな言葉を添えますか？",
    sub: "今の自分に最も必要な言葉を選んでみてください。",
    options: [
      { label: "「少しだけ、立ち止まっていいよ」",          scores: { blue:3, purple:0, green:1, gold:0 } },
      { label: "「ちゃんと感じていい、涙も出ていいよ」",    scores: { blue:0, purple:3, green:0, gold:0 } },
      { label: "「ゆっくり息を吸って、また始められるよ」",  scores: { blue:0, purple:1, green:3, gold:0 } },
      { label: "「今の輝きを、もっと信じていいよ」",        scores: { blue:0, purple:0, green:0, gold:3 } }
    ]
  },
  {
    text: "最後に——今のあなたに最も近い石垣島の風景はどれ？",
    sub: "心が引き寄せられる景色を選んでください。",
    options: [
      { label: "真昼の太陽が降り注ぐ、白い砂浜",            scores: { blue:3, purple:0, green:0, gold:1 } },
      { label: "星空の下に咲くサガリバナと、夜の静けさ",    scores: { blue:0, purple:3, green:1, gold:0 } },
      { label: "雨上がりの森、深い緑と清んだ空気",          scores: { blue:0, purple:0, green:3, gold:1 } },
      { label: "朝陽に輝く海、光の粒が踊っている",          scores: { blue:1, purple:0, green:0, gold:3 } }
    ]
  }
];

/* ============================================================
   RESULT TYPES DATA
============================================================ */
var resultTypes = {
  blue: {
    icon: "🌊",
    name: "「島時間」タイプ",
    tag: "Shima-jikan — 流れを緩めるひととき",
    heroBg: "linear-gradient(160deg, #2a6a8c 0%, #3a8aac 50%, #5aaac8 100%)",
    msg: "あなたは今、波が立ちっぱなしの海のような状態かもしれません。忙しく、頭の中は常にフル回転。でも本当はどこかで「少し立ち止まりたい」と感じているはず。青い海風のような香りが、あなたの呼吸をゆっくりと深くしてくれます。急がなくていい。島時間が、少しだけあなたをほどいてくれますよ。",
    sacheName: "香り結び「島哢間」",
    sacheEn: "Kaorin-musubi — Shima Biyori",
    sacheDesc: "石垣島の朝の海風とハイビスカスを想わせる、清々しくも優しいブルーのサシェ。深呼吸のたびに、焦りや緊張がゆっくりと沖へ流れていくような香り。",
    sacheColor: "rgba(90,170,200,0.12)",
    buyUrl: "https://your-base-shop.base.shop/items/blue-sache"  // ★ここを差し替え
  },
  purple: {
    icon: "🌙",
    name: "「夜の潤い」タイプ",
    tag: "Yoru no Uruoi — 感情に寄り添う夜の香り",
    heroBg: "linear-gradient(160deg, #3a2a5c 0%, #5a4a7c 50%, #7a6a9a 100%)",
    msg: "言葉にならない感情や、じんわりとした疲れが溜まっているようです。眠りが浅かったり、胸のどこかが重かったりしませんか？夜に咲くサガリバナのような、深く甘い香りがあなたの感情をそっと包み込み、ゆっくりと眠りへ誘います。今夜は何も解決しなくていい。ただ、香りと一緒に。",
    sacheName: "香り結び「夜の妣い」",
    sacheEn: "Kaorin-musubi — Yoru no Uruoi",
    sacheDesc: "石垣島の夜に咲くサガリバナと深海のような静けさをもつ、紫のサシェ。感情の揺らぎを包み込み、深い眠りとやすらぎを誘う香り。",
    sacheColor: "rgba(122,106,154,0.12)",
    buyUrl: "https://your-base-shop.base.shop/items/purple-sache" // ★ここを差し替え
  },
  green: {
    icon: "🌿",
    name: "「深呼吸」タイプ",
    tag: "Shinkokyuu — 再びはじめる、緑の香り",
    heroBg: "linear-gradient(160deg, #2a5c3a 0%, #4a7c5a 50%, #6a9c7a 100%)",
    msg: "プレッシャーや重さから解放されて、もう一度深呼吸したい——そんな状態にあるようです。体の底のほうに、疲れやだるさが積み重なっているかもしれません。石垣島の森の緑のような、まっすぐで清んだ香りが、あなたの中に眠る「また始めようとする力」を静かに呼び覚まします。",
    sacheName: "香り結び「深呼吸」",
    sacheEn: "Kaorin-musubi — Shinkokyuu",
    sacheDesc: "石垣島の雨上がりの森をイメージした、みずみずしい緑のサシェ。プレッシャーを手放して、また新しい一歩を踏み出せるような力強さと清さを持つ香り。",
    sacheColor: "rgba(106,156,122,0.12)",
    buyUrl: "https://your-base-shop.base.shop/items/green-sache" // ★ここを差し替え
  },
  gold: {
    icon: "✨",
    name: "「光の結び」タイプ",
    tag: "Hikari no Musubi — 輝きを結ぶ、全ての香り",
    heroBg: "linear-gradient(160deg, #8c6a20 0%, #b08a30 50%, #d4aa4c 100%)",
    msg: "今のあなたは、すでに自分の光に気づいているようです。心と体のバランスが整い、前向きなエネルギーが満ちている状態。それをさらに輝かせるために、3つの香りを全て纏ってみてください。石垣島の光が宿った「光の結び」セットが、あなたの毎日をさらに豊かに彩ります。",
    sacheName: "香り結び「光の結び」全部入りセット",
    sacheEn: "Kaorin-musubi — Hikari no Musubi Set",
    sacheDesc: "島時間・夜の潤い・深呼吸、3つの香りをすべてセットに。今の輝きを保ちながら、さらに深く自分と繋がりたいあなたへ。特別なギフトにも。",
    sacheColor: "rgba(201,168,76,0.12)",
    buyUrl: "https://your-base-shop.base.shop/items/full-set" // ★ここを差し替え
  }
};

/* ============================================================
   STATE
============================================================ */
var currentQ  = 0;
var answers   = [];
var scores    = { blue:0, purple:0, green:0, gold:0 };
var finalType = null;

/* ============================================================
   UTILS
============================================================ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('active'); });
  var el = document.getElementById(id);
  el.classList.add('active');
  window.scrollTo(0,0);
}

function triggerGlow() {
  var overlay = document.getElementById('glow-overlay');
  overlay.classList.add('glow');
  setTimeout(function(){ overlay.classList.remove('glow'); }, 700);
}

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('startBtn').addEventListener('click', startDiagnosis);
  document.getElementById('q-next').addEventListener('click', nextQuestion);
  document.getElementById('leadSubmitBtn').addEventListener('click', handleLeadSubmit);
  document.getElementById('skipBtn').addEventListener('click', showResult);
  document.getElementById('lineRegBtn').addEventListener('click', function(){ showResult(); });
  document.getElementById('retryBtn').addEventListener('click', restartDiagnosis);
});

/* ============================================================
   QUIZ
============================================================ */
function startDiagnosis() {
  currentQ = 0; answers = [];
  scores = { blue:0, purple:0, green:0, gold:0 };
  showScreen('screen-question');
  renderQuestion();
}

function restartDiagnosis() { startDiagnosis(); }

function renderQuestion() {
  var q = questions[currentQ];
  var total = questions.length;
  var pct = Math.round((currentQ / total) * 100);

  document.getElementById('q-num').textContent =
    'Question ' + String(currentQ+1).padStart(2,'0') + ' / ' + String(total).padStart(2,'0');
  document.getElementById('q-text').textContent = q.text;
  document.getElementById('q-sub').textContent  = q.sub || '';
  document.getElementById('prog-pct').textContent = pct + '%';
  document.getElementById('prog-fill').style.width = pct + '%';

  var container = document.getElementById('q-options');
  container.innerHTML = '';
  q.options.forEach(function(opt, i){
    var btn = document.createElement('button');
    btn.className = 'q-option';
    if (answers[currentQ] === i) btn.classList.add('selected');

    var dot = document.createElement('span');
    dot.className = 'opt-dot';
    var txt = document.createTextNode(opt.label);
    btn.appendChild(dot);
    btn.appendChild(txt);
    btn.addEventListener('click', function(){ selectOption(i); });
    container.appendChild(btn);
  });

  var nextBtn = document.getElementById('q-next');
  nextBtn.textContent = (currentQ === questions.length - 1) ? '結果を確認する ✦' : '次の問いへ →';
  nextBtn.classList.toggle('enabled', answers[currentQ] !== undefined);
}

function selectOption(idx) {
  answers[currentQ] = idx;
  document.querySelectorAll('.q-option').forEach(function(o,i){
    o.classList.toggle('selected', i === idx);
  });
  document.getElementById('q-next').classList.add('enabled');
  triggerGlow();
}

function nextQuestion() {
  if (answers[currentQ] === undefined) return;

  // Add scores
  var s = questions[currentQ].options[answers[currentQ]].scores;
  scores.blue   += s.blue;
  scores.purple += s.purple;
  scores.green  += s.green;
  scores.gold   += s.gold;

  currentQ++;

  if (currentQ >= questions.length) {
    showScreen('screen-lead');
  } else {
    renderQuestion();
  }
}

/* ============================================================
   LEAD CAPTURE
============================================================ */
function handleLeadSubmit() {
  var email = document.getElementById('lead-email').value.trim();
  if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert('正しいメールアドレスを入力してください。');
    return;
  }
  // ★ここを差し替え（メール送信処理 / Formspree endpoint など）
  // fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form) })
  showResult();
}

/* ============================================================
   RESULT
============================================================ */
function showResult() {
  // Determine best type
  var best = 'blue';
  var keys = ['blue','purple','green','gold'];
  keys.forEach(function(k){ if(scores[k] > scores[best]) best = k; });
  finalType = resultTypes[best];

  // Hero
  document.getElementById('result-hero-bg').style.background = finalType.heroBg;
  document.getElementById('result-icon').textContent    = finalType.icon;
  document.getElementById('result-type-name').textContent = finalType.name;
  document.getElementById('result-type-tag').textContent  = finalType.tag;

  // Message
  document.getElementById('goddess-msg').textContent = finalType.msg;

  // Sache
  var sachePh = document.getElementById('sache-ph');
  sachePh.style.background = 'radial-gradient(circle, #fff9e8, ' + finalType.sacheColor.replace('0.12','0.6') + ')';
  document.getElementById('sache-name').textContent = finalType.sacheName;
  document.getElementById('sache-en').textContent   = finalType.sacheEn;
  document.getElementById('sache-desc').textContent = finalType.sacheDesc;

  // Buy button
  document.getElementById('buy-btn').href = finalType.buyUrl;

  showScreen('screen-result');
}
</script>

</body>
</html>