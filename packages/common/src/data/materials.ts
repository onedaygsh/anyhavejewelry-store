import { RTAMaterial } from '../types/rta'

export const RTA_MATERIALS: RTAMaterial[] = [
  {
    id: 'mat-001',
    name: 'E0级实木颗粒板-白橡',
    textureUrl: '/textures/white-oak.jpg',
    unitPrice: 180,
    thickness: 18,
    amoebaCoefficient: 1.15,
  },
  {
    id: 'mat-002',
    name: 'E0级实木颗粒板-胡桃',
    textureUrl: '/textures/walnut.jpg',
    unitPrice: 220,
    thickness: 18,
    amoebaCoefficient: 1.18,
  },
  {
    id: 'mat-003',
    name: 'E1级多层实木板-灰布纹',
    textureUrl: '/textures/grey-fabric.jpg',
    unitPrice: 260,
    thickness: 18,
    amoebaCoefficient: 1.22,
  },
  {
    id: 'mat-004',
    name: '进口PET肤感板-轻奢灰',
    textureUrl: '/textures/pet-grey.jpg',
    unitPrice: 380,
    thickness: 18,
    amoebaCoefficient: 1.30,
  },
  {
    id: 'mat-005',
    name: '9mm背板-白橡',
    textureUrl: '/textures/back-white-oak.jpg',
    unitPrice: 95,
    thickness: 9,
    amoebaCoefficient: 1.10,
  },
]

export function getMaterialById(id: string): RTAMaterial | undefined {
  return RTA_MATERIALS.find((m) => m.id === id)
}
