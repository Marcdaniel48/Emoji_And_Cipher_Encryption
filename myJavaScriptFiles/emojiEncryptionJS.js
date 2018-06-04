/*
* Marc-Daniel Dialogo
* 1539756
*
* JavaScript file that handles emoji caesar cipher encryption for modern browsers.
* Incorporates a function from the 'utilities.js' file.
*/

// A global namespace. Patterns that represent accepted characters for encryption.
var pat =
{
  numbers: /[0-9]/,
  letters: /[a-zA-Z]/,
  special: /[\s!"'(),-./:;?]/
}

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
  clearTextBox:{},      // A text area where the user can enter cleartext message.
  cityTextBox:{},       // An input field for if the user chooses to encrypt according to the weather of a city.
  cityButton:{},        // A button the user can press to process what's entered in the city input field (cityTextBox).
  encryptedTextBox:{},  // A text area which will display an encrypted version of the cleartext text area (clearTextBox).
  encryptionKey:{},     // The encryption key.
  keyMode: {},          // Radio buttons that allow the user to encrypt according to a key the user selected or a key representing the
  // weather of a city.
  shiftNumber: -1       // The number in which the characters will be shifted by.
}

/**
* Gets any necessary html elements and sets them into the 'g' global namespace.
*/
function init()
{
  g.clearTextBox = document.getElementById("inputText");
  g.cityTextBox = document.getElementById("city");

  // If the user has previously visited the encryption html page and has entered a city name for the weather encrypt option,
  // then, using a cookie, the value of the city input field will be set to that previous city name.
  if(COOKIE.getCookie("city") != false)
  g.cityTextBox.value = COOKIE.getCookie("city");

  g.cityButton = document.getElementById("cityBtn");
  g.encryptedTextBox = document.getElementById("outputText");
  g.encryptionKey = document.getElementById("encryptKey");
  g.keyMode = document.getElementById("encryptionOption");

  // Populates the key dropdown box with emoji key options
  for(var i = 0; i < arr.emojiList.length; i++)
  {
    var emojiOption = document.createElement('option');
    emojiOption.textContent = "Key: " + arr.emojiList[i];
    emojiOption.value = arr.emojiList[i];
    g.encryptionKey.appendChild(emojiOption);
  }
}

/**
* Caesar cipher encryption function, but the keys and output (encrypted message) will be emoji.
* Encrypts the content of the input text area according to a key.
*/
function emojiEncrypt()
{
  g.encryptedTextBox.value = "";
  var splitClearText = g.clearTextBox.value.split('');

  // Characters will be encrypted/shifted one by one
  for(var i =0; i < splitClearText.length;i++)
  {
    var shiftedCharacter = updateChar(splitClearText[i]);
    g.encryptedTextBox.value += shiftedCharacter;
  }
}


/**
*  Takes in a characters and shifts it by a certain number of times, according to the currently selected encryption key,
*  then returns the shifted character.
*
*  The emojiEncrypt function makes use of this function.
*
*  @param {string} aChar - A character.
*  @return {string} aChar - The shifted character.
*/
function updateChar(aChar)
{
  // Looks at the encryption key and sets the number of shifts according to that key.
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
    aChar = checkCharacter(aChar);
  }

  // Checks to see if aChar is one of the accepted characters to encrypt, and if so,
  // return return aChar in its encrypted form.
  for(var i = 0; i < arr.characterList.length; i++)
  {
    if(aChar == arr.characterList[i])
    {
      return arr.emojiList[i];
      break;
    }
  }
  return aChar;
}

/**
* Takes in a character and shifts it by 1 appropriately.
* Example: If 'toShift' is 'z', this function will shift it to an 'A',
* but if 'toShift' is an 'a', it should be shifted by 1 to a 'b', etc.
*
* The updateChar function makes use of this function.
*
* @param {string} toShift - The character that will be shifted by 1.
* @return {string} - A character that represents the shifted 'toShift' character. A value in the characterList array.
*/
function checkCharacter(toShift)
{
  // Checks to see the param character is within the scope of characters to be encrypted. If not, ignore and return the character.
  if(!pat.letters.test(toShift) && !pat.numbers.test(toShift) && !pat.special.test(toShift))
  return toShift;

  // If toShift is a newline, then turn it into a space.
  if(/\n/.test(toShift))
  toShift = " ";

  for(var i = 0; i < arr.characterList.length; i++)
  {
    if(arr.characterList[i] == 'A' && toShift == 'z')
    return arr.characterList[i];
    else if(arr.characterList[i] == '0' && toShift == 'Z')
    return arr.characterList[i];
    else if(arr.characterList[i] == ' ' && toShift == '9')
    return arr.characterList[i];
    else if(toShift == arr.characterList[arr.characterList.length-1])
    return arr.characterList[0];
  }

  for(var i = 0; i < arr.characterList.length; i++)
  {
    if(toShift == arr.characterList[i])
    {
      return arr.characterList[i+1];
      break;
    }
  }
}


