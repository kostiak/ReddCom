var CommentBox = React.createClass({
  render: function () {
    return (
      <div>
        <div className="vote">
          <i className="glyphicon glyphicon-chevron-up"></i>
          <i className="glyphicon glyphicon-chevron-down"></i>
        </div>
        <div className="comment-body">
          <a href="#">{this.props.comment.name}</a>
          <span className="small points">{this.props.comment.points} Points</span>
          <span>{moment(this.props.comment.time).fromNow()}</span>
          <div>{this.props.comment.text}</div>
          <a href="#">reply</a>
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

ReactDOM.render(
  <CommentBox comment={comment1} />,
  document.getElementById("comment1")
);