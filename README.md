# Calculator

## Description

This calculator project was made for TOP curriculum. We were required to make
a simple calculator that does basic arithmetic functions. And would only do
calculations for 2 numbers at a time. On top of it, i added a secondary display,
and also some unary operations.

I tried to implement real time input verification so that "1.222222" automatically
converts to "1.2" and on screen "1.22222" is not shown.

Design Inspiration & Credit : https://dribbble.com/shots/9631225--Design-for-DailyUi-Day004-Calculator/attachments/1659581?mode=media

## Usage

### Installing

In order to use, just clone this repo, and run `index.html`
on any browser or just go to this link to check live version:- https://as00r-dev.github.io/calculator/.
Feel free to copy, remix and use this code for your own projects. If you get stuck, let me know and i
will help.

### Folder structure

Here's a folder structure:

```
calculator/                  # Root directory.
|- index.html                # Index
|- app.js                    # Script
|- style.css                 # Style
```

### app.js details

Operation functions: These functions are responsible for calculating and
returning the answer. Some functions work with 2 numbers (ex: `add`), some
work with one (ex: `squareRoot`). For changing sign, no special function is used.

Operation Triggers: These are `operateBinary` and `operateUnary` which takes the numbers
and symbols and call the required operation function.

`displayOnMainScreen()` & `displayOnSecondaryScreen()`: These functions take a string and
display it on respective screens.

`symbolHandler()` and `numberHandler()`: `numberHandler()` is responsible for handling number
inputs including the decimal point. Rest inputs are handled by `symbolHandler()`.

Global Variables: `calculator` object stores the numbers and the operator. It is used to call
the operation trigger functions. `hasUserEnteredDecimal` is a boolean variable used to track
if decimal point has been entered by user while inputting a number. This is done because decimal
is automatically added to the numbers.
