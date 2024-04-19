import "../css/style.css";

async function fetchNotes() {
  try {
    document.getElementById("loadingIndicator").style.display = "block";
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const responseData = await response.json();
    document.getElementById("loadingIndicator").style.display = "none";

    if (responseData.status === "success") {
      return responseData.data; // Mengambil data catatan dari respons API
    } else {
      console.error("Error fetching notes:", responseData.message);
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil note!",
      });
      return [];
    }
  } catch (error) {
    document.getElementById("loadingIndicator").style.display = "none";
    console.error("Error fetching notes:", error);
    Swal.fire({
      icon: "danger",
      title: "Gagal mengambil note!",
    });
    return [];
  }
}

async function fetchArchivedNotes() {
  try {
    document.getElementById("loadingIndicator").style.display = "block";
    const response = await fetch(
      "https://notes-api.dicoding.dev/v2/notes/archived"
    );
    const responseData = await response.json();
    document.getElementById("loadingIndicator").style.display = "none";

    if (responseData.status === "success") {
      return responseData.data; // Mengambil data catatan dari respons API
    } else {
      console.error("Error fetching notes:", responseData.message);
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil note!",
      });
      return [];
    }
  } catch (error) {
    document.getElementById("loadingIndicator").style.display = "none";
    console.error("Error fetching notes:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal mengambil note!",
    });
    return [];
  }
}

async function addNote(newNote) {
  try {
    document.getElementById("loadingIndicator").style.display = "block";
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
    const responseData = await response.json();
    document.getElementById("loadingIndicator").style.display = "none";

    if (responseData.status === "success") {
      console.log("Note added successfully:", responseData.data);
      return responseData.data;
    } else {
      console.error("Error adding note:", responseData.message);
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan note!",
      });
      return null;
    }
  } catch (error) {
    document.getElementById("loadingIndicator").style.display = "none";
    console.error("Error adding note:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal menambahkan note!",
    });
    return null;
  }
}

async function deleteNote(noteId) {
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
      {
        method: "DELETE",
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error deleting note:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal menghapus note!",
    });
    return false;
  }
}

async function archiveNote(noteId) {
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}/archive`,
      {
        method: "POST",
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error archiving note:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal meng-archive note!",
    });
    return false;
  }
}

async function unarchiveNote(noteId) {
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}/unarchive`,
      {
        method: "POST",
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error unarchiving note:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal meng-unarchive note!",
    });
    return false;
  }
}

class IniJudul extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <h1 class="iniclass mb-4" data-aos="fade-up" data-aos-duration="2000">Note App</h1>
    `;
  }
}

class IniDisplayNote extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <h3 class="mb-4 text-center" data-aos="fade-down" data-aos-duration="2000">Display Notes</h3>
    <div id="notesList" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"></div>
    `;
  }

  createNoteCard(note) {
    const card = document.createElement("div");
    card.classList.add("col");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card", "h-100");

    const cardContent = `
      <div class="card-body">
        <h5 class="card-title">${note.title}</h5>
        <p class="card-text">${note.body}</p>
        <small class="text-muted">Created at: ${new Date(
          note.createdAt
        ).toLocaleString()}</small>
        <div class="mt-3">
          <button class="btn btn-sm btn-danger me-2 delete-btn" data-id="${
            note.id
          }"><i class="bi bi-trash"></i> Delete</button>
          <button class="btn btn-sm btn-warning archive-btn" data-id="${
            note.id
          }"><i class="bi bi-pencil-square"></i> Archive</button>
        </div>
      </div>
    `;

    cardBody.innerHTML = cardContent;
    card.appendChild(cardBody);
    this.querySelector("#notesList").appendChild(card);
  }
}

