/* misc.js
 *
 * Toolkit and library of useful functions
 */

/* existy(x) - define the existence of something and not null or undefined */
export function existy(x) { return x != null; }

/* truthy(x) - determine if something should be a synonym for true */
export function truthy(x) { return (x !== false) && existy(x); }

// Simplest example compare function
export function compare(a, b) {
  let cmp = 0;
  if (a > b) {
    cmp = 1;
  } else if (b > a) {
    cmp = -1;
  }
  return cmp;
}

// dynamic compare object key/valuess
export function compareValues(key, order = 'asc') {
  return function (a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? (comparison * -1) : comparison
    );
  };
}




/* memoize(fn) -
 *
 * Use immutable data structures with this */
export function memoize(fn) {
  var prevArg;
  var prevResult;

  return function (arg) {
    return arg === prevArg ?
      prevResult :
      (prevArg = arg,
        prevResult = fn.call(this, arg));
  }
}

/* shallowEqual(objA, objB) -   */
export function shallowEqual(objA, objB) {
  // test for A's keys different from B.
  for (var key in objA) {
    if (!(key in objB) || objA[key] !== objB[key]) {
      return false;
    }
  }

  // test for B's keys missing from A.
  for (key in objB) {
    if (!(key in objA)) {
      return false;
    }
  }

  return true;
}


export function map([head, ...tail], fn) {
  if (head === undefined && !tail.length) return [];
  return tail.length ? [fn(head), ...(map(tail, fn))] : [fn(head)];
}


export function filter([head, ...tail], fn) {
  const newHead = fn(head) ? [head] : [];
  return tail.length ? [...newHead, ...(filter(tail, fn))] : newHead;
}


export function reduce([head, ...tail], fn, initial) {
  if (head === undefined && tail.length === 0) return initial;
  if (!initial) {
    const [newHead, ...newTail] = tail;
    return reduce(newTail, fn, fn(head, newHead));
  }
  return tail.length ? reduce(tail, fn, fn(initial, head)) : [fn(initial, head)];
}






/* isPrime(num) - true test for determining if a number is prime */
export function isPrime(num) {
  // if num is less than 2 or not an integer then cannot be prime
  if (num < 2) { return false; }
  if (num !== Math.round(num)) { return false; }

  // Now assume num is prime, try prove is not
  let isItPrime = true;

  // now check every whole number from 2 to the square root of n.
  // if any of these divides num exactly, num cannnot be prime.
  for (var i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) { isItPrime = false; }
  }

  // finally return result if prime or not
  return isItPrime;
}


// Generate cryptographically secure random string for
// use as a password salt using Node's built-in crypto.RandomBytes()
export function createSalt(keyLength, cb) {
  crypto.randomBytes(keyLength, (err, buff) => {
    if (err) {
      return cb(err);
    }
    cb(null, buff.toString('base64'));
  });
}
