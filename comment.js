var CommentBox = React.createClass({
  render: function () {
    return (
      <div className="comment col-sm-12">
        Hello World! I am a basic CommentBox.
      </div>
    )
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById("example")
);