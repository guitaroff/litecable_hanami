alert('chat channel');

var socketId = Date.now();

var messageList = document.getElementById("message_list");
var messageForm = document.getElementById("message_form");
var textInput = document.getElementById("message_txt");

messageForm.onsubmit = function(e){
  e.preventDefault();
  var msg = textInput.value;
  console.log("Send message", msg);
  textInput.value = null;
  console.log(chatChannel);
  chatChannel.perform('speak', { message: msg });
};

var escape = function(str) {
  return ('' + str).replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;')
                   .replace(/"/g, '&quot;');
}

var addMessage = function(data){
  var node = document.createElement('div');
  var me = data['user'] == data['sid'] == socketId
  node.className = "message" + (me ? ' me' : '') + (data['system'] ? ' system' : '');
  node.innerHTML =
    '<div class="txt">' + escape(data['message']) + '</div>';
  messageList.appendChild(node);
};

ActionCable.startDebugging();
var cable = ActionCable.createConsumer('ws://localhost:9293/cable?sid=' + socketId);
console.log(cable);

var chatChannel = cable.subscriptions.create(
  { channel: 'chat' },
  {
    connected: function(){
      console.log("Connected");
      addMessage({ user: 'BOT', message: "I'm connected", system: true });
    },

    disconnected: function(){
      console.log("Disconnected");
      addMessage({ user: 'BOT', message: "Sorry, but you've been disconnected(", system: true });
    },

    received: function(data){
      console.log("Received", data);
      addMessage(data);
    }
  }
)