class IniArchivedNote extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <h3 class="mb-4 text-center pt-5" data-aos="fade-left" data-aos-duration="2000">Archived Notes</h3>
    <div id="notesListArchived" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"></div>
    `;
  }

  createArchivedNoteCard(note) {
    const card = document.createElement("div");
    card.classList.add("col");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card", "h-100");

    const cardContent = `
      <div class="card-body">
        <h5 class="card-title">${note.title}</h5>
        <p class="card-text">${note.body}</p>
        <small class="text-muted">Created at: ${new Date(
          note.createdAt
        ).toLocaleString()}</small>
        <div class="mt-3">
          <button class="btn btn-sm btn-danger me-2 delete-btn" data-id="${
            note.id
          }"><i class="bi bi-trash"></i> Delete</button>
          <button class="btn btn-sm btn-primary unarchive-btn" data-id="${
            note.id
          }"><i class="bi bi-pencil-square"></i> Unarchive</button>
        </div>
      </div>
    `;

    cardBody.innerHTML = cardContent;
    card.appendChild(cardBody);
    this.querySelector("#notesListArchived").appendChild(card);
  }
}

customElements.define("ini-judul", IniJudul);
customElements.define("ini-display-note", IniDisplayNote);
customElements.define("ini-archived-note", IniArchivedNote);

document.addEventListener("DOMContentLoaded", async () => {
  const notesData = await fetchNotes();
  const archivedNotesData = await fetchArchivedNotes();
  const displayNote = document.querySelector("ini-display-note");
  const displayArchivedNote = document.querySelector("ini-archived-note");

  notesData.forEach((note) => displayNote.createNoteCard(note));
  archivedNotesData.forEach((note) =>
    displayArchivedNote.createArchivedNoteCard(note)
  );

  const noteForm = document.getElementById("noteForm");
  noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const noteTitle = document.getElementById("noteTitle").value;
    const noteBody = document.getElementById("noteBody").value;

    const newNote = {
      title: noteTitle,
      body: noteBody,
    };

    const addedNote = await addNote(newNote);
    if (addedNote) {
      displayNote.createNoteCard(addedNote);
      Swal.fire({
        icon: "success",
        title: "Berhasil membuat note!",
      });
    }

    noteForm.reset();
  });

  displayNote.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const noteId = e.target.getAttribute("data-id");
      const isDeleted = await deleteNote(noteId);
      if (isDeleted) {
        e.target.closest(".col").remove();
        Swal.fire({
          icon: "success",
          title: "Berhasil menghapus note!",
        });
      }
    }
    if (e.target.classList.contains("archive-btn")) {
      const noteId = e.target.getAttribute("data-id");
      const isArchived = await archiveNote(noteId);
      if (isArchived) {
        e.target.closest(".col").remove();
        const archivedNotesData = await fetchArchivedNotes();
        while (document.getElementById("notesListArchived").firstChild) {
          document
            .getElementById("notesListArchived")
            .removeChild(
              document.getElementById("notesListArchived").firstChild
            );
        }
        archivedNotesData.forEach((note) =>
          displayArchivedNote.createArchivedNoteCard(note)
        );
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan archive!",
        });
      }
    }
  });

  displayArchivedNote.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const noteId = e.target.getAttribute("data-id");
      const isDeleted = await deleteNote(noteId);
      if (isDeleted) {
        e.target.closest(".col").remove();
        Swal.fire({
          icon: "success",
          title: "Berhasil menghapus note!",
        });
      }
    }
    if (e.target.classList.contains("unarchive-btn")) {
      const noteId = e.target.getAttribute("data-id");
      const isUnarchived = await unarchiveNote(noteId);
      if (isUnarchived) {
        e.target.closest(".col").remove();
        const notesData = await fetchNotes();
        while (document.getElementById("notesList").firstChild) {
          document
            .getElementById("notesList")
            .removeChild(document.getElementById("notesList").firstChild);
        }
        notesData.forEach((note) => displayNote.createNoteCard(note));
        Swal.fire({
          icon: "success",
          title: "Berhasil mengeluarkan archive!",
        });
      }
    }
  });
});
