//your JS code here. If required.

const form = document.querySelector("form");
const fontsizeInput = document.getElementById("fontsize");
const fontcolorInput = document.getElementById("fontcolor");

// Read a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [key, ...value] = cookie.split("=");

    if (key === name) {
      return decodeURIComponent(value.join("="));
    }
  }

  return null;
}

// Apply saved preferences
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize !== null) {
    document.documentElement.style.setProperty(
      "--fontsize",
      `${savedFontSize}px`
    );
    fontsizeInput.value = savedFontSize;
  }

  if (savedFontColor !== null) {
    document.documentElement.style.setProperty(
      "--fontcolor",
      savedFontColor
    );
    fontcolorInput.value = savedFontColor;
  }
}

// Save preferences in cookies
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fontSize = Number(fontsizeInput.value);
  const fontColor = fontcolorInput.value;

  if (
    !Number.isInteger(fontSize) ||
    fontSize < 8 ||
    fontSize > 72
  ) {
    fontsizeInput.reportValidity();
    return;
  }

  document.cookie =
    `fontsize=${fontSize}; max-age=31536000; path=/`;

  document.cookie =
    `fontcolor=${encodeURIComponent(fontColor)}; max-age=31536000; path=/`;

  applyPreferences();
});

// Apply preferences when the page loads
applyPreferences();
