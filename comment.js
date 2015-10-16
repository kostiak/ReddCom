var CommentBox = React.createClass({
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
          <a href="#">reply</a>
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
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitu",
  time: new Date().getTime()-1000*60*60*4,
  nested: [{
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