function guidGenerator() {
  var S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var Flux = new McFly();

function submitReply(reply){
  //will be simplified once a backend is implemented
  _data.forEach(function (comment) {
    pushReplay(reply, comment);
  });
}

function pushReplay(reply, comment){
  if(comment.key === reply.commentId){
    comment.nested.push({
      name: reply.user,
      points: reply.points,
      text: reply.text,
      time: new Date().getTime(),
      key: guidGenerator()
    });
  } else if(comment.nested) {
    comment.nested.forEach(function (nestComment) {
      pushReplay(reply, nestComment);
    });
  }
}

function getState() {
  return {
    comments: CommentStore.getComments()
  }
}

var CommentStore = Flux.createStore({
  getComments: function () {
    return _data;
  }
}, function (payload) {
  if(payload.actionType === "SUBMIT_REPLY"){
    submitReply(payload.reply);
    CommentStore.emitChange();
  }
});

var CommentActions = Flux.createActions({
  submitReply: function (reply) {
    return {
      actionType: "SUBMIT_REPLY",
      reply: reply
    }
  }
});

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

var CommentBoxContainer = React.createClass({
  mixins: [CommentStore.mixin],
  getInitialState: function () {
    return getState();
  },
  onChange: function () {
    this.setState(getState());
    console.log(this.state);
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


var _data = [{
  name: "someNameA",
  points: 156,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque effic scelerisque effic sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
  time: new Date().getTime()-1000*60*60*4,
  key: guidGenerator(),
  nested: [{
    name: "someNameC",
    points: 25,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
    time: new Date().getTime()-1000*60*60*3,
    key: guidGenerator(),
    nested: [{
      name: "someNameD",
      points: 205,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque effic scelerisque effic sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque effic scelerisque effic sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
      time: new Date().getTime()-1000*60*60*2,
      key: guidGenerator()
    }]
  },{
    name: "someNameD",
    points: 15,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
    time: new Date().getTime()-1000*60*60*1,
    key: guidGenerator()
  }]
}, {
  name: "someNameC",
  points: 25,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
  time: new Date().getTime()-1000*60*60*3,
  key: guidGenerator(),
  nested: [{
    name: "someNameD",
    points: 205,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
    time: new Date().getTime()-1000*60*60*2,
    key: guidGenerator()
  }]
}, {
  name: "someNameC",
  points: 25,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
  time: new Date().getTime()-1000*60*60*3,
  key: guidGenerator(),
  nested: [{
    name: "someNameD",
    points: 205,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
    time: new Date().getTime()-1000*60*60*2,
    key: guidGenerator()
  }]
}];

ReactDOM.render(
  <CommentBoxContainer />,
  document.getElementById("comments")
);