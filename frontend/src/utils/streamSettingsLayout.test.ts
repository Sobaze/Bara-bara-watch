import { expect, test } from 'vitest'
import {
  getMoveTargets,
  getSettingsGridClass,
  getStreamPositionClass,
  getArrowLabel,
} from './streamSettingsLayout'

test('returns correct move targets for side by side 2 stream layout', () => {
  expect(getMoveTargets(2, 'side-by-side', 0)).toEqual({ right: 1 })
  expect(getMoveTargets(2, 'side-by-side', 1)).toEqual({ left: 0 })
})
test('returns correct move targets for stacked 2 stream layout', () => {
  expect(getMoveTargets(2, 'stacked', 0)).toEqual({ down: 1 })
  expect(getMoveTargets(2, 'stacked', 1)).toEqual({ up: 0 })
})
test('returns empty move targets for invalid index', () => {
  expect(getMoveTargets(2, 'side-by-side', 99)).toEqual({})
})
test('returns correct move targets for three main-on-left layout', () => {
  expect(getMoveTargets(3, 'main-on-left', 0)).toEqual({ right: 1, down: 2 })
  expect(getMoveTargets(3, 'main-on-left', 1)).toEqual({ left: 0, down: 2 })
  expect(getMoveTargets(3, 'main-on-left', 2)).toEqual({ left: 0, up: 1 })
})
test('returns correct move targets for three main-on-top layout', () => {
  expect(getMoveTargets(3, 'main-on-top', 0)).toEqual({ down: 1, right: 2 })
  expect(getMoveTargets(3, 'main-on-top', 1)).toEqual({ up: 0, right: 2 })
  expect(getMoveTargets(3, 'main-on-top', 2)).toEqual({ up: 0, left: 1 })
})
test('returns correct move targets for four stream layout', () => {
  expect(getMoveTargets(4, null, 0)).toEqual({ right: 1, down: 2 })
  expect(getMoveTargets(4, null, 1)).toEqual({ left: 0, down: 3 })
  expect(getMoveTargets(4, null, 2)).toEqual({ up: 0, right: 3 })
  expect(getMoveTargets(4, null, 3)).toEqual({ up: 1, left: 2 })
})

test('returns correct settings for the grid class', () => {
  expect(getSettingsGridClass(2, 'stacked')).toBe('grid grid-rows-2 gap-2')
})
test('returns empty settings grid class for unsupported layout state', () => {
  expect(getSettingsGridClass(1, null)).toBe('')
})

test('returns main stream position class for 3 stream layouts', () => {
  expect(getStreamPositionClass(3, 'main-on-left', 0)).toBe('row-span-2')
  expect(getStreamPositionClass(3, 'main-on-top', 0)).toBe('col-span-2')
})

test('returns no stream position class for non-main streams', () => {
  expect(getStreamPositionClass(3, 'main-on-left', 1)).toBe('')
  expect(getStreamPositionClass(3, 'main-on-left', 2)).toBe('')
})

test('returns the correct arrow label showing the direction it can move', () => {
  expect(getArrowLabel('up', 2, 'stacked', 1, 0)).toBe('↑')
})
