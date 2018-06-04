/*
* Marc-Daniel Dialogo
* 1539756
*
* Does the opposite of the 'regularEncryptionJS.js' Javascript file, as in it handles decrypting for older browsers.
*/

// A global namespace. Html elements & shift number.
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

/**
* Gets any necessary html elements and sets them into the 'g' global namespace.
*/
function init()
{
  g.inputText = document.getElementById("inputText");
  g.outputText = document.getElementById("outputText");
  g.encryptionKey = document.getElementById("encryptKey");
}


function decrypt()
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


function updateCodePoint(originalCode)
{
  // Checks to see the param character is within the scope of characters to be encrypted. If not, ignore and return the character.
  if(!g.lettersPattern.test(String.fromCodePoint(originalCode)) && !g.numbersPattern.test(String.fromCodePoint(originalCode)))
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

function checkFirstAndLast(character)
{
  if(String.fromCodePoint(character) == '0')
  {
    return 'z'.charCodeAt(0);
  }
  else if(String.fromCodePoint(character) == 'a')
  {
    return '9'.charCodeAt(0);
  }
  else
  return --character;
}

if(!document.addEventListener)
{
  U.addEvent(document, "readystatechange", init);
  U.addEvent(document, "readystatechange", decrypt);
  U.addEvent(document, "readystatechange", updateCodePoint);
  U.addEvent(document, "readystatechange", checkFirstAndLast);
  U.addEvent(document, "readystatechange", function()
  {
    U.addEvent(g.encryptionKey, "change", decrypt);
    U.addEvent(g.inputText, "input", decrypt);
  });
}
