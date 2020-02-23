export function convertPriceToNumber (price) {
  if (typeof price === 'string') {
    return parseFloat(price.replace(/[,$]/g, ''))
  } else if (typeof price === 'number') {
    return price
  } else {
    // If not a string or number return NaN.
    return NaN
  }
}

export function formatNumber (input, places) {
  places = places || 0
  const value = parseFloat(input)
  if (isNaN(value)) {
    return input.toString()
  }
  const num = Math.abs(value).toFixed(places).toString().split('.')
  let rem
  let out = ''
  // add commas
  for (let i = 0; i < num[0].length; i++) {
    out += num[0][i]
    rem = num[0].length - i - 1
    if (rem % 3 === 0 && rem > 0) {
      out += ','
    }
  }
  // append fractional value, if any
  if (num[1]) {
    out += '.' + num[1]
  }
  // prepend negative sign, if necessary
  if (value < 0) {
    return '-' + out
  }
  return out
}

function isInt (n) {
  return Number(n) === n && n % 1 === 0
}

export function formatCurrency (input, accuracy, truncateDecimalForInt) {
  const value = convertPriceToNumber(input)
  if (isNaN(value)) {
    return input
  }
  if (truncateDecimalForInt) {
    if (isInt(value)) {
      accuracy = 0
    }
  }
  const num = formatNumber(Math.abs(value), (typeof accuracy === 'number') ? accuracy : 0)
  if (value < 0) {
    return '-$' + num
  }
  return '$' + num
}