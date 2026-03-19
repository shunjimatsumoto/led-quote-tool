"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  ledProducts,
  controllers,
  calculateQuote,
  type QuoteInput,
} from "./data";

type Theme = "dark" | "gray" | "white";

const themes = {
  dark: {
    bg: "bg-gray-950",
    card: "bg-gray-900",
    cardBorder: "border-gray-700",
    text: "text-gray-100",
    textMuted: "text-gray-400",
    textHeading: "text-gray-200",
    input: "bg-gray-800 border-gray-600 text-gray-100",
    select: "bg-gray-800 border-gray-600 text-gray-100",
    accent: "text-blue-400",
    btnBg: "bg-blue-500 hover:bg-blue-600",
    borderRow: "border-gray-700",
    totalBg: "bg-gray-800",
  },
  gray: {
    bg: "bg-gray-700",
    card: "bg-gray-600",
    cardBorder: "border-gray-500",
    text: "text-gray-100",
    textMuted: "text-gray-300",
    textHeading: "text-gray-100",
    input: "bg-gray-500 border-gray-400 text-gray-100",
    select: "bg-gray-500 border-gray-400 text-gray-100",
    accent: "text-blue-300",
    btnBg: "bg-blue-600 hover:bg-blue-700",
    borderRow: "border-gray-500",
    totalBg: "bg-gray-500",
  },
  white: {
    bg: "bg-gray-50",
    card: "bg-white",
    cardBorder: "border-gray-200",
    text: "text-gray-800",
    textMuted: "text-gray-600",
    textHeading: "text-gray-700",
    input: "bg-white border-gray-300 text-gray-800",
    select: "bg-white border-gray-300 text-gray-800",
    accent: "text-blue-700",
    btnBg: "bg-blue-600 hover:bg-blue-700",
    borderRow: "border-gray-200",
    totalBg: "bg-gray-100",
  },
};

const defaultInput: QuoteInput = {
  width: 5000,
  height: 2000,
  productId: "USLIMII-P2p5-NSG-500x1000",
  controllerId: "VX1000",
  spareModules: 4,
  powerReceiverCards: 8,
  usdRate: 160,
  shippingUsd: 1500,
  customsClearanceUsd: 1500,
  constructionUsd: 0,
  profitMargin: 0.3,
};

function formatJpy(n: number) {
  return "¥" + Math.round(n).toLocaleString("ja-JP");
}

