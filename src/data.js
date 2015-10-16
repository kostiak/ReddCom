var guidGenerator = require("./utils.js").guidGenerator;

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

module.exports = _data;