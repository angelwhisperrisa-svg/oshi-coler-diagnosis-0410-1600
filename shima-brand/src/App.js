import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { styles } from "./diagnosisShared";
import { GoddessPage, QuestionPage, ResultPage, RouteRedirects } from "./diagnosisPages";

export default function App() {
  return (
    <>
      <style>{styles}</style>
      <RouteRedirects />
      <Routes>
        <Route path="/" element={<GoddessPage />} />
        <Route path="/start" element={<GoddessPage />} />
        <Route path="/question" element={<QuestionPage key="page-question" />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
