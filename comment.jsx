require("./bower_components/bootstrap/dist/css/bootstrap.min.css");
require("./main.css");

var CommentBoxContainer = require("./components/CommentBoxContainer.jsx");

ReactDOM.render(
  <CommentBoxContainer />,
  document.getElementById("comments")
);