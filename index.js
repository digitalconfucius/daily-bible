function generate() {
  let text = document.getElementById('inputText').value;
  let toShow = "Hello, " + text;
  document.getElementById('outputText').innerText = toShow;
}

window.generate = generate;

console.log("hello");
