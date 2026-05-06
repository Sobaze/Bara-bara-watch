import type { ActiveLayout } from '../types/stream'

type MoveTargets = {
  up?: number
  down?: number
  left?: number
  right?: number
}

export function getMoveTargets(
  streamCount: number,
  layout: ActiveLayout,
  index: number
): MoveTargets {
  if (streamCount === 2 && layout === 'side-by-side') {
    return twoSideBySideTargets[index] ?? {}
  }
  if (streamCount === 2 && layout === 'stacked') {
    return twoStackedTargets[index] ?? {}
  }
  if (streamCount === 3 && layout === 'main-on-left') {
    return threeMainOnLeftTargets[index] ?? {}
  }
  if (streamCount === 3 && layout === 'main-on-top') {
    return threeMainOnTopTargets[index] ?? {}
  }
  if (streamCount === 4) {
    return fourStreamTargets[index] ?? {}
  }
  return {}
}
const twoSideBySideTargets: Record<number, MoveTargets> = {
  0: { right: 1 },
  1: { left: 0 },
}
const twoStackedTargets: Record<number, MoveTargets> = {
  0: { down: 1 },
  1: { up: 0 },
}
const threeMainOnLeftTargets: Record<number, MoveTargets> = {
  0: { right: 1, down: 2 },
  1: { left: 0, down: 2 },
  2: { left: 0, up: 1 },
}
const threeMainOnTopTargets: Record<number, MoveTargets> = {
  0: { down: 1, right: 2 },
  1: { up: 0, right: 2 },
  2: { up: 0, left: 1 },
}
const fourStreamTargets: Record<number, MoveTargets> = {
  0: { right: 1, down: 2 },
  1: { left: 0, down: 3 },
  2: { up: 0, right: 3 },
  3: { up: 1, left: 2 },
}
export function getSettingsGridClass(
  streamCount: number,
  layout: ActiveLayout
) {
  if (streamCount === 2 && layout === 'side-by-side') {
    return 'grid grid-cols-2 gap-2'
  }
  if (streamCount === 2 && layout === 'stacked') {
    return 'grid grid-rows-2 gap-2'
  }
  if (streamCount === 3 && layout === 'main-on-left') {
    return 'grid grid-cols-2 grid-rows-2 gap-2'
  }
  if (streamCount === 3 && layout === 'main-on-top') {
    return 'grid grid-cols-2 grid-rows-2 gap-2'
  }
  if (streamCount === 4) {
    return 'grid grid-cols-2 grid-rows-2 gap-2'
  }
  return ''
}
export function getStreamPositionClass(
  streamCount: number,
  layout: ActiveLayout,
  index: number
) {
  let positionClass = ''
  if (streamCount === 3 && layout === 'main-on-left' && index === 0) {
    positionClass = 'row-span-2'
  }
  if (streamCount === 3 && layout === 'main-on-top' && index === 0) {
    positionClass = 'col-span-2'
  }
  return positionClass
}
export function getArrowPositionClass(
  direction: string,
  streamCount: number,
  activeLayout: ActiveLayout,
  currentIndex: number,
  targetIndex: number
) {
  if (
    streamCount === 3 &&
    activeLayout === 'main-on-left' &&
    currentIndex === 0
  ) {
    if (targetIndex === 1) {
      return 'absolute right-1 top-1/4 -translate-y-1/2'
    }
    if (targetIndex === 2) {
      return 'absolute right-1 top-3/4 -translate-y-1/2'
    }
  }
  if (
    streamCount === 3 &&
    activeLayout === 'main-on-top' &&
    currentIndex === 0
  ) {
    if (targetIndex === 1) {
      return 'absolute bottom-1 left-1/4 -translate-x-1/2'
    }
    if (targetIndex === 2) {
      return 'absolute bottom-1 left-3/4 -translate-x-1/2'
    }
  }
  if (direction === 'up') {
    return 'absolute top-1 left-1/2 -translate-x-1/2'
  }
  if (direction === 'down') {
    return 'absolute bottom-1 left-1/2 -translate-x-1/2'
  }
  if (direction === 'left') {
    return 'absolute left-1 top-1/2 -translate-y-1/2'
  }
  if (direction === 'right') {
    return 'absolute right-1 top-1/2 -translate-y-1/2'
  }
  return ''
}
export function getArrowLabel(
  direction: string,
  streamCount: number,
  activeLayout: ActiveLayout,
  currentIndex: number,
  targetIndex: number
) {
  if (
    streamCount === 3 &&
    activeLayout === 'main-on-left' &&
    currentIndex === 0
  ) {
    if (targetIndex === 1) {
      return '→'
    }
    if (targetIndex === 2) {
      return '→'
    }
  }
  if (
    streamCount === 3 &&
    activeLayout === 'main-on-top' &&
    currentIndex === 0
  ) {
    if (targetIndex === 1) {
      return '↓'
    }
    if (targetIndex === 2) {
      return '↓'
    }
  }
  if (direction === 'up') {
    return '↑'
  }
  if (direction === 'down') {
    return '↓'
  }
  if (direction === 'left') {
    return '←'
  }
  if (direction === 'right') {
    return '→'
  }
  return ''
}
export function getPreviewBoxClass(
  streamCount: number,
  layout: ActiveLayout,
  index: number
) {
  if (streamCount === 3 && layout === 'main-on-left' && index === 0) {
    return 'h-68'
  }
  return 'h-24'
}
