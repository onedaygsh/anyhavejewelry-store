import { RTADimensions, AmoebaCalculationInput, AmoebaResult } from '../types/rta'

/**
 * RTA 柜体展开面积定价公式
 * Surface Area = (W*H*2 + W*D*2 + H*D*2) / 1_000_000  (转换为平方米)
 * Final Price = Surface Area * 1.5 * unitPrice
 */
export function calculateRTAPrice(
  dimensions: RTADimensions,
  unitPrice: number
): number {
  const { width, height, depth } = dimensions
  const surfaceAreaMm2 = width * height * 2 + width * depth * 2 + height * depth * 2
  const surfaceAreaM2 = surfaceAreaMm2 / 1_000_000
  const price = surfaceAreaM2 * 1.5 * unitPrice
  return Math.round(price * 100) / 100
}

export function calculateAmoebaProfit(input: AmoebaCalculationInput): AmoebaResult {
  const { revenue, materialDirectCost, laborCost, amoebaCoefficient } = input
  const estimatedProfit = revenue - materialDirectCost * amoebaCoefficient - laborCost
  const profitMargin = revenue > 0 ? estimatedProfit / revenue : 0

  return {
    estimatedProfit: Math.round(estimatedProfit * 100) / 100,
    profitMargin: Math.round(profitMargin * 10000) / 100,
    status: profitMargin >= 0.15 ? 'Approved' : 'Rejected',
  }
}
