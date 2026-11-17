const myForm = document.querySelector("#myform");

let noteShow = document.getElementById("note-show");
let search = document.getElementById("search");
let sShowing = document.getElementById("s-showing");

const notes = [];
let pinned = "pin";

myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //   GETTING DATA TO ARRAY
  const formData = new FormData(event.target);
  const newNote = Object.fromEntries(formData.entries());

  notes.push(newNote);
  console.log(notes);

  event.target.reset();

  //   CREATING NEW TEMPLATE
  const template = document.querySelector("#template");
  const clone = template.content.cloneNode(true);
  clone.querySelector(".n-title").textContent = notes.at(-1).title;
  clone.querySelector(".n-description").textContent = notes.at(-1).description;
  clone.querySelector(".n-tag").textContent = notes.at(-1).tag;
  // DELETE
  clone.querySelector(".n-control .n-delete").addEventListener("click", (e) => {
    const parent = e.target.closest(".n-container");

    const item = notes.indexOf(newNote);

    notes.splice(item, 1);
    parent.remove();
    console.log(notes);
  });

  //   PIN
  clone.querySelector(".n-control .n-pin").addEventListener("click", (e) => {
    const parent = e.target.closest(".n-container");
    e.target.textContent = "unpin";

    noteShow.prepend(parent);
  });

  noteShow.prepend(clone);
});

// SEARCH SHOW
function showNotes(items) {
  items.forEach((note) => {
    const sClone = template.content.cloneNode(true);
    sClone.querySelector(".n-title").textContent = note.title;
    sClone.querySelector(".n-description").textContent = note.description;
    sClone.querySelector(".n-tag").textContent = note.tag;
    sShowing.append(sClone);
  });
}

// SEARCH
search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();

  const matches = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query) ||
      note.description.toLowerCase().includes(query) ||
      note.tag.toLowerCase().includes(query),
  );

  showNotes(matches);
});
