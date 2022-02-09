<div align="center">
  <h1>NOCI</h1>

  <img
    height="80"
    width="80"
    alt="NOCI"
    src="https://user-images.githubusercontent.com/5364897/153192104-48bba009-d198-4c87-bd72-821c8cbf808c.jpg"
  />
  <img
    height="80"
    width="80"
    alt="NOCI"
    src="https://user-images.githubusercontent.com/5364897/153192106-21705704-d3d4-471e-9e41-b139ef03c8e9.jpg"
  />
  <img
    height="80"
    width="80"
    alt="NOCI"
    src="https://user-images.githubusercontent.com/5364897/153192112-2a999245-d794-4477-8bc5-ac5f1b36f454.jpg"
  />

  <p>Procedural Avatar Generator</p>

  [![npm version](https://badge.fury.io/js/noci.svg)](https://badge.fury.io/js/noci)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

  [Click Here For Demo](https://h33z5.csb.app/)
</div>

<hr/>

## Install

### NPM

```bash
npm install --save noci
```

### Yarn

```bash
yarn add noci
```

## Usage

```javascript
  const grid = require('noci')({
    width: 10,
    height: 10,
    iterations: 10,
    seed: 'random-seed',
    fold: 'VERTICAL' // Can also be 'HORIZONTAL' or 'BOTH'
  })

  grid.forEach(
    (rows, y) => {
      rows.forEach(
        (cell, x) => {
          switch (cell) {
            case 'ALIVE' {
              // Paint pixel at (`x`, `y`) with skin color.
              break;
            }
            case 'CONTOUR': {
              // Paint pixel at (`x`, `y`) with border color.
              break;
            }
            default: { // or 'DEAD'
              // Paint pixel at (`x`, `y`) with background color.
              break;
            }
          }
        }
      )
    }
  )
```

# References
Based on the algorithm by [yurkth](https://github.com/yurkth/sprator).
