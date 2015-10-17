var McFly = require("mcfly");
var Firebase = require("firebase");
var Flux = new McFly();
var guidGenerator = require("./utils.js").guidGenerator;

var _data = [];

var rootRef = new Firebase("https://reddcom.firebaseio.com");

rootRef.on("value", function (snapshot) {
  _data = snapshot.val();
  CommentStore.emitChange();
}, function (err) {
  console.error("Firebase error:", err)
});

function submitReply(reply){
  //This really needs a proper backend, this is not good enough even for the demo
  if(reply.commentId) {
    _data.forEach(function (comment) {
      pushReplay(reply, comment);
    });
  } else {
    _data.push({
      name: reply.user,
      points: reply.points,
      text: reply.text,
      time: Date.now(),
      key: guidGenerator()
    });
    rootRef.set(_data);
  }
}

function pushReplay(reply, comment){
  if(comment.key === reply.commentId){
    if(!comment.nested) comment.nested = [];
    comment.nested.push({
      name: reply.user,
      points: reply.points,
      text: reply.text,
      time: Date.now(),
      key: guidGenerator()
    });
    rootRef.set(_data);
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
    submitReply(payload.reply);
  }
});

module.exports = {CommentActions, CommentStore};