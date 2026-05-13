export interface RTADimensions {
  width: number  // mm
  height: number // mm
  depth: number  // mm
}

export interface RTAMaterial {
  id: string
  name: string
  textureUrl: string
  unitPrice: number // 元 / 平方米
  thickness: number // mm
  amoebaCoefficient: number // 阿米巴系数
}

export interface RTAHardware {
  id: string
  name: string
  type: 'hinge' | 'handle' | 'slide' | 'connector' | 'shelf_pin'
  unitPrice: number
  defaultQuantity?: number
}

export interface RTABOMItem {
  hardwareId?: string
  materialId?: string
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface RTALineItemMetadata {
  dimensions: RTADimensions
  materialId: string
  hardwareIds: string[]
  bomPreview?: RTABOMItem[]
}

export interface AmoebaCalculationInput {
  revenue: number
  materialDirectCost: number
  laborCost: number
  amoebaCoefficient: number
}

export interface AmoebaResult {
  estimatedProfit: number
  profitMargin: number
  status: 'Approved' | 'Rejected'
}
