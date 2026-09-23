import {
  SAMPLE_FEE_USD,
  lanes,
  products,
  type LaneId,
  type Product,
} from "@/lib/data";

export function productById(id: string) {
  return products.find((product) => product.id === id);
}

export function quoteBulk(product: Product, volumeMt: number, laneId: LaneId) {
  const lane = lanes.find((item) => item.id === laneId) ?? lanes[0];
  const volume = Math.min(500, Math.max(5, volumeMt));
  const scale = volume >= 500 ? 0.06 : volume >= 250 ? 0.045 : volume >= 100 ? 0.025 : 0;
  const unit = product.priceUsdPerMt;
  const netUnit = unit * (1 - scale);
  const freight = lane.freightUsdPerMt;
  const total = (netUnit + freight) * volume;
  return { lane, volume, scale, unit, netUnit, freight, total };
}

export function quoteSample(productIds: string[], laneId: LaneId) {
  const lane = lanes.find((item) => item.id === laneId) ?? lanes[0];
  const count = Math.max(productIds.length, 1);
  const handling = SAMPLE_FEE_USD * count;
  const freight = lane.sampleFreightUsd;
  return { lane, count, handling, freight, total: handling + freight };
}
