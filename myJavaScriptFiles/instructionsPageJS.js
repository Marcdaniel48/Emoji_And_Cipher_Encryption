/*
 * Marc-Daniel Dialogo
 * 1539756
 *
 *  Handles the slideshow actions of the instructions page.
 */


// A global namespace. HTML elements of the instructions page.
var g =
{
  image: {},
  text: {},
  prevButton: {},
  nextButton: {}
}

// A global namespace. Arrays that contain the images and text that the instructions page will display in a slideshow.
var arr =
{
  image:[
    "http://i.imgur.com/H4KsKCJ.jpg", "http://i.imgur.com/nWpSW0J.jpg", "http://i.imgur.com/1UVsOst.jpg",
    "http://i.imgur.com/rqIvc9w.png", "http://i.imgur.com/17CceXs.png" ],
  text:[
    "Welcome! If this is your first time visiting this site, then you have been most likely redirected to this page. And if not, then " +
    "you are here seeking a mini-tutorial on encryption and how to use this app. Let's begin (click the 'Next' button).",
    "Encryption is the process of encoding a message or information in such a way that only authorized parties can access it. " +
    "(source: Wikipedia). Basically, encryption is the act of taking a message (or file) and turning it into something unintelligible. "+
    "The message in its unencrypted form is called cleartext, while the message in its encrypted form is called ciphertext.",
    "To encrypt a text, something that's needed is an encryption key. In cryptography (the science behind encryption), " +
    "an encryption is a set of rules to follow when encrypting and decrypting cleartext. When encrypting with a certain key, " +
    "that very same key must be used, in order to decrypt the result of the encryption. You can't unlock a door with the wrong key.",
    "Now that you get the general idea behind encryption, let's talk about this site. This site is composed of 4 different pages: " +
    "'Encryption', 'Decryption', 'About', 'Instructions' (the page you are currently on). What they do are self-explanatory.",
    "My encryption page encrypts according to an emoji encryption key and the output ciphertext will be in emojis. " +
    "To start encrypting, all you have to do is start typing. You can choose the encryption key by going over the dropdown list. "+
    "Or you can encrypt according to the weather of a city. What that means is that by click on the 'Weather Encrypt' button, an input "+
    "field will appear allowing you to type in the name of a city, and once you have done so, an encryption key will be chosen based on that chosen city's "+
    "current weather. Once you are done encrypting, you can head over to the 'Decryption' page, select the same key you chose for your encryption " +
    "and paste your ciphertext. You're original message should then appear on the output box. Have fun!"
  ]
}

document.addEventListener("DOMContentLoaded", function()
{
  g.image = document.getElementById("instructionsImage");
  g.image.src = arr.image[0];
  g.text = document.getElementById("instructionsText");
  g.text.textContent = arr.text[0];
  g.prevButton = document.getElementById("previousImageBtn");
  g.prevButton.disabled = true;
  g.nextButton = document.getElementById("nextImageBtn");

  /**
  * Displays the next image and text, and if the user is on the last image/text, then the next buton will be disabled.
  * The previous button will be enabled if it has been disabled.
  */
  function next()
  {
      for(var i = 0; i < arr.image.length; i++)
      {
        if(g.image.src == arr.image[i])
        {
          g.image.src = arr.image[i+1];
          g.text.textContent = arr.text[i+1];

          if(g.image.src != arr.image[0] && g.prevButton.disabled == true)
            g.prevButton.disabled = false;

          if(g.image.src == arr.image[arr.image.length-1])
            g.nextButton.disabled = true;
          break;
        }
      }
  }

  /**
  * Displays the previous image and text, and if the user is on the first image/text, then the previous buton will be disabled.
  * The next button will be enabled if it has been disabled.
  */
  function previous()
  {
      for(var i = 0; i < arr.image.length; i++)
      {
        if(g.image.src == arr.image[i])
        {
          g.image.src = arr.image[i-1];
          g.text.textContent = arr.text[i-1];

          if(g.image.src != arr.image[arr.length-1] && g.nextButton.disabled == true)
            g.nextButton.disabled = false;

          if(g.image.src == arr.image[0])
            g.prevButton.disabled = true;
          break;
        }
      }
  }

  g.nextButton.onclick = next;
  g.prevButton.onclick = previous;
});
