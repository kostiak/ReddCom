require("../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("./main.css");

var React = require("react");
var ReactDOM = require("react-dom");

var CommentBoxContainer = require("./components/CommentBoxContainer.jsx");

ReactDOM.render(
  <CommentBoxContainer />,
  document.getElementById("comments")
);