function formatUsd(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

// Group products by model
const modelGroups = ledProducts.reduce(
  (acc, p) => {
    if (!acc[p.model]) acc[p.model] = [];
    acc[p.model].push(p);
    return acc;
  },
  {} as Record<string, typeof ledProducts>
);

export default function Home() {
  const [input, setInput] = useState<QuoteInput>(defaultInput);
  const [customerName, setCustomerName] = useState("");
  const [quoteDate, setQuoteDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [validUntil, setValidUntil] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });
  const [remarks, setRemarks] = useState("輸送費・通関費を含む概算見積です");
  const printRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const t = themes[theme];

  useEffect(() => {
    const saved = localStorage.getItem("led-quote-theme") as Theme | null;
    if (saved && themes[saved]) setTheme(saved);
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("led-quote-theme", newTheme);
  };

  const result = useMemo(() => calculateQuote(input), [input]);

  const update = (field: keyof QuoteInput, value: string | number) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} transition-colors duration-200 print:bg-white print:text-gray-900`}>
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6 print:hidden">
        <h1 className={`text-2xl font-bold ${t.textHeading}`}>
          LED見積作成ツール
        </h1>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${t.textMuted}`}>テーマ:</span>
          <button
            onClick={() => changeTheme("dark")}
            className={`w-8 h-8 rounded-full bg-gray-900 border-2 cursor-pointer ${theme === "dark" ? "border-blue-400 ring-2 ring-blue-400/50" : "border-gray-600"}`}
            title="ダーク"
          />
          <button
            onClick={() => changeTheme("gray")}
            className={`w-8 h-8 rounded-full bg-gray-500 border-2 cursor-pointer ${theme === "gray" ? "border-blue-400 ring-2 ring-blue-400/50" : "border-gray-400"}`}
            title="グレー"
          />
          <button
            onClick={() => changeTheme("white")}
            className={`w-8 h-8 rounded-full bg-white border-2 cursor-pointer ${theme === "white" ? "border-blue-400 ring-2 ring-blue-400/50" : "border-gray-300"}`}
            title="ホワイト"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:hidden">
        {/* Input Form */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className={`${t.card} rounded-lg shadow p-6 border ${t.cardBorder}`}>
            <h2 className={`text-lg font-semibold mb-4 ${t.textHeading}`}>
              顧客情報
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>宛先（会社名・担当者名）</span>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="例: 株式会社〇〇 御中"
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className={`text-sm ${t.textMuted}`}>見積日</span>
                  <input
                    type="date"
                    value={quoteDate}
                    onChange={(e) => setQuoteDate(e.target.value)}
                    className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                  />
                </label>
                <label className="block">
                  <span className={`text-sm ${t.textMuted}`}>有効期限</span>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Product Selection */}
          <div className={`${t.card} rounded-lg shadow p-6 border ${t.cardBorder}`}>
            <h2 className={`text-lg font-semibold mb-4 ${t.textHeading}`}>
              製品選択
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>製品</span>
                <select
                  value={input.productId}
                  onChange={(e) => update("productId", e.target.value)}
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                >
                  {Object.entries(modelGroups).map(([model, products]) => (
                    <optgroup key={model} label={model}>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.model} P{p.pitch} {p.ledType} ({p.cabinetSize}) — {formatUsd(p.usdPerSqm)}/㎡
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>コントローラー</span>
                <select
                  value={input.controllerId}
                  onChange={(e) => update("controllerId", e.target.value)}
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                >
                  {controllers.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} — {formatUsd(c.usd)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Size */}
          <div className={`${t.card} rounded-lg shadow p-6 border ${t.cardBorder}`}>
            <h2 className={`text-lg font-semibold mb-4 ${t.textHeading}`}>
              サイズ・数量
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>横幅 (mm)</span>
                <input
                  type="number"
                  value={input.width}
                  onChange={(e) => update("width", Number(e.target.value))}
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                />
              </label>
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>高さ (mm)</span>
                <input
                  type="number"
                  value={input.height}
                  onChange={(e) => update("height", Number(e.target.value))}
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                />
              </label>
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>スペアモジュール数</span>
                <input
                  type="number"
                  value={input.spareModules}
                  onChange={(e) =>
                    update("spareModules", Number(e.target.value))
                  }
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                />
              </label>
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>電源+受信カード数</span>
                <input
                  type="number"
                  value={input.powerReceiverCards}
                  onChange={(e) =>
                    update("powerReceiverCards", Number(e.target.value))
                  }
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                />
              </label>
            </div>
          </div>

          {/* Cost Parameters */}
          <div className={`${t.card} rounded-lg shadow p-6 border ${t.cardBorder}`}>
            <h2 className={`text-lg font-semibold mb-4 ${t.textHeading}`}>
              コスト設定
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>ドルレート (円)</span>
                <input
                  type="number"
                  value={input.usdRate}
                  onChange={(e) => update("usdRate", Number(e.target.value))}
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                />
              </label>
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>利益率 (%)</span>
                <input
                  type="number"
                  value={Math.round(input.profitMargin * 100)}
                  onChange={(e) =>
                    update("profitMargin", Number(e.target.value) / 100)
                  }
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                />
              </label>
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>輸送費 (USD)</span>
                <input
                  type="number"
                  value={input.shippingUsd}
                  onChange={(e) =>
                    update("shippingUsd", Number(e.target.value))
                  }
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                />
              </label>
              <label className="block">
                <span className={`text-sm ${t.textMuted}`}>通関費 (USD)</span>
                <input
                  type="number"
                  value={input.customsClearanceUsd}
                  onChange={(e) =>
                    update("customsClearanceUsd", Number(e.target.value))
                  }
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                />
              </label>
              <label className="block col-span-2">
                <span className={`text-sm ${t.textMuted}`}>施工費 (USD)</span>
                <input
                  type="number"
                  value={input.constructionUsd}
                  onChange={(e) =>
                    update("constructionUsd", Number(e.target.value))
                  }
                  className={`mt-1 block w-full rounded border px-3 py-2 text-sm ${t.input}`}
                />
              </label>
            </div>
          </div>

          {/* Remarks */}
          <div className={`${t.card} rounded-lg shadow p-6 border ${t.cardBorder}`}>
            <h2 className={`text-lg font-semibold mb-4 ${t.textHeading}`}>備考</h2>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className={`block w-full rounded border px-3 py-2 text-sm ${t.input}`}
            />
          </div>
        </div>

        {/* Live Preview (non-print) */}
        <div className="space-y-6">
          {/* Cost Breakdown */}
          {result && (
            <div className={`${t.card} rounded-lg shadow p-6 border ${t.cardBorder}`}>
              <h2 className={`text-lg font-semibold mb-4 ${t.textHeading}`}>
                原価計算
              </h2>
              <table className="w-full text-sm">
                <tbody>
                  <tr className={`${t.borderRow} border-b`}>
                    <td className={`py-2 ${t.textMuted}`}>面積</td>
                    <td className="py-2 text-right font-mono">
                      {result.areaSqm} ㎡
                    </td>
                  </tr>
                  <tr className={`${t.borderRow} border-b`}>
                    <td className={`py-2 ${t.textMuted}`}>USD単価/㎡</td>
                    <td className="py-2 text-right font-mono">
                      {formatUsd(result.usdPerSqm)}
                    </td>
                  </tr>
                  <tr className={`${t.borderRow} border-b`}>
                    <td className={`py-2 ${t.textMuted}`}>パネル原価</td>
                    <td className="py-2 text-right font-mono">
                      {formatUsd(result.panelCostUsd)}
                    </td>
                  </tr>
                  <tr className={`${t.borderRow} border-b`}>
                    <td className={`py-2 ${t.textMuted}`}>コントローラー</td>
                    <td className="py-2 text-right font-mono">
                      {formatUsd(result.controllerUsd)}
                    </td>
                  </tr>
                  <tr className={`${t.borderRow} border-b`}>
                    <td className={`py-2 ${t.textMuted}`}>スペアモジュール</td>
                    <td className="py-2 text-right font-mono">
                      {formatUsd(result.spareUsd)}
                    </td>
                  </tr>
                  <tr className={`${t.borderRow} border-b`}>
                    <td className={`py-2 ${t.textMuted}`}>電源</td>
                    <td className="py-2 text-right font-mono">
                      {formatUsd(result.powerUsd)}
                    </td>
                  </tr>
                  <tr className={`${t.borderRow} border-b font-semibold`}>
                    <td className={`py-2 ${t.textHeading}`}>パネル合計</td>
                    <td className="py-2 text-right font-mono">
                      {formatUsd(result.panelTotalUsd)}
                    </td>
                  </tr>
                  <tr className={`${t.borderRow} border-b`}>
                    <td className={`py-2 ${t.textMuted}`}>関税 (20%)</td>
                    <td className="py-2 text-right font-mono">
                      {formatUsd(result.customsDutyUsd)}
                    </td>
                  </tr>
                  <tr className={`${t.borderRow} border-b`}>
                    <td className={`py-2 ${t.textMuted}`}>HOPE手数料 (10%)</td>
                    <td className="py-2 text-right font-mono">
                      {formatUsd(result.hopeFeeUsd)}
                    </td>
                  </tr>
                  <tr className={`${t.borderRow} border-b`}>
                    <td className={`py-2 ${t.textMuted}`}>輸送費</td>
                    <td className="py-2 text-right font-mono">
                      {formatUsd(input.shippingUsd)}
                    </td>
                  </tr>
                  <tr className={`${t.borderRow} border-b`}>
                    <td className={`py-2 ${t.textMuted}`}>通関費</td>
                    <td className="py-2 text-right font-mono">
                      {formatUsd(input.customsClearanceUsd)}
                    </td>
                  </tr>
                  {input.constructionUsd > 0 && (
                    <tr className={`${t.borderRow} border-b`}>
                      <td className={`py-2 ${t.textMuted}`}>施工費</td>
                      <td className="py-2 text-right font-mono">
                        {formatUsd(input.constructionUsd)}
                      </td>
                    </tr>
                  )}
                  <tr className={`border-b-2 ${t.borderRow} font-bold text-base`}>
                    <td className={`py-3 ${t.textHeading}`}>総原価</td>
                    <td className="py-3 text-right font-mono">
                      {formatUsd(result.totalCostUsd)}
                      <br />
                      <span className={`${t.textMuted} text-sm`}>
                        ({formatJpy(result.totalCostJpy)})
                      </span>
                    </td>
                  </tr>
                  <tr className={`font-bold text-lg ${t.accent}`}>
                    <td className="py-3">販売価格 (利益率{Math.round(input.profitMargin * 100)}%)</td>
                    <td className="py-3 text-right font-mono">
                      {formatJpy(result.salePriceJpy)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className={`w-full ${t.btnBg} text-white py-3 px-6 rounded-lg text-lg font-semibold transition cursor-pointer`}
          >
            見積書を印刷 / PDF保存
          </button>
        </div>
      </div>

      {/* Printable Quote */}
      {result && (
        <div
          ref={printRef}
          className="hidden print:block print:p-0 print:bg-white print:text-gray-900"
        >
          <div className="max-w-[210mm] mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-widest mb-2">
                御 見 積 書
              </h1>
              <div className="w-32 h-0.5 bg-gray-800 mx-auto"></div>
            </div>

            {/* Customer & Date */}
            <div className="flex justify-between mb-8">
              <div>
                <p className="text-lg font-semibold border-b-2 border-gray-800 pb-1 inline-block min-w-[250px]">
                  {customerName || "　　　　　　　　　　　"} 御中
                </p>
              </div>
              <div className="text-right text-sm">
                <p>見積日: {quoteDate}</p>
                <p>有効期限: {validUntil}</p>
              </div>
            </div>

            {/* Subject */}
            <div className="mb-6">
              <p className={`text-sm ${t.textMuted}`}>件名</p>
              <p className="text-lg font-semibold">LEDビジョンお見積り</p>
            </div>

            {/* Total Price */}
            <div className="bg-gray-100 border-2 border-gray-800 p-4 mb-8 text-center">
              <p className="text-sm text-gray-600 mb-1">お見積金額（税込）</p>
              <p className="text-3xl font-bold">
                {formatJpy(result.salePriceJpy * 1.1)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                税抜: {formatJpy(result.salePriceJpy)}（消費税10%）
              </p>
            </div>

            {/* Details Table */}
            <table className="w-full text-sm border-collapse mb-8">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border px-3 py-2 text-left">項目</th>
                  <th className="border px-3 py-2 text-right">詳細</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">製品</td>
                  <td className="border px-3 py-2 text-right">
                    {result.product.model} P{result.product.pitch}{" "}
                    {result.product.ledType}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">キャビネットサイズ</td>
                  <td className="border px-3 py-2 text-right">
                    {result.product.cabinetSize}mm
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">輝度</td>
                  <td className="border px-3 py-2 text-right">
                    {result.product.brightness} nits
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">サイズ</td>
                  <td className="border px-3 py-2 text-right">
                    {input.width}mm x {input.height}mm ({result.areaSqm}㎡)
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">コントローラー</td>
                  <td className="border px-3 py-2 text-right">
                    {result.controller.name}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">スペアモジュール</td>
                  <td className="border px-3 py-2 text-right">
                    {input.spareModules}個
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">電源+受信カード</td>
                  <td className="border px-3 py-2 text-right">
                    {input.powerReceiverCards}個
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Price Breakdown */}
            {(() => {
              const r = input.usdRate;
              // 輸送費・通関費は固定（原価のまま）
              const shippingJpy = input.shippingUsd * r;
              const customsClearanceJpy = input.customsClearanceUsd * r;
              // 残りの金額（販売価格 - 輸送費 - 通関費）をマークアップ対象に配分
              const markedUpTotal = result.salePriceJpy - shippingJpy - customsClearanceJpy;
              // HOPE手数料をパネルに吸収した原価ベース
              const panelWithHope = result.panelCostUsd + result.hopeFeeUsd;
              const costBase = panelWithHope + result.controllerUsd + result.spareUsd + result.powerUsd + result.customsDutyUsd + input.constructionUsd;
              const markup = markedUpTotal / (costBase * r);
              return (
            <table className="w-full text-sm border-collapse mb-8">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border px-3 py-2 text-left">費目</th>
                  <th className="border px-3 py-2 text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">パネル</td>
                  <td className="border px-3 py-2 text-right font-mono">
                    {formatJpy(panelWithHope * r * markup)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">コントローラー</td>
                  <td className="border px-3 py-2 text-right font-mono">
                    {formatJpy(result.controllerUsd * r * markup)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">スペアモジュール</td>
                  <td className="border px-3 py-2 text-right font-mono">
                    {formatJpy(result.spareUsd * r * markup)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">電源</td>
                  <td className="border px-3 py-2 text-right font-mono">
                    {formatJpy(result.powerUsd * r * markup)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">関税</td>
                  <td className="border px-3 py-2 text-right font-mono">
                    {formatJpy(result.customsDutyUsd * r * markup)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">輸送費</td>
                  <td className="border px-3 py-2 text-right font-mono">
                    {formatJpy(shippingJpy)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">通関費</td>
                  <td className="border px-3 py-2 text-right font-mono">
                    {formatJpy(customsClearanceJpy)}
                  </td>
                </tr>
                {input.constructionUsd > 0 && (
                  <tr>
                    <td className="border px-3 py-2">施工費</td>
                    <td className="border px-3 py-2 text-right font-mono">
                      {formatJpy(input.constructionUsd * r * markup)}
                    </td>
                  </tr>
                )}
                <tr className="bg-gray-50">
                  <td className="border px-3 py-2">小計（税抜）</td>
                  <td className="border px-3 py-2 text-right font-mono">
                    {formatJpy(result.salePriceJpy)}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-3 py-2">消費税（10%）</td>
                  <td className="border px-3 py-2 text-right font-mono">
                    {formatJpy(result.salePriceJpy * 0.1)}
                  </td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="border px-3 py-2">合計（税込）</td>
                  <td className="border px-3 py-2 text-right font-mono">
                    {formatJpy(result.salePriceJpy * 1.1)}
                  </td>
                </tr>
              </tbody>
            </table>
              );
            })()}

            {/* Remarks */}
            <div className="mb-8">
              <p className="text-sm font-semibold mb-1">備考</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {remarks}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                適用為替レート: 1 USD = {input.usdRate}円
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
