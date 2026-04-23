import React from "react";
import { LINE_OFFICIAL_FRIEND_URL } from "./diagnosisShared";

/**
 * 【必須・削除禁止】公式LINE 友だち追加（QR + 友だち追加ボタン）。
 * LinePage（/line）専用。ResultPage の LIFF ボタンとは無関係（LINE_OFFICIAL_FRIEND_URL は当コンポーネントのみで使用）。
 */
export function LineOfficialFriendBlock({ linkLabel = "友だち追加はこちら" }) {
  const qrPx = 168;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${qrPx}x${qrPx}&data=${encodeURIComponent(LINE_OFFICIAL_FRIEND_URL)}`;
  const openFriend = () => {
    if (typeof window !== "undefined") {
      window.open(LINE_OFFICIAL_FRIEND_URL, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div className="line-official-friend-block line-official-friend-block--card" role="region" aria-label="公式LINE友だち追加">
      <p className="line-official-friend-block__title">公式LINEで友だち追加</p>
      <p className="line-official-friend-block__note">QRを読み取るか、下のボタンから公式アカウントを追加できます。</p>
      <div className="line-official-friend-block__qr-wrap">
        <img
          className="line-official-friend-block__qr"
          src={qrSrc}
          width={qrPx}
          height={qrPx}
          alt="LINE公式アカウント友だち追加用QRコード"
          loading="lazy"
        />
      </div>
      <button type="button" className="line-official-friend-block__link" onClick={openFriend}>
        {linkLabel}
      </button>
    </div>
  );
}
