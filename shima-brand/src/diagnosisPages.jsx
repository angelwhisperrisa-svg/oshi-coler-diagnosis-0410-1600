import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  VIDEO,
  INTRO_DIAGNOSIS_MS,
  WELCOME_MUTED_END_DELAY_MS,
  LINE_OFFICIAL_URL,
  PENDING_LINE_SEND_KEY,
  LIFF_LOGIN_STARTED_KEY,
  questions,
  results,
  initialScores,
  petals,
  butterflies,
  petalLanes,
  butterflyLanes,
  handleComplete,
  openLineOfficialAccountLink,
  readStoredOshiType,
  clearStoredOshiType,
  writeStoredOshiType,
  normalizeTypeKey,
  resolveFinalResultKey,
  computeResultFromScores,
  getBaseShopUrlForType,
  parseResultRoute,
  REACT_APP_LIFF_ID
} from "./diagnosisShared";

const QUESTION_ENTRY_STEP_PARAM = "step";

/** QuestionPage の phase はこの3つのみ（女神動画は GoddessPage の phase `goddess` のみ） */
const QUESTION_PHASE_INTRO = "intro";
const QUESTION_PHASE_QUIZ = "quiz";
const QUESTION_PHASE_CALCULATING = "calculating";
const QUESTION_PHASE_ALLOWED = new Set([QUESTION_PHASE_INTRO, QUESTION_PHASE_QUIZ, QUESTION_PHASE_CALCULATING]);

/** GoddessPage：女神動画表示フェーズ（QuestionPage の phase 定数とは別系統） */
const GODDESS_PHASE_GODDESS_VIDEO = "goddess";

/** URL 正規化リダイレクトのみ（画面 state は各ページが持つ） */
export function RouteRedirects() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeKeyRef = useRef("");
  const deepLinkConsumedRef = useRef(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const path = (location.pathname || "/").replace(/\/$/, "") || "/";
    const search = location.search || "";
    const key = `${path}${search}`;
    const prevKey = routeKeyRef.current;
    routeKeyRef.current = key;

    const known =
      path === "/" ||
      path === "/start" ||
      path === "/question" ||
      path === "/result" ||
      path.endsWith("/result");
    if (!known) {
      navigate("/", { replace: true });
      return;
    }

    const params = new URLSearchParams(search);
    const typeQ = normalizeTypeKey(params.get("type"));

    if (typeQ && path !== "/result" && !path.endsWith("/result") && path !== "/start") {
      const modeStr = (params.get("mode") || "free").toLowerCase() === "full" ? "full" : "free";
      navigate(`/result?type=${encodeURIComponent(typeQ)}&mode=${modeStr}`, { replace: true });
      return;
    }

    if ((path === "/" || path === "/start") && (params.get("entry") === "diagnosis" || params.get("start") === "1")) {
      navigate("/question", { replace: true });
      return;
    }

    if (path === "/result" || path.endsWith("/result")) {
      const p = parseResultRoute(path, search);
      if (p.autoMissingStorage) {
        deepLinkConsumedRef.current = false;
        navigate("/", { replace: true });
        return;
      }
      if (p.showResult && p.resultType) {
        deepLinkConsumedRef.current = true;
        return;
      }
      if (!deepLinkConsumedRef.current) {
        let pendingType = null;
        try {
          pendingType = normalizeTypeKey(window.sessionStorage.getItem(PENDING_LINE_SEND_KEY) || "");
        } catch (_) {
          /* ignore */
        }
        const storedType = normalizeTypeKey(readStoredOshiType() || "");
        if (pendingType && storedType && pendingType === storedType) {
          deepLinkConsumedRef.current = true;
          navigate(`/result?type=${encodeURIComponent(pendingType)}&mode=free`, { replace: true });
          return;
        }
      }
      navigate("/", { replace: true });
      deepLinkConsumedRef.current = false;
      return;
    }

    if (path === "/" || path === "/start") {
      if (prevKey && (prevKey.startsWith("/question") || prevKey.startsWith("/result"))) {
        deepLinkConsumedRef.current = false;
      }
      if (!deepLinkConsumedRef.current) {
        let pendingType = null;
        try {
          pendingType = normalizeTypeKey(window.sessionStorage.getItem(PENDING_LINE_SEND_KEY) || "");
        } catch (_) {
          /* ignore */
        }
        const storedType = normalizeTypeKey(readStoredOshiType() || "");
        if (pendingType && storedType && pendingType === storedType) {
          deepLinkConsumedRef.current = true;
          navigate(`/result?type=${encodeURIComponent(pendingType)}&mode=free`, { replace: true });
        }
      }
    }
  }, [location.pathname, location.search, navigate]);

  return null;
}

