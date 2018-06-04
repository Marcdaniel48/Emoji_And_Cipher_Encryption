/*
 * Marc-Daniel Dialogo
 * 1539756
 *
 *  Sets a visit cookie.
 */

 // If this is the first time the user accessed the site, then redirect the user to the instructions page.
 // Also redirect users who haven't visited the site in 7 days.
 if(COOKIE.getCookie("alreadyVisited") == false)
 {
   var expiration = new Date();
   expiration.setDate(expiration.getDate() + 7);          // Expire cookie in a week.
   COOKIE.setCookie("alreadyVisited", true, expiration);
   window.location = "instructionsPage.html";             // Redirects user to the instruction page.
 }
