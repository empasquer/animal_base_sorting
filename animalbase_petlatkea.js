"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let filteredList;
let isAsc = true;

const catBtn = document.querySelector("[data-filter=cat]");
const dogBtn = document.querySelector("[data-filter=dog]");
const allBtn = document.querySelector(`[data-filter="*"]`);

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

// controller
function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons
  document.querySelectorAll("[data-action='filter']").forEach((button) => {
    button.addEventListener("click", selectFilter);
  });

  document.querySelectorAll(`[data-action="sort"]`).forEach((button) => {
    button.addEventListener("click", selectSorting);
    // button.innerHTML += "&#8595";
  });

  loadJSON();
}

// controller
async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();
  allBtn.classList.add("filter_chosen");
  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function selectFilter(elm) {
  console.log(`selectFilter`);

  allBtn.classList.remove("filter_chosen");
  catBtn.classList.remove("filter_chosen");
  dogBtn.classList.remove("filter_chosen");

  const filter = elm.target.dataset.filter;

  filterList(filter);
}

function selectSorting(elm) {
  const sort = elm.target.dataset.sort;
  const sortDir = elm.target.dataset.sortDirection;

  // toggle the direction
  if (sortDir === "asc") {
    elm.target.dataset.sortDirection = "desc";
  } else {
    elm.target.dataset.sortDirection = "asc";
  }
  console.log(sort);
  sortList(sort, sortDir);
}

function filterList(animalType) {
  filteredList = allAnimals;

  if (animalType === "cat") {
    catBtn.classList.add("filter_chosen");
    //Create a filteredlist of only cats
    filteredList = allAnimals.filter(isCat);
  } else if (animalType === "dog") {
    dogBtn.classList.add("filter_chosen");
    //Create a filteredlist of only dogs
    filteredList = allAnimals.filter(isDog);
  } else {
    allBtn.classList.add("filter_chosen");
  }
  displayList(filteredList);
}

function sortList(sort, sortDir) {
  let sortedList = filteredList;
  let direction = 1;

  if (sortDir === "desc") {
    direction = -1;
  } else {
    direction = 1;
  }

  sortedList = sortedList.sort(sortByProperty);
  console.log(isAsc);

  function sortByProperty(animalA, animalB) {
    console.log(`sort is ${sort}`);
    if (animalA[sort] < animalB[sort]) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }

  displayList(sortedList);
}

function compareNamesAscending(a, b) {
  if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  }
}

function compareNamesDescending(a, b) {
  if (a.name > b.name) {
    return -1;
  } else {
    return 1;
  }
}

function compareTypesAscending(a, b) {
  if (a.type < b.type) {
    return -1;
  } else {
    return 1;
  }
}

function compareTypesDescending(a, b) {
  if (a.type > b.type) {
    return -1;
  } else {
    return 1;
  }
}

function compareDescsAscending(a, b) {
  if (a.desc < b.desc) {
    return -1;
  } else {
    return 1;
  }
}
function compareDescsDescending(a, b) {
  if (a.desc > b.desc) {
    return -1;
  } else {
    return 1;
  }
}

function compareAgesAscending(a, b) {
  if (a.age < b.age) {
    return -1;
  } else {
    return 1;
  }
}

function compareAgesDescending(a, b) {
  if (a.age > b.age) {
    return -1;
  } else {
    return 1;
  }
}

function isCat(animal) {
  return animal.type === "cat";
}

function isDog(animal) {
  return animal.type === "dog";
}

function prepareObjects(jsonData) {
  console.log(`prepareObjects`);
  allAnimals = jsonData.map(prepAnimal);

  filterList(allAnimals);
}

function prepAnimal(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}