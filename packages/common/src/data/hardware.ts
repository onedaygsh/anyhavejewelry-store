import { RTAHardware } from '../types/rta'

export const RTA_HARDWARE: RTAHardware[] = [
  {
    id: 'hw-001',
    name: '百隆快装铰链-直臂',
    type: 'hinge',
    unitPrice: 12.5,
    defaultQuantity: 2,
  },
  {
    id: 'hw-002',
    name: '百隆快装铰链-中臂',
    type: 'hinge',
    unitPrice: 13.2,
    defaultQuantity: 2,
  },
  {
    id: 'hw-003',
    name: '铝合金拉手-128mm',
    type: 'handle',
    unitPrice: 18.0,
    defaultQuantity: 1,
  },
  {
    id: 'hw-004',
    name: '三节静音滑轨-450mm',
    type: 'slide',
    unitPrice: 35.0,
    defaultQuantity: 2,
  },
  {
    id: 'hw-005',
    name: '三合一连接件',
    type: 'connector',
    unitPrice: 1.2,
    defaultQuantity: 8,
  },
  {
    id: 'hw-006',
    name: '层板托',
    type: 'shelf_pin',
    unitPrice: 0.8,
    defaultQuantity: 4,
  },
]

export function getHardwareById(id: string): RTAHardware | undefined {
  return RTA_HARDWARE.find((h) => h.id === id)
}
