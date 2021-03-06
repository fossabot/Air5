# Air5
![Node](https://raw.githubusercontent.com/SliceWire/True-Captcha/master/data/Logos/Badges/Node.png) ![Version](https://raw.githubusercontent.com/SliceWire/True-Captcha/master/data/Logos/Badges/Version.png) ![Build](https://raw.githubusercontent.com/SliceWire/True-Captcha/master/data/Logos/Badges/Build.png)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSliceWire%2FAir5.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FSliceWire%2FAir5?ref=badge_shield)

**Powerful Database System**

- Serverless

- Lightning Fast

- Simple

- 3x Faster Than Sqlite3

- Completely JavaScript

### Installation

```bash
$ npm i air5
```

```bash
$ yarn i air5
```

```bash
$ pnpm i air5
```

### Documentation

https://slicewire.gitbook.io/air5/

### Usage



**Basic Database:**

```js
const Air5 = require('air5')

const air = new Air5({

    name: 'Air5-database',

    directory: './Air5/'

})

air.set('Password', '%9g4HVx^loX/')

air.get('Password')

//===> %9g4HVx^loX/

console.log(air.data())

//===> { Password: '%9g4HVx^loX/' }
```

**Usage With JSON:**

```js
const Air5 = require('air5')

const air = new Air5({

    name: 'Air5-database',

    directory: './Air5/'

})

air.set('The King', {

    points: 9830,

    XP: 734,

    Coins: 530

})

air.set('The King', 748, 'XP')

//===> { points: 9830, XP: 748, Coins: 530 }

//===> Edit The King's XP

air.get('The King')

//===> { points: 9830, XP: 734, Coins: 530 }

console.log(air.data())

//===> { 'The King': { points: 9830, XP: 734, Coins: 530 }
```

### Using In Multiple Files

Create A File Called `Air5-Database.js` And Paste The Following Code Inside.

```js
const Air5 = require('air5')

Air5.air = new Air5({
    
    name: 'Air5-database',

    directory: './Air5',

})  
```

Then, You Can Require The Database In Another File:
  

```js
const Air5 = require('air5')

const air = Air5.air

air.set('The King', 748, 'XP')

//===> { points: 9830, XP: 748, Coins: 530 }

//===> Edit The King's XP

air.get('The King')

//===> { points: 9830, XP: 734, Coins: 530 }

console.log(air.data())

//===> { 'The King': { points: 9830, XP: 734, Coins: 530 }
```

Air5™ © 2020 SliceWire Technologies Inc.

*Power On.*

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSliceWire%2FAir5.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FSliceWire%2FAir5?ref=badge_large)