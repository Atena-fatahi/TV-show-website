const episodesList = document.querySelector(".episode-list");
const searchBar = document.querySelector("#search-input");
const selectElement = document.querySelector("#select-episode");
const searchIcon = document.querySelector(".search-icon");

let episodes = [];

//getting data from API
const getEpisodes = async () => {
  try {
    episodes = await fetch("https://api.tvmaze.com/shows/179/episodes").then(
      (data) => data.json()
    );

    displayEpisodes(episodes);
    console.log(episodes);
  } catch (err) {
    console.log(err);
  }
};
getEpisodes();

//displaying episodes on the page
const displayEpisodes = (episode) => {
  episode.map((item) => {
    //Create list items
    const li = document.createElement("li");
    li.classList.add("list-items");
    li.id = item.id;

    //Create image element
    const img = document.createElement("img");
    img.src = item.image.medium;

    //create title & episode
    const title = document.createElement("p");
    if (item.number <= 9) {
      title.innerText = `${item.name} - S0${item.season}E0${item.number}`;
    } else {
      title.innerText = `${item.name} - S0${item.season}E${item.number}`;
    }

    //create icons elements
    const watchIcon = document.createElement("i");
    const timeIcon = document.createElement("i");
    watchIcon.classList.add("fa-solid", "fa-circle-play");
    timeIcon.classList.add("fa-solid", "fa-clock");

    //create icon link element
    const span = document.createElement("span");
    const watchLink = document.createElement("a");
    watchLink.href = item.url;
    watchLink.innerText = `Wanna Watch?`;
    watchLink.classList.add("watch-link");
    console.log(watchLink);
    span.addEventListener("mouseover", () => {
      watchLink.classList.remove("watch-link");
    });
    span.addEventListener("mouseleave", () => {
      watchLink.classList.add("watch-link");
    });

    //create watch time span element
    const watchTime = document.createElement("span");
    watchTime.innerText = `airtime:${item.airtime}`;

    //create option elements
    const optionElement = document.createElement("option");
    if (item.number <= 9) {
      optionElement.innerText = `S0${item.season}E0${item.number} - ${item.name}`;
    } else {
      optionElement.innerText = `S0${item.season}E${item.number} - ${item.name}`;
    }
    optionElement.value = item.id;

    //append
    li.append(img, title, span, timeIcon, watchTime);
    span.append(watchIcon, watchLink);
    episodesList.append(li);
    selectElement.append(optionElement);

    //select eventlistener
    selectElement.addEventListener("change", (e) => {
      const allEpisodes = document.getElementsByClassName("list-items");
      console.log(allEpisodes);
      for (let ep of allEpisodes) {
        if (ep.id === selectElement.value) {
          ep.classList.remove("is-hidden");
        } else if (selectElement.value === "all") {
          ep.classList.remove("is-hidden");
        } else {
          ep.classList.add("is-hidden");
        }
      }
    });
  });
};

// Live Search
searchBar.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const allEpisodes = document.getElementsByClassName("list-items");
  for (let i = 0; i < allEpisodes.length; i++) {
    if (allEpisodes[i].innerText.toLowerCase().includes(searchValue)) {
      allEpisodes[i].classList.remove("is-hidden");
    } else {
      allEpisodes[i].classList.add("is-hidden");
    }
  }
});

//Search Box Style

searchBar.addEventListener("click", () => {
  searchBar.style.borderColor = "transparent";
  searchBar.style.borderRadius = "0";
  searchBar.style.borderBottomStyle = "solid";
  searchBar.style.borderBottomColor = "rgb(104, 104, 104)";
});
