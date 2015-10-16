var ReplyBox = require("./ReplyBox.jsx");
var moment = require("../bower_components/moment/moment");
var React = require("../node_modules/react/react");

var CommentBox = React.createClass({
  getInitialState: function () {
    return {
      reply: false
    };
  },
  toggleReply: function () {
    this.setState({
      reply: !this.state.reply
    })
  },
  render: function () {
    var nestedComments = "";
    if(this.props.comment.nested){
      nestedComments = this.props.comment.nested.map(function (nested) {
        return (
          <div className="nested comment" key={nested.key}>
            <CommentBox comment={nested}/>
          </div>
        );
      });
    }

    return (
      <div>
        <div className="vote">
          <i className="glyphicon glyphicon-chevron-up"></i> <br/>
          <i className="glyphicon glyphicon-chevron-down"></i>
        </div>
        <div className="comment-body">
          <a href="#">{this.props.comment.name}</a>
          <span className="small points">{this.props.comment.points} Points</span>
          <span>{moment(this.props.comment.time).fromNow()} </span>
          <div>{this.props.comment.text}</div>
          <a onClick={this.toggleReply}>reply</a>
          <ReplyBox toggle={this.toggleReply} hidden={!this.state.reply} commentId={this.props.comment.key}/>
          {nestedComments}
        </div>
      </div>
    )
  }
});

module.exports = CommentBox;