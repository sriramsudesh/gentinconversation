// Example 4: implements app actions.

var prompt = require('prompt-sync')();
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service.
var conversation = new ConversationV1({
  username: '279df342-8693-456e-92fe-3837a11c8949', // replace with username from service key
  password: 'L3U6au2KJfxG', // replace with password from service key
  path: { workspace_id: '169456e5-1c37-4869-984c-2fb9b99f5b9a' }, // replace with workspace ID
  version_date: '2016-07-11'
});


// Start conversation with empty message.
conversation.message({}, processResponse);

// If an intent was detected, log it out to the console.



// Process the conversation response.
function processResponse(err, response) {

  if (err) {
    console.error(err); // something went wrong
    return;
  }

  var endConversation = false;

   // If an intent was detected, log it out to the console.
  if (response.intents.length > 0) {
    console.log('Detected intent: #' + response.intents[0].intent);
  }

  
 


  // Check for action flags.
  if (response.output.action === 'display_time') {
    // User asked what time it is, so we output the local system time.
    console.log('The current time is ' + new Date().toLocaleTimeString());
  } else if (response.output.action === 'end_conversation') {
    // User said goodbye, so we're done.
    console.log(response.output.text[0]);
    endConversation = true;
  } else {
    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
        console.log(response.output.text[0]);
    }
  }

  // If we're not done, prompt for the next round of input.
  if (!endConversation) {
    var newMessageFromUser = prompt('>> ');
    conversation.message({
      input: { text: newMessageFromUser },
      // Send back the context to maintain state.
      context : response.context,
    }, processResponse)
  }
}
