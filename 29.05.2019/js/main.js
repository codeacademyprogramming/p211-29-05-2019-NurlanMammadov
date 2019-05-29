"use strict";

const addButton = document.getElementsByClassName("add-btn")[0];
const clearAllButton = document.getElementsByClassName("clear-all-btn")[0];
const clearSelectedButton = document.getElementsByClassName(
  "clear-selected-btn"
)[0];
const usernameInput = document.getElementById("username");
const menu = document.getElementsByClassName("menu")[0];
ToggleRemoveSelectedButton();

addButton.addEventListener("click", AddUserName);

clearAllButton.addEventListener("click", function() {
  menu.innerHTML = "";
});

usernameInput.addEventListener("keydown", function(e) {
  //check enter is clicked by user
  if (e.keyCode === 13) {
    AddUserName();
  }
});

function AddUserName() {
  //get user text from input
  const username = usernameInput.value.trim();

  //check user input is not empty and is valid username
  if (username !== "" && NumCheck(username)) {
    //hide error if it shows
    usernameInput.nextElementSibling.classList.add("d-none");

    //create an empty <li></li> tag
    const listItem = document.createElement("li");

    //add click event to listItems to select/deselect
    listItem.addEventListener("click", function() {
      this.classList.toggle("active");
      ToggleRemoveSelectedButton();
    });

    //write username inside li tag
    listItem.innerText = username;

    //add 2 bootstrap classes to li tag
    listItem.classList.add("list-group-item", "list-group-item-warning");

    //create trash icon to remove listItem
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash-alt", "float-right");
    listItem.appendChild(icon);

    icon.addEventListener("click", function() {
      listItem.remove();
    });

    //append li tag to menu (ul)
    menu.appendChild(listItem);

    //reset input
    usernameInput.value = "";
  } else {
    //error happened, show error message
    usernameInput.nextElementSibling.classList.remove("d-none");
  }
}

function ToggleRemoveSelectedButton() {
  const activeListItems = document.querySelectorAll(".menu li.active");
  if (activeListItems.length > 0) {
    clearSelectedButton.classList.remove("d-none");
  } else {
    clearSelectedButton.classList.add("d-none");
  }
}

function NumCheck(word) {
  return /^[a-zA-Z ]+$/.test(word);
}

function NumCheckOld(word) {
  //   const numbers = "0123456789";
  //   for (let i = 0; i < numbers.length; i++) {
  //     if (word.includes(numbers[i])) {
  //       return false;
  //     }
  //   }
  //   return true;
  //   for (let i = 0; i < word.length; i++) {
  //     if (numbers.includes(word[i])) {
  //       return false;
  //     }
  //   }
}

clearSelectedButton.onclick = function() {
  const activeItems = Array.from(document.querySelectorAll(".menu .active"));
  activeItems.forEach(function(item) {
    item.remove();
  });
  ToggleRemoveSelectedButton();
};
