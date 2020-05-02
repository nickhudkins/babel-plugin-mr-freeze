const babel = require('babel-core');
const mrFreeze = require('./index');
const assert = require('assert');

const example = `
 const nestedFreeze = {
   freeze: {
     me: "too"
   }
 };

 const singleFreeze = { very: "cold" };

 let notFrozen = {
   this: {
     will: {
       break: {
         huh: false
       }
     }
   }
 }
 `;

const expected = `
const nestedFreeze = Object.freeze({
  freeze: Object.freeze({
    me: "too"
  })
});

const singleFreeze = Object.freeze({ very: "cold" });

let notFrozen = {
  this: {
    will: {
      break: {
        huh: false
      }
    }
  }
};`

// Worlds most fragile test? Probably
it('Freezes Object Expressions bound with `const`', () => {
  const {code} = babel.transform(example, {plugins: [mrFreeze]});
  assert(code === expected)
});


