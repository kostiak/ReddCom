require("../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("./main.css");

var React = require("react");
var ReactDOM = require("react-dom");

var ReplyBox = require("./components/ReplyBox.jsx");
var CommentBoxContainer = require("./components/CommentBoxContainer.jsx");

ReactDOM.render(
  <div>
    <ReplyBox commendId={null}/>
    <CommentBoxContainer />
  </div>,
  document.getElementById("comments")
);