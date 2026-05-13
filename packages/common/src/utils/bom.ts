import { RTADimensions, RTABOMItem } from '../types/rta'
import { RTA_MATERIALS } from '../data/materials'
import { RTA_HARDWARE } from '../data/hardware'

const BOARD_THICKNESS = 18
const BACK_THICKNESS = 9

export function generatePreliminaryBOM(
  dims: RTADimensions,
  materialId: string,
  hardwareIds: string[]
): RTABOMItem[] {
  const { width: W, height: H, depth: D } = dims
  const material = RTA_MATERIALS.find((m) => m.id === materialId)
  if (!material) throw new Error(`Material ${materialId} not found`)

  const items: RTABOMItem[] = []

  // 面板清单（面积计算）
  const panels = [
    { desc: '顶板', w: W, h: D, t: BOARD_THICKNESS },
    { desc: '底板', w: W, h: D, t: BOARD_THICKNESS },
    { desc: '左侧板', w: D, h: H, t: BOARD_THICKNESS },
    { desc: '右侧板', w: D, h: H, t: BOARD_THICKNESS },
    { desc: '背板', w: W - BOARD_THICKNESS * 2, h: H - BOARD_THICKNESS * 2, t: BACK_THICKNESS },
    { desc: '隔板', w: W - BOARD_THICKNESS * 2, h: D, t: BOARD_THICKNESS },
  ]

  for (const panel of panels) {
    const areaM2 = (panel.w * panel.h) / 1_000_000
    const qty = 1
    const unitPrice = material.unitPrice * areaM2
    items.push({
      materialId: material.id,
      description: `${panel.desc} - ${material.name} (${panel.w}x${panel.h}x${panel.t}mm)`,
      quantity: qty,
      unitPrice: Math.round(unitPrice * 100) / 100,
      totalPrice: Math.round(unitPrice * qty * 100) / 100,
    })
  }

  // 封边条（估算：每块板周长 * 数量，简化为按米）
  const edgeBandLengthM =
    ((W + D) * 2 * 2 + (D + H) * 2 * 2 + (W + H) * 2) / 1000
  const edgeBandUnitPrice = 2.5 // 元/米
  items.push({
    description: `PVC封边条 - 估算长度`,
    quantity: Math.round(edgeBandLengthM * 100) / 100,
    unitPrice: edgeBandUnitPrice,
    totalPrice: Math.round(edgeBandLengthM * edgeBandUnitPrice * 100) / 100,
  })

  // 五金件
  for (const hwId of hardwareIds) {
    const hw = RTA_HARDWARE.find((h) => h.id === hwId)
    if (!hw) continue
    const qty = hw.defaultQuantity || 1
    items.push({
      hardwareId: hw.id,
      description: hw.name,
      quantity: qty,
      unitPrice: hw.unitPrice,
      totalPrice: Math.round(hw.unitPrice * qty * 100) / 100,
    })
  }

  return items
}

export function calculateBOMTotal(bom: RTABOMItem[]): number {
  return Math.round(bom.reduce((sum, item) => sum + item.totalPrice, 0) * 100) / 100
}
