var McFly = require("./bower_components/mcfly/dist/McFly");
var _data = require("./data.js");
var guidGenerator = require("./utils").guidGenerator;
var Flux = new McFly();

function submitReply(reply){
  //will be simplified once a backend is implemented
  _data.forEach(function (comment) {
    pushReplay(reply, comment);
  });
}

function pushReplay(reply, comment){
  if(comment.key === reply.commentId){
    if(!comment.nested) comment.nested = [];
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

var CommentActions = Flux.createActions({
  submitReply: function (reply) {
    return {
      actionType: "SUBMIT_REPLY",
      reply: reply
    }
  }
});

var CommentStore = Flux.createStore({
  getComments: function () {
    return _data;
  }
}, function (payload) {
  if(payload.actionType === "SUBMIT_REPLY"){
    console.log("before", _data);
    submitReply(payload.reply);
    console.log("after", _data);
    CommentStore.emitChange();
  }
});

module.exports = {CommentActions, CommentStore};