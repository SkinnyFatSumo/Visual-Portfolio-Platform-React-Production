// Need to use BRACKET NOTATION for objects because we are using VARIABLES 
// that hold STRINGS in order to do our lookups


// This functions accumulates OBJECTS from an ARRAY OF OBJECTS into an 
// ACCUMULATER OBJECT based on the VALUES of a DESIGNATED COMMON PROPERTY in 
// said objects.
//
// The VALUE for said property in each of the objects itself becomes a 
// KEY (PROPERTY) in the ACCUMULATOR OBJECT, and the VALUE of that NEW KEY is 
// an ARRAY of the OBJECTS who's designated common property had THE SAME VALUE

export const groupObjectsByProperty = (array_of_objects, property) => {
  return array_of_objects.reduce((accumulator, current_object) => {
    var key = current_object[property];
    if (!accumulator[key]) accumulator[key] = [];
    accumulator[key].push(current_object);
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
  if (
    props.user !== null &&
    props.match !== undefined && 
    props.user.username === props.match.params.username &&
    props.isAuthenticated
  )
    return true;
  else return false;
};
