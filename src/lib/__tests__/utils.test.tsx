import {
  stringIsNullOrEmpty,
  flattenQueryString,
  fromAssetToOption,
  arraysAreEqual,
  firstItemIfArray,
  isWSMessage,
  isWSInitMessage,
  isWSEventMessage,
  eventToBedStatus,
} from '@/lib/utils'

describe('utils', () => {
  it('stringIsNullOrEmpty', () => {
    expect(stringIsNullOrEmpty('value')).toBe(false)
    expect(stringIsNullOrEmpty('')).toBe(true)
    expect(stringIsNullOrEmpty(null)).toBe(true)
  })

  it('flattenQueryString with an array', () => {
    expect(flattenQueryString(['first', 'second'])).toBe('first')
  })

  it('flattenQueryString with a string', () => {
    expect(flattenQueryString('first')).toBe('first')
  })

  it('fromAssetToOption', () => {
    const assetIdAssetName = {
      assetId: '12',
      assetName: 'assetName',
    }

    const expectOption = {
      value: '12',
      label: 'assetName',
    }

    expect(fromAssetToOption(assetIdAssetName)).toEqual(expectOption)
  })

  it('arraysAreEqual', () => {
    const array1 = [1, 2, 3]
    const array2 = [1, 'a', 3]

    expect(arraysAreEqual(array1, array2)).toBeFalsy()
  })

  it('arraysAreEqual', () => {
    const array1 = [1, 2, 3]
    const array2 = [1, 2, 3]

    expect(arraysAreEqual(array1, array2)).toBeTruthy()
  })

  it('firstItemIfArray', () => {
    expect(firstItemIfArray(['test'])).toBe('test')
  })

  it('isWSMessage', () => {
    expect(isWSMessage({ messageType: 'messageType' })).toBeTruthy()
    expect(isWSMessage({ random: 'random' })).toBeFalsy()
  })

  it('isWSInitMessage', () => {
    expect(isWSInitMessage({ messageType: 'init' })).toBeTruthy()
    expect(isWSInitMessage({ messageType: 'random' })).toBeFalsy()
  })

  it('isWSEventMessage', () => {
    expect(isWSEventMessage({ messageType: 'event' })).toBeTruthy()
    expect(isWSEventMessage({ messageType: 'random' })).toBeFalsy()
  })

  it('eventToBedStatus', () => {
    expect(eventToBedStatus('STILL')).toBe('Still')
    expect(eventToBedStatus('RESTLESS')).toBe('Restless')
    expect(eventToBedStatus('LIKELY_BED_EXIT')).toBe('LikelyBedExit')
    expect(eventToBedStatus('BED_EXIT')).toBe('BedExit')
    expect(eventToBedStatus('FALL')).toBe('Fall')
    expect(eventToBedStatus('MULTI_PEOPLE')).toBe('MultiplePeople')
    expect(eventToBedStatus('InvalidEventType')).toBe('Unknown')
    expect(eventToBedStatus('UNKNOWN')).toBe('Unknown')
    expect(eventToBedStatus('')).toBe('Unknown')
    expect(eventToBedStatus('randomstring')).toBe('Unknown')
  })
})
