'use strict';

module.exports = {
  offset: function(offset) {
    var regex = /^[0-9\-]/;
    var arr = offset.split(' ');
    if (arr.length !== 2 || !regex.test(arr[0]) || !regex.test(arr[1])) {
      throw new Error('value offset invalid, you should set something like "-10px 0"');
    }
  },

  where: function(where) {
    if (!where || where === '') {
      throw new Error('value where invalid, you should set something like "top left"');
    }

    var arr = where.split(' ');
    if (arr.length < 2 || arr.length > 3) {
      throw new Error('value where invalid, you should set something like "top left"');
    }

  }
};
