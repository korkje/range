# range [![JSR](https://jsr.io/badges/@korkje/range)](https://jsr.io/@korkje/range)

Python's `range` function in JS/TS.

```ts
import range from "jsr:@korkje/range";

console.log([...range(5)]); // [0, 1, 2, 3, 4]
console.log([...range(1, 5)]); // [1, 2, 3, 4]
console.log([...range(1, 10, 2)]); // [1, 3, 5, 7, 9]
console.log([...range(10, 1, -2)]); // [10, 8, 6, 4, 2]
```
