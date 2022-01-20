const hbs = require("hbs");
const moment = require("moment");

// CUSTOM HELPERS
hbs.registerHelper("isSelected", function (needle, haystack) {
  return Array.isArray(haystack)
    ? haystack.map((e) => e.name).includes(needle)
      ? "selected"
      : ""
    : haystack.name === needle
      ? "selected"
      : "";
});

hbs.registerHelper("titiOrToto", function () {
  const random = Math.random();
  return random < 0.5 ? "titi" : "toto";
});

hbs.registerHelper("toLowerCase", function (str) {
  return str.toLowerCase();
});

hbs.registerHelper("toJSON", (val) => JSON.stringify(val, null, 1));

hbs.registerHelper("increment", (val, count) => Number(val) + Number(count));

// function below: add the ternary operator functionnality to .hbs files
// usage : {{ ternary true "yay" "nay " }} => prints yay
// usage : {{ ternary NaN "yay" "nay " }} => prints nay

hbs.registerHelper("ternary", (test, yes, no) => (test ? yes : no));

// add comparison operator feature to hbs templates
/* 

USAGE =>

{{#compare 1 10 operator="<" }}
  awesome, 1 is less thant 10 !!!
{{/compare }}
*/

hbs.registerHelper("compare", function (lvalue, rvalue, options) {
  console.log(lvalue, rvalue);
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 3 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    "==": function (l, r) {
      return l == r;
    },
    "===": function (l, r) {
      return l === r;
    },
    "!=": function (l, r) {
      return l != r;
    },
    "<": function (l, r) {
      return l < r;
    },
    ">": function (l, r) {
      return l > r;
    },
    "<=": function (l, r) {
      return l <= r;
    },
    ">=": function (l, r) {
      return l >= r;
    },
    typeof: function (l, r) {
      return typeof l == r;
    },
  };

  if (!operators[operator])
    throw new Error(
      "Handlerbars Helper 'compare' doesn't know the operator " + operator
    );

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("formatDate", function (date) {
  console.log("date", date)
  return moment(date).format("DD/MM/YYYY");
});
