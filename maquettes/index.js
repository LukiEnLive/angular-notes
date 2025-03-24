document.addEventListener("DOMContentLoaded", () => {
    const notesList = document.getElementById("notes-list");

    // Function to reload notes
    function reloadNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notesList.innerHTML = ""; // Clear the list before reloading
        notes.forEach((note, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <a href="#" class="edit-note" data-index="${index}">${note.title}</a>
                <button class="delete-note danger" data-index="${index}">Supprimer</button>
            `;
            notesList.appendChild(li);
        });
    }

    // Initial load of notes
    reloadNotes();

    // Handle navigation between sections
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute("data-section") + "-section";
            document.querySelectorAll("main > section").forEach(section => {
                section.classList.add("hidden-section");
                section.classList.remove("active-section");
            });
            document.getElementById(sectionId).classList.add("active-section");
            document.getElementById(sectionId).classList.remove("hidden-section");
        });
    });

    // Handle note deletion
    notesList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-note")) {
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            const index = e.target.getAttribute("data-index");
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            reloadNotes(); // Reload notes after deletion
        }
    });

    // Handle adding a new note
    document.getElementById("add-note-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("note-title").value;
        const content = document.getElementById("note-content").value;
        saveNoteToLocalStorage({ title, content });
        document.getElementById("note-title").value = "";
        document.getElementById("note-content").value = "";
        reloadNotes();
        alert("Note ajoutée !");
        document.querySelector('[data-section="home"]').click(); // Redirect to "Accueil"
    });

    // Handle editing a note
    notesList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-note")) {
            const index = e.target.getAttribute("data-index");
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            const note = notes[index];
            document.getElementById("edit-note-title").value = note.title;
            document.getElementById("edit-note-content").value = note.content;

            document.querySelectorAll("main > section").forEach(section => {
                section.classList.add("hidden-section");
                section.classList.remove("active-section");
            });
            document.getElementById("edit-note-section").classList.add("active-section");
            document.getElementById("edit-note-section").classList.remove("hidden-section");

            document.getElementById("edit-note-form").onsubmit = (e) => {
                e.preventDefault();
                const updatedTitle = document.getElementById("edit-note-title").value;
                const updatedContent = document.getElementById("edit-note-content").value;
                updateNoteInLocalStorage(index, { title: updatedTitle, content: updatedContent });
                reloadNotes();
                alert("Note modifiée !");
                document.querySelector('[data-section="home"]').click();
            };
        }
    });

    // Handle clearing all notes
    document.getElementById("clear-notes").addEventListener("click", () => {
        if (confirm("Voulez-vous vraiment effacer toutes les notes ?")) {
            localStorage.removeItem("notes");
            alert("Toutes les notes ont été effacées.");
            reloadNotes();
        }
    });
});

// Utility functions
function saveNoteToLocalStorage(note) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function updateNoteInLocalStorage(index, updatedNote) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes[index] = updatedNote;
    localStorage.setItem("notes", JSON.stringify(notes));
}
