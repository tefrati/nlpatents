var Xray = require("x-ray");

var xray = Xray({
  filters: {
    trim: function (value) {
      return typeof value === "string" ? value.trim() : value;
    },
    replace: function (value) {
      return typeof value === "string" ? value.replace(/\n\s*/g, " ") : value;
    },
    removeColumn: function (value) {
      return typeof value === "string" ? value.replace(":", "") : value;
    },
    slice: function (value, start , end) {
      return typeof value === "string" ? value.slice(start, end) : value;
    },
    parenthesisOff: function (value) {
      return typeof value === "string" ? value.replace(/\(|\)/g, "") : value;
    },
    addHttp: function(partialUrl) {
        return typeof partialUrl === "string" ? "http:" + partialUrl : partialUrl
    }
  }
});

const xToPromise = xQuery => {
  return new Promise((resolve, reject) => {
    xQuery((err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {xray, xToPromise}