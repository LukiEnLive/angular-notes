document.addEventListener("DOMContentLoaded", () => {
    const notesList = document.getElementById("notes-list");
    const tagsList = document.getElementById("tags-list");
    const addTagsContainer = document.getElementById("add-note-tags");
    const editTagsContainer = document.getElementById("edit-note-tags");

    // Function to reload notes
    function reloadNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const tags = JSON.parse(localStorage.getItem("tags")) || [];
        console.log(tags)
        notesList.innerHTML = ""; // Clear the list before reloading
        notes.forEach((note, index) => {
            console.log(note)
            const tagsHtml = (note.tags || []).map(tagName => {
                const tag = tags.find(t => t.name === tagName);
                if (!tag) return "";
                const backgroundColor = tag ? tag.color : "#ccc"; // Default color if tag not found
                const textColor = tag ? getContrastingColor(tag.color) : "#000";
                return `<span class="note-tag" style="background-color: ${backgroundColor}; color: ${textColor};">${tagName}</span>`;
            }).join(" ");
            const div = document.createElement("div");
            div.classList.add("note-card");
            div.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <div class="note-tags">${tagsHtml}</div>
                <div class="note-actions">
                    <button class="edit-note" data-index="${index}">Modifier</button>
                    <button class="delete-note danger" data-index="${index}">Supprimer</button>
                </div>
            `;
            notesList.appendChild(div);
        });
    }

    // Function to reload tags
    function reloadTags() {
        const tags = JSON.parse(localStorage.getItem("tags")) || [];
        tagsList.innerHTML = ""; // Clear the list before reloading
        addTagsContainer.innerHTML = ""; // Clear add-note tags
        editTagsContainer.innerHTML = ""; // Clear edit-note tags
        tags.forEach((tag, index) => {
            const tagHtml = `
                <label>
                    <input type="checkbox" value="${tag.name}">
                    <span style="background-color: ${tag.color}; color: ${getContrastingColor(tag.color)};">${tag.name}</span>
                </label>
            `;
            tagsList.innerHTML += `
                <li>
                    <span style="background-color: ${tag.color}; color: ${getContrastingColor(tag.color)};">${tag.name}</span>
                    <button class="edit-tag" data-index="${index}">Modifier</button>
                    <button class="delete-tag danger" data-index="${index}">Supprimer</button>
                </li>
            `;
            addTagsContainer.innerHTML += tagHtml;
            editTagsContainer.innerHTML += tagHtml;
        });
    }

    // Initial load of notes and tags
    reloadNotes();
    reloadTags();

    // Handle navigation between sections
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute("data-section") + "-section";

            // Highlight the active link
            document.querySelectorAll("nav a").forEach(navLink => {
                navLink.classList.remove("active");
            });
            link.classList.add("active");

            // Show the corresponding section
            document.querySelectorAll("main > section").forEach(section => {
                section.classList.add("hidden-section");
                section.classList.remove("active-section");
            });
            document.getElementById(sectionId).classList.add("active-section");
            document.getElementById(sectionId).classList.remove("hidden-section");
        });
    });

    // Set the default active link
    document.querySelector('nav a[data-section="home"]').classList.add("active");

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

    // Handle adding a new note with tags
    document.getElementById("add-note-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("note-title").value;
        const content = document.getElementById("note-content").value;
        const selectedTags = Array.from(addTagsContainer.querySelectorAll("input:checked")).map(input => input.value);
        saveNoteToLocalStorage({ title, content, tags: selectedTags });
        document.getElementById("note-title").value = "";
        document.getElementById("note-content").value = "";
        reloadNotes();
        alert("Note ajoutée !");
        document.querySelector('[data-section="home"]').click(); // Redirect to "Accueil"
    });

    // Handle editing a note with tags
    notesList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-note")) {
            const index = e.target.getAttribute("data-index");
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            const note = notes[index];

            // Ensure the note has a tags property
            note.tags = note.tags || [];

            document.getElementById("edit-note-title").value = note.title;
            document.getElementById("edit-note-content").value = note.content;

            // Populate tags for editing
            const tags = JSON.parse(localStorage.getItem("tags")) || [];
            editTagsContainer.innerHTML = tags.map(tag => `
                <label>
                    <input type="checkbox" value="${tag.name}" ${note.tags.includes(tag.name) ? "checked" : ""}>
                    <span style="background-color: ${tag.color}; color: ${getContrastingColor(tag.color)};">${tag.name}</span>
                </label>
            `).join("");

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
                const updatedTags = Array.from(editTagsContainer.querySelectorAll("input:checked")).map(input => input.value);
                updateNoteInLocalStorage(index, { title: updatedTitle, content: updatedContent, tags: updatedTags });
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

    // Handle adding a new tag
    document.getElementById("add-tag-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("tag-name").value;
        const color = document.getElementById("tag-color").value;
        saveTagToLocalStorage({ name, color });
        document.getElementById("tag-name").value = "";
        document.getElementById("tag-color").value = "#ffffff";
        reloadTags();
        alert("Tag ajouté !");
    });

    // Handle deleting a tag
    tagsList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-tag")) {
            const tags = JSON.parse(localStorage.getItem("tags")) || [];
            const index = e.target.getAttribute("data-index");
            tags.splice(index, 1);
            localStorage.setItem("tags", JSON.stringify(tags));
            reloadTags();
        }
    });

    // Handle editing a tag
    tagsList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-tag")) {
            const index = e.target.getAttribute("data-index");
            const tags = JSON.parse(localStorage.getItem("tags")) || [];
            const tag = tags[index];

            const newName = prompt("Modifier le nom du tag:", tag.name);
            if (newName === null || newName.trim() === "") return; // Cancel or empty input

            const newColor = prompt("Modifier la couleur du tag (code hexadécimal):", tag.color);
            if (newColor === null || !/^#[0-9A-Fa-f]{6}$/.test(newColor)) return; // Cancel or invalid color

            tags[index] = { name: newName, color: newColor };
            localStorage.setItem("tags", JSON.stringify(tags));
            reloadTags();
            reloadNotes(); // Update notes to reflect tag changes
        }
    });

    // Utility function to save a tag
    function saveTagToLocalStorage(tag) {
        const tags = JSON.parse(localStorage.getItem("tags")) || [];
        tags.push(tag);
        localStorage.setItem("tags", JSON.stringify(tags));
    }

    // Utility function to get contrasting text color
    function getContrastingColor(hex) {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? "#000000" : "#ffffff";
    }
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
