/* global describe, it */
'use strict'

const expect = require('chai').expect
const Elo = require('../index')

describe('#elo()', () => {
  describe('#constructor()', () => {
    it('should initialize with default options', () => {
      const elo = new Elo()
      expect(elo.options.k).to.equal(24)
      expect(elo.options.n).to.equal(400)
    })

    it('should initialize with a custom K-factor', () => {
      const elo = new Elo({
        k: 40
      })
      expect(elo.options.k).to.equal(40)
    })

    it('should initialize with a custom K-factor and n-value', () => {
      const elo = new Elo({
        k: 40,
        n: 200
      })
      expect(elo.options.k).to.equal(40)
      expect(elo.options.n).to.equal(200)
    })
  })

  describe('#setOptions()', () => {
    it('should set options', () => {
      const options = {
        k: 44,
        n: 100
      }
      const elo = new Elo()
      elo.setOptions(options)
      const result = JSON.stringify(elo.options)
      const expected = JSON.stringify(options)
      expect(result).to.equal(expected)
    })
  })

  describe('#getExpectedScore()', () => {
    it('should work for same ratings', () => {
      const elo = new Elo()
      const result = elo.getExpectedScore(2000, 2000)
      expect(result).to.equal(0.5)
    })

    it('should work for different ratings', () => {
      const elo = new Elo()
      const result = elo.getExpectedScore(2000, 1800)
      expect(result).to.equal(0.7597469266479578)
    })

    it('should work for different ratings and a custom n-value', () => {
      const elo = new Elo({
        n: 100
      })
      const result = elo.getExpectedScore(2000, 1800)
      expect(result).to.equal(0.9900990099009901)
    })

    it('should work for different ratings and a custom n-value set directly on method', () => {
      const elo = new Elo()
      const result = elo.getExpectedScore(2000, 1800, 100)
      expect(result).to.equal(0.9900990099009901)
    })
  })

  describe('#getRatingDelta()', () => {
    it('should work for a win', () => {
      const elo = new Elo()
      const result = elo.getRatingDelta(2000, 1600, 1)
      expect(result).to.equal(2.1818181818181825)
    })

    it('should work for a win and a custom K-factor', () => {
      const elo = new Elo({
        k: 60
      })
      const result = elo.getRatingDelta(2000, 1600, 1)
      expect(result).to.equal(5.454545454545457)
    })

    it('should work for a win and a custom K-factor and n-value', () => {
      const elo = new Elo({
        k: 60,
        n: 1200
      })
      const result = elo.getRatingDelta(2000, 1600, 1)
      expect(result).to.equal(19.020840783168524)
    })

    it('should work for a win and a custom K-factor and n-value set directly on method', () => {
      const elo = new Elo()
      const result = elo.getRatingDelta(2000, 1600, 1, 60, 1200)
      expect(result).to.equal(19.020840783168524)
    })

    it('should work for a loss', () => {
      const elo = new Elo()
      const result = elo.getRatingDelta(2000, 2000, 0)
      expect(result).to.equal(-12)
    })

    it('should work for a tie', () => {
      const elo = new Elo()
      const result = elo.getRatingDelta(2000, 2000, 0.5)
      expect(result).to.equal(0)
    })
  })

  describe('#getRating()', () => {
    it('should work for a win', () => {
      const elo = new Elo()
      const result = elo.getRating(1500, 2000, 1)
      expect(result).to.equal(1522.7222348351515)
    })

    it('should work for a win and a custom K-factor', () => {
      const elo = new Elo({
        k: 40
      })
      const result = elo.getRating(1500, 2000, 1)
      expect(result).to.equal(1537.8703913919192)
    })

    it('should work for a win and a custom K-factor and n-value', () => {
      const elo = new Elo({
        k: 40,
        n: 200
      })
      const result = elo.getRating(1500, 2000, 1)
      expect(result).to.equal(1539.8739076326697)
    })

    it('should work for a win and a custom K-factor and n-value set directly on method', () => {
      const elo = new Elo()
      const result = elo.getRating(1500, 2000, 1, 40, 200)
      expect(result).to.equal(1539.8739076326697)
    })
  })

  describe('#getOutcome()', () => {
    it('should work for a loss', () => {
      let expected = '{"a":{"delta":-23.264317679238825,"rating":1976.7356823207613},'
      expected += '"b":{"delta":23.264317679238825,"rating":1423.2643176792387}}'
      const elo = new Elo()
      const outcome = JSON.stringify(elo.getOutcome(2000, 1400, 0))
      expect(outcome).to.equal(expected)
    })

    it('should work for a loss and a custom K-factor', () => {
      let expected = '{"a":{"delta":-58.160794198097065,"rating":1941.8392058019028},'
      expected += '"b":{"delta":58.160794198097065,"rating":1458.1607941980972}}'
      const elo = new Elo({
        k: 60
      })
      const outcome = JSON.stringify(elo.getOutcome(2000, 1400, 0))
      expect(outcome).to.equal(expected)
    })

    it('should work for a loss and a custom K-factor and n-value', () => {
      let expected = '{"a":{"delta":-59.99994000006,"rating":1940.00005999994},'
      expected += '"b":{"delta":59.99994000006,"rating":1459.99994000006}}'
      const elo = new Elo({
        k: 60,
        n: 100
      })
      const outcome = JSON.stringify(elo.getOutcome(2000, 1400, 0))
      expect(outcome).to.equal(expected)
    })

    it('should work for a loss and a custom K-factor and n-value set directly on method', () => {
      let expected = '{"a":{"delta":-59.99994000006,"rating":1940.00005999994},'
      expected += '"b":{"delta":59.99994000006,"rating":1459.99994000006}}'
      const elo = new Elo()
      const outcome = JSON.stringify(elo.getOutcome(2000, 1400, 0, 60, 100))
      expect(outcome).to.equal(expected)
    })
  })
})
