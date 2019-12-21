'use strict'

const Elo = function (options) {
  this.setOptions(options)
}

Elo.prototype.setOptions = function (options) {
  this.options = Object.assign({}, this._defaultOptions, options)
}

Elo.prototype.getExpectedScore = function (ratingA, ratingB, n) {
  n = n || this.options.n
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / n))
}

Elo.prototype.getRatingDelta = function (ratingA, ratingB, score, k, n) {
  k = k || this.options.k
  return k * (score - this.getExpectedScore(ratingA, ratingB, n))
}

Elo.prototype.getRating = function (ratingA, ratingB, score, k, n) {
  return ratingA + this.getRatingDelta(ratingA, ratingB, score, k, n)
}

Elo.prototype.getOutcome = function (ratingA, ratingB, score, k, n) {
  const delta = this.getRatingDelta(ratingA, ratingB, score, k, n)
  return {
    a: {
      delta: delta,
      rating: ratingA + delta
    },
    b: {
      delta: -delta,
      rating: ratingB - delta
    }
  }
}

Elo.prototype._defaultOptions = {
  k: 24,
  n: 400
}

module.exports = Elo
