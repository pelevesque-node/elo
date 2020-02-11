[![Build Status](https://travis-ci.org/pelevesque/elo.svg?branch=master)](https://travis-ci.org/pelevesque/elo)
[![Coverage Status](https://coveralls.io/repos/github/pelevesque/elo/badge.svg?branch=master)](https://coveralls.io/github/pelevesque/elo?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# elo

Calculates Elo rating.

## Node Repository

https://www.npmjs.com/package/@pelevesque/elo

## Installation

`npm install @pelevesque/elo`

## Tests

Command                      | Description
---------------------------- | ------------
`npm test` or `npm run test` | All Tests Below
`npm run cover`              | Standard Style
`npm run standard`           | Coverage
`npm run unit`               | Unit Tests

## Methods

- `getExpectedScore`
- `getRatingDelta`
- `getRating`
- `getOutcome`

## Usage

### Initialization

When initializing elo, you can set the k and deviation factors. If not set, the
defaults will be `k = 24` and `d = 400`.

format: `new Elo(k, d)`

```js
// initialize without parameters
const elo = new Elo()

// initialize with parameters
const elo = new Elo(32, 200)
```

### Modifying parameters after initialization

You can modify the k and deviation factors after initialization by setting them directly.

```js
elo.k = 32
elo.d = 800
```

### Get Expected Score

`getExpectedScore` returns the expected score of a match up.

You can optionally override the deviation factor set in the constructor.

format: `getExpectedScore(ratingA, ratingB, deviation)`

```js
// without overriding the deviation factor
const expectedScore = elo.getExpectedScore(2000, 1500)

// overriding the deviation factor
const expectedScore = elo.getExpectedScore(2000, 1500, 800)
```

### Get Rating Delta

`getRatingDelta` returns the change in rating.

You can optionally override the k and deviation factors set in the constructor.

The score is between 0 (loss) and 1 (win). 0.5 is a tie.

format: `getRatingDelta(ratingA, ratingB, score, k, deviation)`

```js
// without overriding the k and deviation factors
const ratingDelta = elo.getRatingDelta(2000, 1600, 1)

// overriding the k and deviation factors
const ratingDelta = elo.getRatingDelta(2000, 1500, 0.5, 32, 800)
```

### Get Rating

`getRatingDelta` returns the new rating for player A.

You can optionally override the k and deviation factors set in the constructor.

The score is between 0 (loss) and 1 (win). 0.5 is a tie.

format: `getRating(ratingA, ratingB, score, k, deviation)`

```js
// without overriding the k and deviation factors
const rating = elo.getRating(2000, 1600, 1)

// overriding the k and deviation factors
const rating = elo.getRating(2000, 1500, 0.5, 32, 800)
```

### Get Outcome

`getOutcome` is elo's most useful method. It returns an object with the rating
delta and new rating for both players.

You can optionally override the k and deviation factors set in the constructor.

The score is between 0 (loss) and 1 (win). 0.5 is a tie.

format: `getOutcome(ratingA, ratingB, score, k, deviation)`

```js
// without overriding the k and deviation factors
const outcomeObject = elo.getOutcome(2000, 1600, 1)

// overriding the k and deviation factors
const outcomeObject = elo.getOutcome(2000, 1500, 0.5, 32, 800)
```

```js
// outcome structure example
{
  a: {
    delta: 12,
    rating: 2012
  },
  b: {
    delta: -12,
    rating: 1988
  }
}
```

## Example

```js
const elo = new Elo(12)
const outcome = elo.getOutcome(2000, 2050, 1)
const newRatingA = outcome.a.rating
```
