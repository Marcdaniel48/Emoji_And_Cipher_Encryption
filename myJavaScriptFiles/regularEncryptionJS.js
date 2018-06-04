/*
 * Marc-Daniel Dialogo
 * 1539756
 */

var g =
{
  numbersPattern : /[0-9]/,
  lettersPattern : /[a-zA-Z]/,
  characterList : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                           'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                           'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3',
                           '4', '5', '6', '7', '8', '9'],
  inputText : {},
  outputText : {},
  encryptionKey : {}
}

function init()
{
   g.inputText = document.getElementById("inputText");
   g.outputText = document.getElementById("outputText");
   g.encryptionKey = document.getElementById("encryptKey");

   // Populates the key dropdown box with lower case letter options
   for(var i = 0; i < g.characterList.length; i++)
   {
     var charOption = document.createElement('option');
     charOption.textContent = "Key: " + g.characterList[i];
     charOption.value = g.characterList[i];
     g.encryptionKey.appendChild(charOption);
   }
}

 /**
 * Caesar cipher encryption.
 * Encrypts the input string of the input text box according to a key.
 */
 function encrypt()
 {
  g.outputText.value = "";
  var splitText = g.inputText.value.split('');
  for(var i = 0; i < splitText.length; i++)
  {
    var code = splitText[i].toLowerCase().charCodeAt(0); // Will force every character into lower case
    code = updateCodePoint(code);
    g.outputText.value += String.fromCodePoint(code);
  }
 };

 /**
  * Takes a code point of a character and shifts it according to a key.
  *
  * @param {*} originalCode - The code point of a character.
  */
 function updateCodePoint(originalCode)
 {
   if(!g.lettersPattern.test(String.fromCodePoint(originalCode)) &&
     !g.numbersPattern.test(String.fromCodePoint(originalCode)))
     return originalCode;

   var theKey;
   for(var i = 0; i < g.characterList.length; i++)
   {
     if(g.encryptionKey.value == g.characterList[i])
       theKey = i+1; // +1, because arrays start with index 0
   }

   for(var i = 0; i < theKey; i++)
   {
     originalCode = checkFirstAndLast(originalCode);
   }

   return originalCode;
 }

 /**
 * Helper method to IncrementCodePoint.
 * The method takes in the code point of a Letter and checks to see if it is equivalent to a Z/z.
 * If it is, then the method changes that code point into an A/a equivalent and returns it.
 * Else, the method increments the code point by 1 and returns it.
 *
 * @param {*} character - The code point of a letter character.
 */
 function checkFirstAndLast(aChar)
 {
     if(String.fromCodePoint(aChar) == 'z')
     {
       return '0'.charCodeAt(0);
     }
     else if(String.fromCodePoint(aChar) == '9')
     {
       return 'a'.charCodeAt(0);
     }
     else
       return ++aChar;
 }

 // If the current user's browser is old, then use these regular caesar cipher functions
 if(!document.addEventListener)
 {
   U.addEvent(document, "readystatechange", init);
   U.addEvent(document, "readystatechange", encrypt);
   U.addEvent(document, "readystatechange", updateCodePoint);
   U.addEvent(document, "readystatechange", checkFirstAndLast);
   U.addEvent(document, "readystatechange", function()
   {
     U.addEvent(g.encryptionKey, "change", encrypt);
     U.addEvent(g.inputText, "input", encrypt);
   });
 }
