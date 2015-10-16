require("../bower_components/bootstrap/dist/css/bootstrap.min.css");
require("./main.css");
var React = require("../node_modules/react/dist/react");
var ReactDOM = require("../node_modules/react-dom/dist/react-dom");

var CommentBoxContainer = require("./components/CommentBoxContainer.jsx");

ReactDOM.render(
  <CommentBoxContainer />,
  document.getElementById("comments")
);