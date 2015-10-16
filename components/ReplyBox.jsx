var CommentActions = require("../Flux.jsx").CommentActions;
var ReplyBox = React.createClass({

  getInitialState: function () {
    return {
      user: "",
      points: 0,
      text: ""
    }
  },
  userChange: function (event) {
    this.setState({user: event.target.value});
  },
  pointsChange: function (event) {
    this.setState({points: event.target.value});
  },
  textChange: function (event) {
    this.setState({text: event.target.value});
  },
  submit: function () {
    CommentActions.submitReply({
      user: this.state.user,
      points: this.state.points,
      text: this.state.text,
      commentId: this.props.commentId
    });
    this.props.toggle();
  },
  render: function () {
    var containerClass = "well col-sm-12";
    containerClass += this.props.hidden ? " hidden" : "";

    return (
      <div className={containerClass}>
        <div className="form-group col-sm-6">
          <input type="text" placeholder="user" className="form-control" value={this.state.user} onChange={this.userChange}/>
        </div>
        <div className="form-group col-sm-6">
          <input type="number" placeholder="123" className="form-control" value={this.state.points} onChange={this.pointsChange}/>
        </div>
        <div className="form-group col-sm-12">
          <textarea className="form-control" onChange={this.textChange}></textarea>
        </div>
        <div className="form-group col-sm-12">
          <button className="btn btn-default pull-right" onClick={this.submit}>Submit</button>
        </div>
      </div>
    );
  }
});

module.exports = ReplyBox;