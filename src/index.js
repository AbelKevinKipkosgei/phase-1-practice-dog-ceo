console.log("%c HI", "color: firebrick");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");

  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  let breeds = [];

  fetch(imgUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      const images = data.message;
      const imageContainer = document.getElementById("dog-image-container");
      images.forEach((imageUrl) => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imageContainer.appendChild(imgElement);
      });
    })
    .catch((error) => console.log("Error fetching images: ", error));

  fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      breeds = Object.keys(data.message);
      renderBreeds(breeds);
    })
    .catch((error) => console.log("Error fetching breeds: ", error));

  function renderBreeds(breeds) {
    const dogContainer = document.getElementById("dog-breeds");
    dogContainer.innerHTML = ""; // Clear the list before rendering
    breeds.forEach((breed) => {
      const dogLi = document.createElement("li");
      dogLi.textContent = breed;
      dogLi.addEventListener("click", () => {
        dogLi.style.color = "blue"; // Change this to any color you like
      });
      dogContainer.appendChild(dogLi);
    });
  }

  // Filter breeds based on dropdown selection
  const breedDropdown = document.getElementById("breed-dropdown");
  breedDropdown.addEventListener("change", (event) => {
    const selectedLetter = event.target.value;
    const filteredBreeds =
      selectedLetter === "all"
        ? breeds
        : breeds.filter((breed) => breed.startsWith(selectedLetter));
    renderBreeds(filteredBreeds);
  });
});
