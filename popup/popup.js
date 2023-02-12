// Copy the message ID!
copyMessageIDToMu4e().catch(reportError);

async function copyMessageIDToMu4e() {
  let tabs = await browser.tabs.query({active: true, currentWindow: true});
  if (tabs.length != 1) {
    throw new Error("Expected a single selected tab (got " + tabs.length + ")");
  }

  tabID = tabs[0].id;

  let message = await browser.messageDisplay.getDisplayedMessage(tabID);
  if (!message) {
    throw new Error("No message selected");
  }

  var options = {
    prefix: "",
    suffix: "",
    copyBrackets: false,
    urlEncode: false,
    raw: false
  };
  let config = await browser.storage.local.get("copyID");
  if (config.copyID) {
    options = config.copyID;
  }

//  var message_id = "";
//  var subject = ""; 

  let parts = await browser.messages.getFull(message.id);
  var message_id = parts.headers["message-id"][0];
  var subject = parts.headers["subject"][0];
  // Remove the brackets from the message-id
  if (message_id[0] == '<' && message_id[message_id.length - 1] == '>') {
    message_id = message_id.slice(1,-1);
  }

  await doCopy(message_id, subject);
}

async function doCopy(message_id, subject) {
  console.log(message_id);
    
  let s = "[[mu4e:msgid:" + message_id + "][" + subject + "]]";
  await navigator.clipboard.writeText(s);
  console.log("successfully copied message ID");
  reportSuccess(s);
}

function reportSuccess(message_id) {
  var time = 1500;
  document.querySelector("#message-id").append(message_id);
  var timeout = setTimeout(() => {  window.close(); }, time);
  // Stop the window close timeout if the user is interacting with it.
  document.onmouseover = function() {
    clearTimeout(timeout);
  }
  document.onmouseout = function() {
    timeout = setTimeout(() => {  window.close(); }, time);
  }
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportError(error) {
  document.body.style.background = "#C80000";
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-string").append(error.message);
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to copy message ID: ${error.message}`);
}
