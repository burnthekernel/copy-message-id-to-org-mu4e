# Copy Message ID as an org mode link to mu4e 

This is an extension that adds a button to the message header toolbar to
copy the message ID to the clipboard so that it can be pasted into an org
buffer as a link to a mu4e message in Emacs. 

## Usage
- Click on button `[[org-link mu4e]]`. This will copy the message id and 
format it as an org mode link to the e-mail. Example:
`[[mu4e:msgid:qwertyDZRR-EmowQ6lJzIA@beopod-ismtpd-canary-0][Subject of this mail]]`
- Paste/Yank in Emacs Org document.

## Not in Mozilla Thunderbird add-ons platform
This is a trivial plugin that modifies https://github.com/garoose/copy-message-id.
At the moment, I have no intention to add it to Mozilla Thunderbird's add-ons 
platform.

## Installation
- Download copy-message-id-to-org-mu4e.xpi from Releases.
- In Thunderbird, go to the `Add-ons Manager`.
- Click `Install Add-on From File...` and select the `copy-message-id-to-org-mu4e.xpi`.

