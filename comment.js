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
          <div className="nested comment">
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
          <span>{moment(this.props.comment.time).fromNow()}</span>
          <div>{this.props.comment.text}</div>
          <a onClick={this.toggleReply}>reply</a>
          <ReplyBox hidden={!this.state.reply}/>
          {nestedComments}
        </div>
      </div>
    )
  }
});

var CommentBoxContainer = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.data.map(function (comment) {
          return (
            <div className="col-sm-12 comment">
              <CommentBox comment={comment} />
            </div>
          )
        })}
      </div>
    );
  }
});

var data = [{
  name: "someNameA",
  points: 156,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque effic scelerisque effic sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
  time: new Date().getTime()-1000*60*60*4,
  nested: [{
    name: "someNameC",
    points: 25,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
    time: new Date().getTime()-1000*60*60*3,
    nested: [{
      name: "someNameD",
      points: 205,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque effic scelerisque effic sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque effic scelerisque effic sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
      time: new Date().getTime()-1000*60*60*2
    }]
  },{
    name: "someNameD",
    points: 15,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
    time: new Date().getTime()-1000*60*60*1
  }]
}, {
  name: "someNameC",
  points: 25,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
  time: new Date().getTime()-1000*60*60*3,
  nested: [{
    name: "someNameD",
    points: 205,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
    time: new Date().getTime()-1000*60*60*2
  }]
}, {
  name: "someNameC",
  points: 25,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
  time: new Date().getTime()-1000*60*60*3,
  nested: [{
    name: "someNameD",
    points: 205,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
    time: new Date().getTime()-1000*60*60*2
  }]
}];

ReactDOM.render(
  <CommentBoxContainer data={data} />,
  document.getElementById("comments")
);