let text = document.getElementById("quotes");
let author = document.getElementById("author");
let copybtn = document.querySelector(".copybtn");

let btn = document.querySelector(".btn");
btn.addEventListener("click", (btn) => {
  let messages = fetch("https://dummyjson.com/quotes/random");
  messages
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      text.innerHTML = `" ${data.quote} "`;
      author.innerHTML = ` ~ ${data.author} `;
      console.log(data);
      copybtn.style.display = "block";
    })
    .catch((err) => {
      console.log(err);
    });
});

copybtn.addEventListener("click", () => {
  let texttocopy = `${text.innerHTML} ${author.innerHTML}`;
  navigator.clipboard
    .writeText(texttocopy)
    .then(() => {
      copybtn.innerHTML = "copied";
    })
    .catch((error) => {
      console.log(error);
    });
  setTimeout(() => {
    copybtn.innerHTML = "copy";
  }, 1000);
});