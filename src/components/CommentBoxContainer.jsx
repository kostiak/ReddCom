var CommentStore = require("../Flux.jsx").CommentStore;
var CommentBox = require("./CommentBox.jsx");
var React = require("../../node_modules/react/react");

function getState() {
  return {
    comments: CommentStore.getComments()
  }
}

var CommentBoxContainer = React.createClass({
  mixins: [CommentStore.mixin],
  getInitialState: function () {
    return getState();
  },
  onChange: function () {
    this.setState(getState());
  },
  render: function () {
    return (
      <div>
        {this.state.comments.map(function (comment) {
          return (
            <div className="col-sm-12 comment" key={comment.key}>
              <CommentBox comment={comment} />
            </div>
          )
        })}
      </div>
    );
  }
});

module.exports = CommentBoxContainer;