/**
* Changes the way the encryption key will be selected, according to what the user wants.
* If the user wants to encrypt according to the weather of a city of his choosing, this
* function will allow the user to do so, else the user can manually choose the encryption.
*/
function keyModeCheck()
{
  // Checks to see if the user wants to encrypt according to the weather
  if(document.getElementById("weather").checked == true)
  {
    g.cityTextBox.style.display = "inline"; // Will make an input box appear, which will allow the user to enter a city name.
    g.cityButton.style.display = "inline";  // Will make a button appear, which will allow the user to encrypt according to the city the user chose.
    g.encryptionKey.disabled = true;        // Will disable the encryption key select field (dropdown), so that the user can't change the encryption key.

    // Checks to see if the city input box is empty.
    if(g.cityTextBox.value != "")
    {
      // Sets a "city" cookie to save the name of the city the user selected.
      var expiration = new Date();
      expiration.setDate(expiration.getDate() + 7);
      COOKIE.setCookie("city", g.cityTextBox.value, expiration);

      // Creates a request using the openweathermap api & Fetches the weather of the city the user chose.
      var r = new XMLHttpRequest();
      var url = "http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(g.cityTextBox.value) +
        "&APPID=403d9a64bef070eaab01da466c821c3d";
      r.open("GET", url, true);
      r.send(null);

      U.addEvent(r, "readystatechange", stateChange);

      function stateChange()
      {
        if(r.readyState === 4 && r.status === 200)
        {
          var y = JSON.parse(r.responseText);

          // Checks to see if city entered is valid. If invalid, then set default key 🌞.
          // Sets an encryption key (emoji) according to the weather of a city.
          if(y.weather[0].main)
          {
            switch(y.weather[0].main)
            {
              case "Clear":
              g.encryptionKey.value = arr.emojiList["🌞"];
              g.encryptionKey.options.selectedIndex = arr.emojiList.indexOf("🌞");
              emojiEncrypt();
              break;
              case "Atmosphere":
              g.encryptionKey.value = arr.emojiList["🌫"];
              g.encryptionKey.options.selectedIndex = arr.emojiList.indexOf("🌫");
              emojiEncrypt();
              break;
              case "Clouds":
              g.encryptionKey.value = arr.emojiList["🌥"];
              g.encryptionKey.options.selectedIndex = arr.emojiList.indexOf("🌥");
              emojiEncrypt();
              break;
              case "Snow":
              g.encryptionKey.value = arr.emojiList["🌨"];
              g.encryptionKey.options.selectedIndex = arr.emojiList.indexOf("🌨");
              emojiEncrypt();
              break;
              case "Rain":
              g.encryptionKey.value = arr.emojiList["🌧"];
              g.encryptionKey.options.selectedIndex = arr.emojiList.indexOf("🌧");
              emojiEncrypt();
              break;
              case "Drizzle":
              g.encryptionKey.value = arr.emojiList["🌦"];
              g.encryptionKey.options.selectedIndex = arr.emojiList.indexOf("🌦");
              emojiEncrypt();
              break;
              case "Thunderstorm":
              g.encryptionKey.value = arr.emojiList["🌩"];
              g.encryptionKey.options.selectedIndex = arr.emojiList.indexOf("🌩");
              emojiEncrypt();
              break;
              case "Extreme":
              g.encryptionKey.value = arr.emojiList["🌪"];
              g.encryptionKey.options.selectedIndex = arr.emojiList.indexOf("🌪");
              emojiEncrypt();
              break;
              default:

            }
          }
          else
          {
            g.encryptionKey.value = arr.emojiList["🌞"];
            g.encryptionKey.options.selectedIndex = arr.emojiList.indexOf("🌞");
            emojiEncrypt();
          }
        }
      }
    }
  }
  // Else for when the user decides to manually choose an encryption key.
  else
  {
    g.encryptionKey.disabled = false;       // Will enable the encryption key select (dropdown).
    g.cityTextBox.style.display = "none";   // Will hide the city input field.
    g.cityButton.style.display = "none";    // Will hide the city button.
  }
}

// Checks to see if the current browser is modern. If not, don't bother using these emojiEncryption functions.
if(document.addEventListener)
{
  U.addEvent(document, "DOMContentLoaded", init);
  U.addEvent(document, "DOMContentLoaded", emojiEncrypt);
  U.addEvent(document, "DOMContentLoaded", updateChar);
  U.addEvent(document, "DOMContentLoaded", checkCharacter);
  U.addEvent(document, "DOMContentLoaded", keyModeCheck);

  U.addEvent(document, "DOMContentLoaded", function()
  {
    U.addEvent(g.encryptionKey, "change", emojiEncrypt);
    U.addEvent(g.clearTextBox, "input", emojiEncrypt);
    U.addEvent(g.keyMode, "change", keyModeCheck);
    U.addEvent(g.cityButton, "click", keyModeCheck);
  });
}
