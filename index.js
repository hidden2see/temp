const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,-./:;<=>?@[\]^_`{|}~";

const password_output = document.getElementById("password-field");
const length = document.getElementById("length-chooser");
const length_display = document.getElementById("password-length");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const look_alikes = document.getElementById("look-alikes");
const bits_display = document.getElementById("strength-bits");

function randomChar() {
  let item = Math.floor(Math.random() * 94);
  let character = characters.charAt(item);

  return character;
}

function generateNewPassword() {
  let password_generated = " ";
  let char;
  let potential_characters;
  let length_value = length.value;
  let lowercase_value = lowercase.checked;
  let uppercase_value = uppercase.checked;
  let numbers_value = numbers.checked;
  let symbols_value = symbols.checked;
  let look_alikes_value = look_alikes.checked;

  if (
    lowercase_value == false &&
    uppercase_value == false &&
    numbers_value == false &&
    symbols_value == false
  ) {
    password_output.textContent = "Please select at least one checkbox";
    return;
  }

  for (i = 1; i <= length_value; i++) {
    char = randomChar();

    switch (true) {
      case lowercase_value == false && /[a-z]/.test(char):
        length_value++;
        break;
      case uppercase_value == false && /[A-Z]/.test(char):
        length_value++;
        break;
      case numbers_value == false && /[0-9]/.test(char):
        length_value++;
        break;
      case symbols_value == false &&
        "!#$%&()*+,-./:;<=>?@[\]^_`{|}~".includes(char):
        length_value++;
        break;
      case look_alikes_value == false && "lIO0".includes(char):
        length_value++;
        break;
      default:
        password_generated += char;
        break;
    }
  }

  potential_characters = 0;
  if (lowercase_value) potential_characters += 26 - (look_alikes_value ? 1 : 0); 
  if (uppercase_value) potential_characters += 26 - (look_alikes_value ? 2 : 0); 
  if (numbers_value) potential_characters += 10 - (look_alikes_value ? 1 : 0); 
  if (symbols_value) potential_characters += 23;
  console.log( );
  

  bits_display.textContent =
    Math.round(length_value * Math.log2(potential_characters)) + " bits of entropy";

  password_output.textContent = password_generated;
}

length.addEventListener("input", function () {
  length_display.textContent = length.value;
  generateNewPassword();
});

lowercase.addEventListener("change", generateNewPassword);
uppercase.addEventListener("change", generateNewPassword);
numbers.addEventListener("change", generateNewPassword);
symbols.addEventListener("change", generateNewPassword);
look_alikes.addEventListener("change", generateNewPassword);
