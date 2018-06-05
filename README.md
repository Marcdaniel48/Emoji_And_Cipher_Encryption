# Emoji_Encryption
Using the Caesar Cipher algorithm and a user-selected key, this site encrypts cleartext entered by the user into either a bunch of emojis or alphanumeric characters. As well as being able to encrypt text, this site supports decrypting.

Note: each page incorporates a JavaScript file that redirects first-time users based on whether they don't have an 'alreadyVisited' cookie attribute. This is intentional, because this site will redirect first-time users to a tutorial-like page.

Google Chrome doesn't support local cookies, so the cookie will never be created, causing the user to always be redirected.
This site cannot be properly accessed on Google Chrome, unless it's being run on an HTTP server or anything of the like.
'myJavaScriptFiles/setAlreadyVisitedCookies.js' is the file that's causing the redirects.
