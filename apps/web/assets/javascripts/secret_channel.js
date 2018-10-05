//alert('secret_channel');

var socketId = Date.now();
var messageList = document.getElementById("message_list");

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

var secretChannel = cable.subscriptions.create(
  { channel: 'secret_channel'},
  {
    connected: function(){
      console.log("Secret channel connected");
      addMessage({ user: 'BOT', message: "I'm connected", system: true });
      addMessage({ message: "Hello from broadcast!"}); 
    },

    disconnected: function(){
      console.log("Secret channel disconnected");
      addMessage({ user: 'BOT', message: "Sorry, but you've been disconnected(", system: true });
    },

    received: function(data) {
      console.log("Received", data);
      addMessage(data);
      // return new Notification(data['title'], {
      //   body: data['body']
      // });
    }
});