/** / と /start：女神〜診断前カードのみ */
export function GoddessPage() {
  const navigate = useNavigate();
  const [welcomeMuted, setWelcomeMuted] = useState(true);
  const [welcomeExiting, setWelcomeExiting] = useState(false);
  const [phase, setPhase] = useState(GODDESS_PHASE_GODDESS_VIDEO);
  const welcomeVideoRef = useRef(null);
  const welcomeExitTimerRef = useRef(null);
  const welcomeSilentSkipTimerRef = useRef(null);
  const welcomeEngagedRef = useRef(false);

  const immersive = phase === GODDESS_PHASE_GODDESS_VIDEO;

  useEffect(() => {
    if (phase !== GODDESS_PHASE_GODDESS_VIDEO) return undefined;
    const v = welcomeVideoRef.current;
    if (!v) return undefined;
    v.muted = welcomeMuted;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
    return undefined;
  }, [phase, welcomeMuted]);

  useEffect(() => {
    if (phase === GODDESS_PHASE_GODDESS_VIDEO) return undefined;
    if (welcomeSilentSkipTimerRef.current) {
      window.clearTimeout(welcomeSilentSkipTimerRef.current);
      welcomeSilentSkipTimerRef.current = null;
    }
    if (welcomeExitTimerRef.current) {
      window.clearTimeout(welcomeExitTimerRef.current);
      welcomeExitTimerRef.current = null;
    }
    return undefined;
  }, [phase]);

  useEffect(() => {
    if (phase !== "intro") return undefined;
    const t = window.setTimeout(() => setPhase("start"), INTRO_DIAGNOSIS_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(
    () => () => {
      if (welcomeExitTimerRef.current) window.clearTimeout(welcomeExitTimerRef.current);
      if (welcomeSilentSkipTimerRef.current) window.clearTimeout(welcomeSilentSkipTimerRef.current);
    },
    []
  );

  const handleWelcomeSoundOn = () => {
    if (welcomeSilentSkipTimerRef.current) {
      window.clearTimeout(welcomeSilentSkipTimerRef.current);
      welcomeSilentSkipTimerRef.current = null;
    }
    welcomeEngagedRef.current = true;
    const v = welcomeVideoRef.current;
    setWelcomeMuted(false);
    if (v) {
      v.muted = false;
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  const handleWelcomeEnded = () => {
    const v = welcomeVideoRef.current;
    if (welcomeEngagedRef.current) {
      if (!v || v.muted) return;
      if (welcomeExitTimerRef.current) window.clearTimeout(welcomeExitTimerRef.current);
      setWelcomeExiting(true);
      welcomeExitTimerRef.current = window.setTimeout(() => {
        welcomeExitTimerRef.current = null;
        setWelcomeExiting(false);
        setPhase("intro");
      }, 480);
      return;
    }
    if (welcomeSilentSkipTimerRef.current) {
      window.clearTimeout(welcomeSilentSkipTimerRef.current);
    }
    welcomeSilentSkipTimerRef.current = window.setTimeout(() => {
      welcomeSilentSkipTimerRef.current = null;
      setWelcomeExiting(false);
      setPhase("intro");
    }, WELCOME_MUTED_END_DELAY_MS);
  };

  const beginDiagnosisQuiz = () => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(PENDING_LINE_SEND_KEY);
        window.sessionStorage.removeItem(LIFF_LOGIN_STARTED_KEY);
      }
    } catch (_) {
      /* ignore */
    }
    navigate("/question");
  };

  return (
    <div className={`page${immersive ? " page--immersive" : ""}`}>
      {!immersive && (
        <>
          <div className="float-layer-back">
            {petals.map((p, idx) => (
              <span
                key={`p-${idx}`}
                className="float-item petal"
                style={{
                  left: `${petalLanes[idx % petalLanes.length]}%`,
                  animationDuration: `${11 + idx * 1.8}s`,
                  animationDelay: `${idx * 1.1}s`,
                  opacity: 0.17,
                  transform: "scale(0.92)"
                }}
              >
                {p}
              </span>
            ))}
            {butterflies.map((b, idx) => (
              <span
                key={`b-${idx}`}
                className="float-item butterfly"
                style={{
                  left: `${butterflyLanes[idx % butterflyLanes.length]}%`,
                  top: `${idx % 2 === 0 ? 10 : 78}%`,
                  animationDuration: `${8 + idx * 2.2}s`,
                  animationDelay: `${idx * 1.4}s`,
                  opacity: 0.15,
                  transform: "scale(0.9)"
                }}
              >
                {b}
              </span>
            ))}
          </div>
          <div className="float-layer-mid">
            {petals.slice(0, 4).map((p, idx) => (
              <span
                key={`mp-${idx}`}
                className="float-item petal"
                style={{
                  left: `${idx < 2 ? 10 + idx * 8 : 82 + idx * 4}%`,
                  animationDuration: `${15 + idx * 1.1}s`,
                  animationDelay: `${0.6 + idx * 0.9}s`,
                  opacity: 0.2,
                  transform: "scale(0.95)"
                }}
              >
                {p}
              </span>
            ))}
            {butterflies.slice(0, 2).map((b, idx) => (
              <span
                key={`mb-${idx}`}
                className="float-item butterfly"
                style={{
                  left: `${idx === 0 ? 8 : 92}%`,
                  top: `${idx === 0 ? 20 : 72}%`,
                  animationDuration: `${12 + idx * 2.1}s`,
                  animationDelay: `${0.8 + idx * 1.3}s`,
                  opacity: 0.19,
                  transform: "scale(0.95)"
                }}
              >
                {b}
              </span>
            ))}
          </div>

          <main className="container">
            <header className="header">
              <div className="sub">✦ Color Diagnosis ✦</div>
              <h1 className="title">推し活💜推し色占い</h1>
              <p className="desc">あなたにふさわしい推し色を教えてくれる。</p>
            </header>

            {(phase === "start" || phase === "intro") && (
              <section className="card start-screen">
                <div className="orb">
                  <div className="orb-aurora" />
                  <div className="orb-flow" />
                  <span className="orb-heart">💜</span>
                </div>
                <p className="start-text">
                  公式LINEを友だち追加すると、お送りするリンクから推し色診断（全7問）へ進めます。まずはLINEへどうぞ。
                </p>
                <a className="start-btn" href={LINE_OFFICIAL_URL}>
                  LINE登録して診断を始める✨
                </a>
              </section>
            )}

          </main>
        </>
      )}

      {phase === GODDESS_PHASE_GODDESS_VIDEO && (
        <div className={`video-stage video-stage--welcome${welcomeExiting ? " video-stage--welcome-exit" : ""}`}>
          <div className="video-layer video-layer--welcome">
            <video
              ref={welcomeVideoRef}
              src={VIDEO.welcome}
              playsInline
              autoPlay
              muted={welcomeMuted}
              preload="auto"
              onEnded={handleWelcomeEnded}
            />
          </div>
          <div className="welcome-overlay welcome-overlay--dual">
            <button type="button" className="welcome-glass-btn" onClick={handleWelcomeSoundOn}>
              音声をオンにする
            </button>
            <button type="button" className="welcome-glass-btn" onClick={beginDiagnosisQuiz}>
              診断する
            </button>
            <a className="welcome-line-btn" href={LINE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">
              LINEで診断を受ける
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/** /question：レインボー診断の入口 → 7問 → 集計動画（女神動画は GoddessPage のみ） */
export function QuestionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState(initialScores);
  /** レインボー説明 / 7問 / 集計動画のみ（女神用フェーズ名は GoddessPage のみ） */
  const [phase, setPhase] = useState(QUESTION_PHASE_INTRO);
  const resultKeyRef = useRef("");
  const [resultModeFull] = useState(false);
  const finalVideoRef = useRef(null);

  useLayoutEffect(() => {
    const step = (searchParams.get(QUESTION_ENTRY_STEP_PARAM) || "").toLowerCase();
    if (step === QUESTION_PHASE_QUIZ) {
      setPhase(QUESTION_PHASE_QUIZ);
      setCurrentQ(0);
      setScores(initialScores);
      resultKeyRef.current = "";
      return;
    }
    setPhase(QUESTION_PHASE_INTRO);
    setCurrentQ(0);
    setScores(initialScores);
    resultKeyRef.current = "";
  }, [searchParams]);

  useEffect(() => {
    if (QUESTION_PHASE_ALLOWED.has(phase)) return;
    setPhase(QUESTION_PHASE_INTRO);
  }, [phase]);

  const progress = Math.round((currentQ / questions.length) * 100);
  const currentQuestion = questions[currentQ];
  const immersive = phase === QUESTION_PHASE_CALCULATING;

  useEffect(() => {
    if (phase !== QUESTION_PHASE_CALCULATING) return;
    const v = finalVideoRef.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [phase]);

  const selectChoice = (scoreMap) => {
    const nextScores = { ...scores };
    Object.entries(scoreMap).forEach(([k, v]) => {
      nextScores[k] += v;
    });
    const nextQ = currentQ + 1;
    setScores(nextScores);
    if (nextQ < questions.length) {
      setCurrentQ(nextQ);
      return;
    }
    const topResultKey = computeResultFromScores(nextScores);
    resultKeyRef.current = topResultKey;
    setPhase(QUESTION_PHASE_CALCULATING);
  };

  return (
    <div className={`page${immersive ? " page--immersive" : ""}`}>
      {!immersive && (
        <>
          <div className="float-layer-back">
            {petals.map((p, idx) => (
              <span
                key={`qp-${idx}`}
                className="float-item petal"
                style={{
                  left: `${petalLanes[idx % petalLanes.length]}%`,
                  animationDuration: `${11 + idx * 1.8}s`,
                  animationDelay: `${idx * 1.1}s`,
                  opacity: 0.17,
                  transform: "scale(0.92)"
                }}
              >
                {p}
              </span>
            ))}
            {butterflies.map((b, idx) => (
              <span
                key={`qb-${idx}`}
                className="float-item butterfly"
                style={{
                  left: `${butterflyLanes[idx % butterflyLanes.length]}%`,
                  top: `${idx % 2 === 0 ? 10 : 78}%`,
                  animationDuration: `${8 + idx * 2.2}s`,
                  animationDelay: `${idx * 1.4}s`,
                  opacity: 0.15,
                  transform: "scale(0.9)"
                }}
              >
                {b}
              </span>
            ))}
          </div>
          <div className="float-layer-mid">
            {petals.slice(0, 4).map((p, idx) => (
              <span
                key={`qmp-${idx}`}
                className="float-item petal"
                style={{
                  left: `${idx < 2 ? 10 + idx * 8 : 82 + idx * 4}%`,
                  animationDuration: `${15 + idx * 1.1}s`,
                  animationDelay: `${0.6 + idx * 0.9}s`,
                  opacity: 0.2,
                  transform: "scale(0.95)"
                }}
              >
                {p}
              </span>
            ))}
            {butterflies.slice(0, 2).map((b, idx) => (
              <span
                key={`qmb-${idx}`}
                className="float-item butterfly"
                style={{
                  left: `${idx === 0 ? 8 : 92}%`,
                  top: `${idx === 0 ? 20 : 72}%`,
                  animationDuration: `${12 + idx * 2.1}s`,
                  animationDelay: `${0.8 + idx * 1.3}s`,
                  opacity: 0.19,
                  transform: "scale(0.95)"
                }}
              >
                {b}
              </span>
            ))}
          </div>

          <main className="container">
            <header className="header">
              <div className="sub">✦ Color Diagnosis ✦</div>
              <h1 className="title">推し活💜推し色占い</h1>
              <p className="desc">あなたにふさわしい推し色を教えてくれる。</p>
            </header>

            {phase === QUESTION_PHASE_INTRO && (
              <section className="card start-screen">
                <div className="orb">
                  <div className="orb-aurora" />
                  <div className="orb-flow" />
                  <span className="orb-heart">💜</span>
                </div>
                <p className="start-text">
                  7つの質問で、あなただけの「推し色」が見つかる。色には感情がある。あなたはどの色に選ばれるのでしょう。
                </p>
                <button
                  type="button"
                  className="choice-btn diagnosis-quiz-start"
                  onClick={() => {
                    navigate(`/question?${QUESTION_ENTRY_STEP_PARAM}=${QUESTION_PHASE_QUIZ}`, { replace: true });
                  }}
                >
                  <span className="choice-icon" aria-hidden>
                    ✨
                  </span>
                  <span>7問の診断を始める</span>
                </button>
                <div className="floating-note">全7問・約1分</div>
              </section>
            )}

            {phase === QUESTION_PHASE_QUIZ && currentQuestion && (
              <>
                <div className="progress-wrap">
                  <div className="progress-label">
                    <span>{`Q${currentQ + 1} / ${questions.length}`}</span>
                    <span>{`${progress}%`}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <section className="card">
                  <div className="question-num">{`QUESTION ${String(currentQ + 1).padStart(2, "0")}`}</div>
                  <h2 className="question-text">{currentQuestion.text}</h2>
                  <div className="choices">
                    {currentQuestion.choices.map((choice, idx) => (
                      <button
                        key={`${choice.text}-${idx}`}
                        type="button"
                        className="choice-btn"
                        onClick={() => selectChoice(choice.scores)}
                      >
                        <span className="choice-icon">{choice.icon}</span>
                        <span>{choice.text}</span>
                      </button>
                    ))}
                  </div>
                </section>
              </>
            )}
          </main>
        </>
      )}

      {phase === QUESTION_PHASE_CALCULATING && (
        <div className="video-stage video-stage--final">
          <div className="video-layer video-layer--final">
            <video
              ref={finalVideoRef}
              src={VIDEO.final}
              playsInline
              preload="auto"
              onEnded={() => {
                const k = resultKeyRef.current;
                const modeStr = resultModeFull ? "full" : "free";
                navigate(`/result?type=${encodeURIComponent(k)}&mode=${modeStr}`, { replace: true });
              }}
            />
          </div>
          <p className="calc-caption">結果を導き出しています...</p>
        </div>
      )}
    </div>
  );
}

const RESULT_LINE_NEXT_COPY = `この先では、

・なぜこの色になったのか
・今のあなたの状態
・現実でどう活かすか

をLINEでお届けします✨`;

/** LINE「テキストで送信」用。`resultKey` は常に URL `?type=` を normalize した診断キー（mint / lavender …）のみを渡す */
function buildLineTextShareUrl(resultKeyNorm) {
  const key = (resultKeyNorm && String(resultKeyNorm).trim()) || "";
  if (!key) return null;
  return `https://line.me/R/msg/text/?${encodeURIComponent(key)}`;
}

/** /result：結果カードと LINE 送信のみ */
export function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  /** 現在の診断タイプ: 常に URL の ?type= から正規化（undefined にならないよう null は空文字にしない — 無効時は null のままリダイレクト） */
  const resultKey = normalizeTypeKey(searchParams.get("type") || "");
  const resultModeFull = (searchParams.get("mode") || "free").toLowerCase() === "full";
  const result = resultKey ? results[resultKey] : null;
  const resultKeyRef = useRef(resultKey || "");

  const [liffCompleteError, setLiffCompleteError] = useState("");
  const [liffSaveLoading, setLiffSaveLoading] = useState(false);
  const [lineLoginResumeBump, setLineLoginResumeBump] = useState(0);
  const liffMsgSentRef = useRef(false);
  const liffSaveInFlightRef = useRef(false);

  useLayoutEffect(() => {
    if (!resultKey || !result) {
      navigate("/", { replace: true });
    }
  }, [resultKey, result, navigate]);

  useEffect(() => {
    resultKeyRef.current = resultKey || "";
    if (resultKey) writeStoredOshiType(resultKey);
  }, [resultKey]);

  useEffect(() => {
    const onPageShow = (e) => {
      if (e && e.persisted) {
        setLineLoginResumeBump((n) => n + 1);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("pageshow", onPageShow);
      return () => window.removeEventListener("pageshow", onPageShow);
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (!REACT_APP_LIFF_ID) return undefined;

    const urlParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search || "" : "");
    const typeFromUrl = urlParams.get("type");

    let pendingRaw = "";
    try {
      pendingRaw = typeof window !== "undefined" ? window.sessionStorage.getItem(PENDING_LINE_SEND_KEY) || "" : "";
    } catch (_) {
      /* ignore */
    }
    const pending = normalizeTypeKey(pendingRaw);
    const urlType = normalizeTypeKey(typeFromUrl || "");

    const finalResultKey = resolveFinalResultKey(resultKeyRef.current || resultKey, typeFromUrl, pendingRaw);
    if (!finalResultKey) return undefined;

    const pendingOk = Boolean(pending && pending === finalResultKey);
    const urlOk = Boolean(urlType && urlType === finalResultKey);
    if (!pendingOk && !urlOk) {
      return undefined;
    }

    if (liffMsgSentRef.current) return undefined;
    if (liffSaveInFlightRef.current) return undefined;

    let cancelled = false;
    (async () => {
      try {
        liffSaveInFlightRef.current = true;
        setLiffSaveLoading(true);
        setLiffCompleteError("");
        const liffMod = await import("@line/liff");
        const liff = liffMod.default;
        const uaResume = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
        const likelyLineInAppResume = /Line\//i.test(uaResume);
        await liff.init({
          liffId: REACT_APP_LIFF_ID,
          ...(likelyLineInAppResume ? {} : { withLoginOnExternalBrowser: true })
        });
        if (cancelled) return;
        if (!liff.isLoggedIn()) {
          return;
        }
        const urlParamsNow = new URLSearchParams(window.location.search || "");
        const typeFromUrlNow = urlParamsNow.get("type");
        let pendingRawNow = "";
        try {
          pendingRawNow = window.sessionStorage.getItem(PENDING_LINE_SEND_KEY) || "";
        } catch (_) {
          /* ignore */
        }
        const pendingNow = normalizeTypeKey(pendingRawNow);
        const urlTypeNow = normalizeTypeKey(typeFromUrlNow || "");
        const finalResultKeyNow = resolveFinalResultKey(resultKeyRef.current || resultKey, typeFromUrlNow, pendingRawNow);
        if (!finalResultKeyNow) return;
        const stillPendingOk = Boolean(pendingNow && pendingNow === finalResultKeyNow);
        const stillUrlOk = Boolean(urlTypeNow && urlTypeNow === finalResultKeyNow);
        if (!stillPendingOk && !stillUrlOk) {
          return;
        }
        const out = await handleComplete(finalResultKeyNow);
        if (cancelled) return;
        if (out.ok) {
          liffMsgSentRef.current = true;
          setLiffCompleteError("");
          const rk = finalResultKeyNow || resultKey || "";
          const shareUrl = buildLineTextShareUrl(rk);
          if (shareUrl) window.location.href = shareUrl;
          else await openLineOfficialAccountLink();
        } else if (out.message) {
          setLiffCompleteError(out.message);
        }
      } catch (e) {
        if (!cancelled) {
          setLiffCompleteError("送信処理でエラーが発生しました。もう一度ボタンからお試しください。");
        }
      } finally {
        if (!cancelled) {
          liffSaveInFlightRef.current = false;
          setLiffSaveLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [resultKey, lineLoginResumeBump]);

  const resetDiagnosis = () => {
    setLiffCompleteError("");
    setLiffSaveLoading(false);
    liffSaveInFlightRef.current = false;
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(PENDING_LINE_SEND_KEY);
        window.sessionStorage.removeItem(LIFF_LOGIN_STARTED_KEY);
      }
    } catch (_) {
      /* ignore */
    }
    liffMsgSentRef.current = false;
    clearStoredOshiType();
    navigate("/", { replace: true });
  };

  const renderLineContinueBlock = () => {
    /** 優先: URL `?type=` 正規化（resultKey）。欠ける場合のみ session の推し色（writeStoredOshiType と同じ系） */
    const diagnosticResultKey =
      (resultKey && String(resultKey).trim()) || normalizeTypeKey(readStoredOshiType() || "") || "";
    const textForLineProbe =
      (result && typeof result.name === "string" && result.name.trim()) || diagnosticResultKey;
    return (
      <div className="result-line-next-wrap">
        <p className="result-line-next-copy">{RESULT_LINE_NEXT_COPY}</p>
        <button
          type="button"
          className="result-line-next-btn"
          disabled={!diagnosticResultKey}
          onClick={async (ev) => {
            ev.preventDefault();
            console.log("button clicked");
            console.log("diagnosticResultKey:", diagnosticResultKey);
            if (!diagnosticResultKey) {
              console.warn("LINE button: diagnosticResultKey empty — early return (if (!diagnosticResultKey))");
              setLiffCompleteError("診断結果を取得できませんでした。画面を更新するか、もう一度診断してください。");
              return;
            }
            const lineTextShareHref = `https://line.me/R/msg/text/?${encodeURIComponent(diagnosticResultKey)}`;
            setLiffCompleteError("");
            console.log("LINE button: opening text share", { lineTextShareHref, textForLineProbe });
            window.location.href = lineTextShareHref;
          }}
        >
          LINEで続きを受け取る🩷
        </button>
      </div>
    );
  };

  const renderOshiResultCard = (res, isFull, typeKey) => {
    const baseShopUrl = getBaseShopUrlForType(typeKey);
    const renderBaseCta = () => (
      <div className="result-base-cta-wrap">
        <div className="result-base-guide">
          <p className="result-base-guide-title">LINE登録の次は、こちらからフル鑑定へ</p>
          <p className="result-base-guide-sub">あなたの推し色に合わせた詳細診断をBASEで確認できます。</p>
        </div>
        <a className="result-base-cta" href={baseShopUrl} target="_blank" rel="noopener noreferrer">
          {`▶ BASEで${res.name}のフル鑑定を見る`}
        </a>
      </div>
    );
    const header = (
      <>
        <div className="result-label">YOUR OSHI COLOR</div>
        <div className="result-ball" style={{ background: res.gradient }} />
        <h2
          className="result-name"
          style={{
            background: res.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          {res.name}
        </h2>
        <div className="result-sub">{res.sub}</div>
        <p className="result-lead">{`あなたの推し色は「${res.name}」`}</p>
      </>
    );

    if (isFull) {
      return (
        <section className="result-card result-card--reveal">
          {header}
          <div className="result-free-wrap">
            <div className="result-free-block">
              <p className="result-free-chunk">{res.fullBody}</p>
            </div>
          </div>
          {renderBaseCta()}
        </section>
      );
    }

    return (
      <section className="result-card result-card--reveal">
        {header}
        <div className="result-free-wrap">
          <div className="result-free-block">
            <p className="result-free-chunk">{res.teaserFree}</p>
          </div>
        </div>
        <p className="result-hook">{res.hookBeforeLock}</p>
        <div className="locked-result">
          <div className="locked-content" aria-hidden>
            <p className="result-free-chunk">{res.lockedBody}</p>
          </div>
          <div className="lock-overlay">
            <div className="lock-icon" aria-hidden>
              🔒
            </div>
            <div className="lock-title">続きの鑑定はLINEトークでお届けします。</div>
          </div>
        </div>
        {renderLineContinueBlock()}
        {renderBaseCta()}
        <div className="result-retry-row">
          <button type="button" className="retry-btn" onClick={resetDiagnosis}>
            もう一度、推し色を見つける
          </button>
        </div>
      </section>
    );
  };

  if (!resultKey || !result) {
    return null;
  }

  return (
    <div className="page">
      <div className="float-layer-back">
        {petals.map((p, idx) => (
          <span
            key={`rp-${idx}`}
            className="float-item petal"
            style={{
              left: `${petalLanes[idx % petalLanes.length]}%`,
              animationDuration: `${11 + idx * 1.8}s`,
              animationDelay: `${idx * 1.1}s`,
              opacity: 0.17,
              transform: "scale(0.92)"
            }}
          >
            {p}
          </span>
        ))}
        {butterflies.map((b, idx) => (
          <span
            key={`rb-${idx}`}
            className="float-item butterfly"
            style={{
              left: `${butterflyLanes[idx % butterflyLanes.length]}%`,
              top: `${idx % 2 === 0 ? 10 : 78}%`,
              animationDuration: `${8 + idx * 2.2}s`,
              animationDelay: `${idx * 1.4}s`,
              opacity: 0.15,
              transform: "scale(0.9)"
            }}
          >
            {b}
          </span>
        ))}
      </div>
      <div className="float-layer-mid">
        {petals.slice(0, 4).map((p, idx) => (
          <span
            key={`rmp-${idx}`}
            className="float-item petal"
            style={{
              left: `${idx < 2 ? 10 + idx * 8 : 82 + idx * 4}%`,
              animationDuration: `${15 + idx * 1.1}s`,
              animationDelay: `${0.6 + idx * 0.9}s`,
              opacity: 0.2,
              transform: "scale(0.95)"
            }}
          >
            {p}
          </span>
        ))}
        {butterflies.slice(0, 2).map((b, idx) => (
          <span
            key={`rmb-${idx}`}
            className="float-item butterfly"
            style={{
              left: `${idx === 0 ? 8 : 92}%`,
              top: `${idx === 0 ? 20 : 72}%`,
              animationDuration: `${12 + idx * 2.1}s`,
              animationDelay: `${0.8 + idx * 1.3}s`,
              opacity: 0.19,
              transform: "scale(0.95)"
            }}
          >
            {b}
          </span>
        ))}
      </div>

      <main className="container">
        <header className="header">
          <div className="sub">✦ Color Diagnosis ✦</div>
          <h1 className="title">推し活💜推し色占い</h1>
          <p className="desc">あなたにふさわしい推し色を教えてくれる。</p>
        </header>
        {liffCompleteError ? (
          <div className="result-liff-error" role="alert">
            <p className="result-liff-error__text">{liffCompleteError}</p>
          </div>
        ) : null}
        {liffSaveLoading && !liffCompleteError ? (
          <div className="result-liff-sending">結果をLINEに送信中です…</div>
        ) : null}
        {renderOshiResultCard(result, resultModeFull, resultKey)}
      </main>
    </div>
  );
}
