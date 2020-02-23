
import { formatCurrency, formatNumber, convertPriceToNumber } from 'ducks/helpers'

describe('helpers: validate helper funcctions', () => {
  test('formatNumber: should return the formatted number as a string', () => {
    expect(formatNumber('123', 2)).toBe('123.00')
    expect(formatNumber('123.80889', 2)).toBe('123.81')
    expect(formatNumber(123, 2)).toBe('123.00')
    expect(formatNumber(123.678, 2)).toBe('123.68')
  })
  test('convertPriceToNumber: should return the number', () => {
    expect(convertPriceToNumber('123')).toBe(123)
    expect(convertPriceToNumber('123.01')).toBe(123.01)
    expect(convertPriceToNumber(123)).toBe(123)
    expect(convertPriceToNumber(123.67)).toBe(123.67)
    expect(convertPriceToNumber({})).toBe(NaN)
    expect(convertPriceToNumber([])).toBe(NaN)
    expect(convertPriceToNumber(undefined)).toBe(NaN)
    expect(convertPriceToNumber(null)).toBe(NaN)
  })

  test('formats Number and String integer values with no decimal', () => {
    expect(formatCurrency(24, 2, true)).toBe('$24')
    expect(formatCurrency('24', 2, true)).toBe('$24')
    expect(formatCurrency(1, 2, true)).toBe('$1')
    expect(formatCurrency('9999', 2, true)).toBe('$9,999')
    expect(formatCurrency(123456789, 2, true)).toBe('$123,456,789')
    expect(formatCurrency(0, 2, true)).toBe('$0')
    expect(formatCurrency(-0, 2, true)).toBe('$0')

    expect(formatCurrency(-24, 2, true)).toBe('-$24')
    expect(formatCurrency('-24', 2, true)).toBe('-$24')
    expect(formatCurrency(-1, 2, true)).toBe('-$1')
    expect(formatCurrency('-9999', 2, true)).toBe('-$9,999')
    expect(formatCurrency(-123456789, 2, true)).toBe('-$123,456,789')
  })

  test('formats Number and String integer values with added decimal', () => {
    expect(formatCurrency(24, 2, false)).toBe('$24.00')
    expect(formatCurrency('24', 2, false)).toBe('$24.00')
    expect(formatCurrency(1, 2, false)).toBe('$1.00')
    expect(formatCurrency('9999', 2, false)).toBe('$9,999.00')
    expect(formatCurrency(123456789, 2, false)).toBe('$123,456,789.00')
    expect(formatCurrency(0, 2, false)).toBe('$0.00')
    expect(formatCurrency(-0, 2, false)).toBe('$0.00')

    expect(formatCurrency(-24, 2, false)).toBe('-$24.00')
    expect(formatCurrency('-24', 2, false)).toBe('-$24.00')
    expect(formatCurrency(-1, 2, false)).toBe('-$1.00')
    expect(formatCurrency('-9999', 2, false)).toBe('-$9,999.00')
    expect(formatCurrency(-123456789, 2, false)).toBe('-$123,456,789.00')
  })

  test('formats Number and String decimal values', () => {
    expect(formatCurrency(-1234567.89, 2, false)).toBe('-$1,234,567.89')
    expect(formatCurrency('1234567', 2, false)).toBe('$1,234,567.00')
    expect(formatCurrency('1234567.2', 2, false)).toBe('$1,234,567.20')

    expect(formatCurrency('567.995', 3, false)).toBe('$567.995') // unlikely to ever be used, but capable of fractional formatting past hundredths
  })

  test('returns an empty string for exceptional input', () => { // should it really do this?
    expect(formatCurrency('', 2, false)).toBe('')
    expect(formatCurrency(null, 2, false)).toBe(null)
    expect(formatCurrency(undefined, 2, false)).toBe(undefined)
    expect(formatCurrency(NaN, 2, false)).toBe(NaN)
    expect(formatCurrency(true, 2, false)).toBe(true)
    expect(formatCurrency(false, 2, false)).toBe(false)
    expect(formatCurrency([], 2, false)).toEqual([])
  })
})
