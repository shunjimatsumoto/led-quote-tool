export type LEDProduct = {
  id: string;
  model: string;
  pitch: number;
  ledType: string;
  cabinetSize: string;
  brightness: string;
  usdPerSqm: number;
  moduleUsd: number | null;
};

export type Controller = {
  name: string;
  usd: number;
};

export const ledProducts: LEDProduct[] = [
  { id: "USLIMII-P1p8-NSG-500x1000", model: "Uslim II", pitch: 1.8, ledType: "Nationstar金線", cabinetSize: "500×1000", brightness: "800-1000", usdPerSqm: 1942, moduleUsd: 93 },
  { id: "USLIMII-P1p8-SCW-500x1000", model: "Uslim II", pitch: 1.8, ledType: "標準銅線白玉", cabinetSize: "500×1000", brightness: "800-1000", usdPerSqm: 1474, moduleUsd: 93 },
  { id: "USLIMII-P2p5-NSG-500x1000", model: "Uslim II", pitch: 2.5, ledType: "Nationstar金線", cabinetSize: "500×1000", brightness: "800-1000", usdPerSqm: 1420, moduleUsd: 65 },
  { id: "USLIMII-P2p5-SCW-500x1000", model: "Uslim II", pitch: 2.5, ledType: "標準銅線白玉", cabinetSize: "500×1000", brightness: "800-1000", usdPerSqm: 1100, moduleUsd: 65 },
  { id: "USLIMII-P3p9-NSG-500x1000", model: "Uslim II", pitch: 3.9, ledType: "Nationstar金線", cabinetSize: "500×1000", brightness: "800-1000", usdPerSqm: 988, moduleUsd: 40 },
  { id: "USLIMII-P3p9-SCW-500x1000", model: "Uslim II", pitch: 3.9, ledType: "標準銅線白玉", cabinetSize: "500×1000", brightness: "800-1000", usdPerSqm: 900, moduleUsd: 40 },
  { id: "USK-P2p6-SCW-500x1000", model: "USK", pitch: 2.6, ledType: "標準金線白玉", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 3190, moduleUsd: 161 },
  { id: "USK-P2p6-SGW-500x1000", model: "USK", pitch: 2.6, ledType: "標準銅線白玉", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 1998, moduleUsd: 161 },
  { id: "USK-P2p9-SGW-500x1000", model: "USK", pitch: 2.9, ledType: "標準金線白玉", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 2750, moduleUsd: 90 },
  { id: "USK-P2p9-SCW-500x1000", model: "USK", pitch: 2.9, ledType: "標準銅線白玉", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 1892, moduleUsd: 90 },
  { id: "USK-P3p9-NSG-500x1000", model: "USK", pitch: 3.9, ledType: "Nationstar金線", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 2223, moduleUsd: 101 },
  { id: "USK-P3p9-SGW-500x1000", model: "USK", pitch: 3.9, ledType: "標準金線白玉", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 1838, moduleUsd: 101 },
  { id: "USK-P3p9-SCW-500x1000", model: "USK", pitch: 3.9, ledType: "標準銅線白玉", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 1445, moduleUsd: 101 },
  { id: "USK-P4p8-NSG-500x1000", model: "USK", pitch: 4.8, ledType: "Nationstar金線", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 1948, moduleUsd: 78 },
  { id: "USK-P4p8-SGW-500x1000", model: "USK", pitch: 4.8, ledType: "標準金線白玉", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 1793, moduleUsd: 78 },
  { id: "USK-P4p8-SCW-500x1000", model: "USK", pitch: 4.8, ledType: "標準銅線白玉", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 1375, moduleUsd: 78 },
  { id: "USK-P5p9-NSG-500x1000", model: "USK", pitch: 5.9, ledType: "Nationstar金線", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 1638, moduleUsd: 58 },
  { id: "USK-P5p9-SGW-500x1000", model: "USK", pitch: 5.9, ledType: "標準金線白玉", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 1518, moduleUsd: 58 },
  { id: "USK-P5p9-SCW-500x1000", model: "USK", pitch: 5.9, ledType: "標準銅線白玉", cabinetSize: "500×1000", brightness: "5000-6000", usdPerSqm: 1276, moduleUsd: 58 },
  { id: "UNATURAL-P0p9-NSG-600x337p5", model: "Unatural", pitch: 0.9, ledType: "Nationstar金線", cabinetSize: "600×337.5", brightness: "600", usdPerSqm: 6979, moduleUsd: 151 },
  { id: "UNATURAL-P1p2-NSG-600x337p5", model: "Unatural", pitch: 1.2, ledType: "Nationstar金線", cabinetSize: "600×337.5", brightness: "600", usdPerSqm: 4158, moduleUsd: 84 },
  { id: "UNATURAL-P1p5-NSG-600x337p5", model: "Unatural", pitch: 1.5, ledType: "Nationstar金線", cabinetSize: "600×337.5", brightness: "600", usdPerSqm: 3599, moduleUsd: 72 },
  { id: "UNATURAL-P1p8-NSG-600x337p5", model: "Unatural", pitch: 1.8, ledType: "Nationstar金線", cabinetSize: "600×337.5", brightness: "600", usdPerSqm: 3350, moduleUsd: 65 },
  { id: "UMINIW-P0p9-NSG-600x337p5", model: "UminiW", pitch: 0.9, ledType: "Nationstar金線", cabinetSize: "600×337.5", brightness: "600", usdPerSqm: 5929, moduleUsd: null },
  { id: "UMINIW-P1p2-NSG-600x337p5", model: "UminiW", pitch: 1.2, ledType: "Nationstar金線", cabinetSize: "600×337.5", brightness: "600", usdPerSqm: 3108, moduleUsd: null },
  { id: "UMINIW-P1p5-NSG-600x337p5", model: "UminiW", pitch: 1.5, ledType: "Nationstar金線", cabinetSize: "600×337.5", brightness: "600", usdPerSqm: 2549, moduleUsd: 42 },
  { id: "UMINIW-P1p8-NSG-600x337p5", model: "UminiW", pitch: 1.8, ledType: "Nationstar金線", cabinetSize: "600×337.5", brightness: "600", usdPerSqm: 2300, moduleUsd: 35 },
  { id: "USURFACEPL1-P6p25-NSG-1000x1000", model: "UsurfacePL1", pitch: 6.25, ledType: "Nationstar金線", cabinetSize: "1000×1000", brightness: "7500", usdPerSqm: 1150, moduleUsd: 90 },
  { id: "USURFACEPL1-P7p8-NSG-1000x1000", model: "UsurfacePL1", pitch: 7.8, ledType: "Nationstar金線", cabinetSize: "1000×1000", brightness: "7500", usdPerSqm: 1066, moduleUsd: null },
  { id: "USURFACEPL1-P10p4-NSG-1000x1000", model: "UsurfacePL1", pitch: 10.4, ledType: "Nationstar金線", cabinetSize: "1000×1000", brightness: "7500", usdPerSqm: 886, moduleUsd: null },
  { id: "USURFACEIII-P6p67-NSG-800x900", model: "UsurfaceIII", pitch: 6.67, ledType: "Nationstar金線", cabinetSize: "800×900", brightness: "7000", usdPerSqm: 1145, moduleUsd: null },
  { id: "USURFACEIII-P8p33-NSG-800x900", model: "UsurfaceIII", pitch: 8.33, ledType: "Nationstar金線", cabinetSize: "800×900", brightness: "7000", usdPerSqm: 1035, moduleUsd: null },
  { id: "USURFACEIII-P10-NSG-800x900", model: "UsurfaceIII", pitch: 10.0, ledType: "Nationstar金線", cabinetSize: "800×900", brightness: "7000", usdPerSqm: 895, moduleUsd: null },
];

