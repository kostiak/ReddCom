var CommentStore = require("../Flux.jsx").CommentStore;
var CommentBox = require("./CommentBox.jsx");
var React = require("react");

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
  storeDidChange: function () {
    this.setState(getState());
  },
  render: function () {
    var commentArray = [];
    Object.keys(this.state.comments).forEach(function (key) {
      var comment = this.state.comments[key];
      commentArray.push(<div className="col-sm-12 comment" key={comment.key}>
        <CommentBox comment={comment} />
      </div>);
    }.bind(this));
    return (
      <div>{commentArray}</div>
    );
  }
});

module.exports = CommentBoxContainer;