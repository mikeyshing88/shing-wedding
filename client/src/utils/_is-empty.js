/**
 * Tests whether an object is empty
 * @param  {Object}  obj Object to test
 * @return {Boolean}
 */
export default function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
