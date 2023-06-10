const spending = []
let dailyLimit = 0

function add(spendingItem) {
  spending.push(spendingItem)
}

function get() {
  return [...spending]
}

function setLimit(limit) {
  dailyLimit = limit
}

function getLimit() {
  return dailyLimit
}

module.exports = {
  get,
  add,
  setLimit,
  getLimit,
}