export const controllers: Controller[] = [
  { name: "H2", usd: 3000 },
  { name: "MCTRL700", usd: 700 },
  { name: "VX1000", usd: 1000 },
];

export type QuoteInput = {
  width: number;
  height: number;
  productId: string;
  controllerId: string;
  spareModules: number;
  powerReceiverCards: number;
  usdRate: number;
  shippingUsd: number;
  customsClearanceUsd: number;
  constructionUsd: number;
  profitMargin: number;
};

export type QuoteResult = {
  areaSqm: number;
  usdPerSqm: number;
  moduleUsd: number | null;
  controllerUsd: number;
  panelCostUsd: number;
  spareUsd: number;
  powerUsd: number;
  panelTotalUsd: number;
  customsDutyUsd: number;
  hopeFeeUsd: number;
  totalCostUsd: number;
  totalCostJpy: number;
  salePriceUsd: number;
  salePriceJpy: number;
  product: LEDProduct;
  controller: Controller;
};

export function calculateQuote(input: QuoteInput): QuoteResult | null {
  const product = ledProducts.find((p) => p.id === input.productId);
  const controller = controllers.find((c) => c.name === input.controllerId);
  if (!product || !controller) return null;

  const areaSqm = (input.width * input.height) / 1_000_000;
  const panelCostUsd = areaSqm * product.usdPerSqm;
  const spareUsd = (product.moduleUsd ?? 0) * input.spareModules;
  const powerUsd = input.powerReceiverCards * 50;
  const panelTotalUsd = panelCostUsd + controller.usd + spareUsd + powerUsd;
  const customsDutyUsd = panelTotalUsd * 0.2;
  const hopeFeeUsd =
    (panelTotalUsd +
      customsDutyUsd +
      input.shippingUsd +
      input.customsClearanceUsd) *
    0.1;
  const totalCostUsd =
    panelTotalUsd +
    customsDutyUsd +
    input.shippingUsd +
    input.customsClearanceUsd +
    input.constructionUsd +
    hopeFeeUsd;
  const totalCostJpy = totalCostUsd * input.usdRate;
  const salePriceUsd = totalCostUsd / (1 - input.profitMargin);
  const salePriceJpy = salePriceUsd * input.usdRate;

  return {
    areaSqm,
    usdPerSqm: product.usdPerSqm,
    moduleUsd: product.moduleUsd,
    controllerUsd: controller.usd,
    panelCostUsd,
    spareUsd,
    powerUsd,
    panelTotalUsd,
    customsDutyUsd,
    hopeFeeUsd,
    totalCostUsd,
    totalCostJpy,
    salePriceUsd,
    salePriceJpy,
    product,
    controller,
  };
}
