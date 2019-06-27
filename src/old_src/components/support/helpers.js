// Need to use bracket notation for objects because we are using variables
// that hold strings in order to do our lookups

export const groupByProperty = (array, property) => {
  // create an accumulator, iterate over objects
  return array.reduce((accumulator, object) => {
    // create a KEY from the VALUE of the object's designated property
    var key = object[property];
    // if the accumulator object doesn't have that property yet
    // (i.e. it hasn't encountered a designated property instance with that value yet)...
    if (!accumulator[key]) {
      // create an accumulator property for it
      accumulator[key] = [];
    }
    // append objects to correct accumulator property
    accumulator[key].push(object);
    return accumulator;
  }, {});
};

// form new URL from active tags
export const stringOfTags = tags => {
  console.log('string of tags got tags: ', tags);
  var tags_for_url = '';
  tags.forEach(tag => {
    if (tag.isActive) {
      tags_for_url += tag.tagname + ',';
    }
  });
  if (tags_for_url === '') {
    return '';
  } else {
    return tags_for_url.slice(0, -1);
  }
};

// PROBABLY NOT NECESSARY SINCE YOU CAN USE MATCH PARAMS
// less ideal too
// Get the comma separated string of tags from URL path
export const tagStringFromURL = path => {
  var tag_string;
  path === ''
    ? (tag_string = '')
    : (tag_string = path.substring(path.lastIndexOf('/') + 1));
  return tag_string;
};

export const validOwner = props => {
  var valid_owner = false;
  props.user !== null &&
  props.user.username === props.match.params.username &&
  props.isAuthenticated
    ? (valid_owner = true)
    : null;
  return valid_owner;
};
