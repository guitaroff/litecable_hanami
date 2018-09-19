alert('channel');

App.channel = (function() {
  function init(configuration) {
    return configureCable(configuration);
  }

  // configure and create cable using identifier and functions
  function configureCable(configuration) {
    return createCable().subscriptions
             .create(configuration.identifiers,
                     configuration.functions);
  }

  function createCable() {
    return ActionCable
             .createConsumer('ws://localhost:9293/cable'
                             + '?sid=' + socketId());
  }

  // Unique identifier for a connection
  function socketId() {
    return Date.now;
  }

  //function generateRandomNumber() {...}

  return {
    init: init
  }
}());
