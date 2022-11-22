import suggestions from "./mockData";
import "./styles.css";
const suggestionsBox = document.getElementById("suggestion-box");
const searchBox = document.getElementById("search-box");
const returnsuggestedvalues = (str) => {
  if (!str.trim()) {
    return [];
  }
  const filteredItems = suggestions.filter((item) =>
    item.value.toLowerCase().includes(str.trim().toLowerCase())
  );
  console.log(filteredItems);
  return filteredItems;
};

const suggestionsPromise = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const items = returnsuggestedvalues(data);
      resolve(items);
    }, 1000);
  });
};

const searchHandler = async (e) => {
  const val = await suggestionsPromise(e.target.value);
  suggestionsBox.innerHTML = "";
  appnedItemsinsuggestionbox(val);
};

const debounceWrapper = (fn, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

searchBox.addEventListener("input", debounceWrapper(searchHandler));

const appnedItemsinsuggestionbox = (items) => {
  items.forEach((item) => {
    let eachItem = document.createElement("div");
    eachItem.innerText = item.value;
    suggestionsBox.append(eachItem);
  });
};
