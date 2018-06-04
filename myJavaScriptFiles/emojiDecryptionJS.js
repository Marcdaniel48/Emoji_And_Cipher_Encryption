/*
* Marc-Daniel Dialogo
* 1539756
*
* JavaScript file that handles emoji caesar cipher decryption for modern browsers.
* Incorporates a function from the 'utilities.js' file.
*/

// A global namespace. Arrays that decide the order the characters will be shifted in.
var arr =
{
  characterList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', '!',
  '"', '\'', '(', ')', ',', '-', '.', '/', ':', ';', '?'],
  emojiList: [ "😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","😗","😙","😚","😠","🙂",
  "🤗","😇","🤔","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫","😴","😌","🤓",
  "😛","😜","😝","☹","🙁","😒","😓","😔","😕","😖","🙃","😷","🤒","🤕","🤑","😲","😞","😟",
  "😤","😢","😭","😦","😧","😨","😩","😬","😰","😱","😳","😵","😡","🌞","🌫","🌥","🌨","🌧",
  "🌦","🌩","🌪"]
}

// A global namespace. Html elements & shift number.
var g =
{
  clearTextBox:{},        // Text area that will output the cleartext version of the encrypted text.
  encryptedTextBox:{},    // Text area that takes in an encrypted message.
  encryptionKey:{},       // The encryption key.
  shiftNumber:{}          // The number in which the characters will be shifted by.
}

/**
* Gets any necessary html elements and sets them into the 'g' global namespace.
*/
function init()
{
  var dropDown = document.getElementById("encryptKey");
  for(var i = 0; i < arr.emojiList.length; i++)
  {
    var emojiOption = document.createElement('option');
    emojiOption.textContent = "Key: " + arr.emojiList[i];
    emojiOption.value = arr.emojiList[i];
    dropDown.appendChild(emojiOption);
  }


  g.encryptedTextBox = document.getElementById("inputText");
  g.clearTextBox = document.getElementById("outputText");
  g.encryptionKey = document.getElementById("encryptKey");
  g.characterShiftNote = document.getElementById("g.characterShiftNote");
  g.shiftNumber = -1;
}

/**
* Caesar cipher decryption function, but decrypts a string of emojis.
*/
function emojiDecrypt()
{
  g.clearTextBox.value = "";
  var splitText = Array.from(g.encryptedTextBox.value);

  // converting the emojis into its character equivalent (equivalent in array index)
  for(var i = 0; i < splitText.length; i++)
  {
    for(var j = 0; j < arr.emojiList.length; j++)
    {
      if(splitText[i] == arr.emojiList[j])
      {
        splitText[i] = arr.characterList[j];
        break;
      }
    }
  }

  for(var i =0; i < splitText.length;i++)
  {
    var shiftedCharacter = updateEmoji(splitText[i]);
    g.clearTextBox.value += shiftedCharacter;
  }
}

/**
*  Takes in a characters and shifts it back by a certain number of times, according to the currently selected encryption key,
*  then returns the shifted character. The returned shifted character will now be an unencrypted alphanumeric or special character
*
*  The emojiDecrypt function makes use of this function.
*
*  @param {string} anEmoji - An emoji character.
*  @return {string} anEmoji - The emoji character decrypted back into an alphanumeric character or special character.
*/
function updateEmoji(anEmoji)
{
  for(var i = 0; i < arr.emojiList.length; i++)
  {
    if(g.encryptionKey.value == arr.emojiList[i])
    {
      g.shiftNumber = i+1;
      break;
    }
  }

  for(var i = 0; i < g.shiftNumber; i++)
  {
    anEmoji = checkEmoji(anEmoji);
  }
  return anEmoji; // Returns the unencrypted form of anEmoji
}

/**
* Takes in an emoji, converts it into its character equivalent then shifts it backwards by 1 appropriately.
* Example: If 'toShift' is an 'A', this function will shift it back to an 'z',
* but if 'toShift' is a 'b' whitespace, it should be shifted back by 1 to an 'a', etc.
*
* The updateEmoji function makes use of this function.
*
* @param {string} toShift - The character that will be shifted back by 1.
* @return {string} - A character that represents the shifted 'toShift' character. A value in the characterList array.
*/
function checkEmoji(toShift)
{
  for(var i = 0; i < arr.characterList.length; i++)
  {
    if(arr.characterList[i] == 'z' && toShift == 'A')
    return arr.characterList[i];
    else if(arr.characterList[i] == 'Z' && toShift == '0')
    return arr.characterList[i];
    else if(arr.characterList[i] == '9' && toShift == ' ')
    return arr.characterList[i];
    else if(toShift == arr.characterList[0])
    return arr.characterList[arr.characterList.length-1];
  }

  for(var i = 0; i < arr.characterList.length; i++)
  {
    if(toShift == arr.characterList[i])
    {
      return arr.characterList[i-1];
      break;
    }
  }
}

// Checks to see if the current browser is modern. If not, don't bother using these emojiDecryption functions.
if(document.addEventListener)
{
  U.addEvent(document, "DOMContentLoaded", init);
  U.addEvent(document, "DOMContentLoaded", emojiDecrypt);
  U.addEvent(document, "DOMContentLoaded", updateEmoji);
  U.addEvent(document, "DOMContentLoaded", checkEmoji);

  U.addEvent(document, "DOMContentLoaded", function()
  {
    U.addEvent(g.encryptionKey, "change", emojiDecrypt);
    U.addEvent(g.encryptedTextBox, "input", emojiDecrypt);
  });
}
