var McFly = require("mcfly");
var Firebase = require("firebase");
var Flux = new McFly();
var guidGenerator = require("./utils.js").guidGenerator;

var _data = [];

var rootRef = new Firebase("https://reddcom.firebaseio.com");

rootRef.on("value", function (snapshot) {
  console.log("got new snapshot");
  _data = snapshot.val();
  CommentStore.emitChange();
}, function (err) {
  console.error("Firebase error:", err)
});

function submitReply(reply){
  //This really needs a proper backend, this is not good enough even for the demo
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
//    CommentStore.emitChange();
  }
});

module.exports = {CommentActions, CommentStore};