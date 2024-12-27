console.log("Lets write some javascript!");

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/Songs/songs.html");
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  let songsArray = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3") || element.href.endsWith(".m4a")) {
      let resolveURL = new URL(
        element.getAttribute("href"),
        "http://127.0.0.1:5500/Songs/"
      );
      songsArray.push(resolveURL.href);
    }
  }
  return songsArray;
}

async function main() {
  //Get all the songs
  let getSongsFunction = await getSongs();
  console.log(getSongsFunction);

  //Play the  first song
  console.log("Song URL:", getSongsFunction[0]);
  var audio = new Audio(getSongsFunction[0]);
  audio.play();
}

main();
