

//Example 1: sets up service wrapper, sends initial message, and
// receives response.

var ConversationV1 = require('watson-developer-cloud/conversation/v1');




// Set up Conversation service wrapper.
var conversation = new ConversationV1({
  username: '279df342-8693-456e-92fe-3837a11c8949', // replace with username from service key
  password: 'L3U6au2KJfxG', // replace with password from service key
  path: { workspace_id: '169456e5-1c37-4869-984c-2fb9b99f5b9a' }, // replace with workspace ID
  version_date: '2016-07-11'
});

// Start conversation with empty message.
conversation.message({}, processResponse);

// Process the conversation response.
function processResponse(err, response) {
  if (err) {
    console.error(err); // something went wrong
    return;
  }

  // Display the output from dialog, if any.
  if (response.output.text.length != 0) {
      console.log(response.output.text[0]);
  }
}