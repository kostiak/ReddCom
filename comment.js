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

var comment1 = {
  name: "coolguy",
  points: 255,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim purus sed scelerisque efficitur. Morbi semper congue erat, in ultricies erat pellentesque vitae. In hac habitasse platea dictumst. Fusce venenatis nec dolor ut vehicula. Vivamus pellentesque, neque sit amet blandit gravida, ipsum libero lobortis risus, at vehicula risus nulla a nisl. Nam at nibh quam. Fusce massa nibh, mollis et rutrum sed, condimentum eget urna. Vestibulum nec semper dui. Fusce in ligula rutrum, tempus purus id, sagittis eros. Cras eu nisi sed massa venenatis mattis. Ut vehicula sapien non diam molestie, at pharetra neque aliquet. Praesent a consequat lacus.",
  time: new Date().getTime()-1000*60*60
};

var comment2 = {
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
};

ReactDOM.render(
  <CommentBox comment={comment2} />,
  document.getElementById("comment2")
);