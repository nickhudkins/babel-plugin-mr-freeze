# ❄️☃️ Mr. Freeze ☃️❄️

A babel-transform to make `const` behave inconsistently with every other language, but perhaps in a less surprising way to many.

## Input 🔥
`const veryCold = { extremely: "cold" }`

## Output ❄️
`const veryCold = Object.freeze({ extremely: "cold" })`