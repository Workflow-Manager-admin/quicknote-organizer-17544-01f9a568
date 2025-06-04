import React, { useState } from 'react';
import { AbsoluteFill } from 'remotion';

// Define color palette
const colors = {
  primary: '#4A90E2',
  secondary: '#F5F7FA',
  accent: '#FFD700',
  text: '#333333',
  lightText: '#FFFFFF',
};

// Define styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: colors.secondary,
    fontFamily: 'Arial, sans-serif',
  },
  searchBarContainer: {
    padding: '10px',
    backgroundColor: colors.primary,
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    flexGrow: 1,
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    marginRight: '10px',
  },
  searchButton: {
    padding: '8px 12px',
    backgroundColor: colors.accent,
    color: colors.text,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  mainContent: {
    display: 'flex',
    flexGrow: 1,
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#E8EBEE', // Slightly darker than secondary for contrast
    padding: '15px',
    overflowY: 'auto',
    borderRight: `1px solid ${colors.primary}`,
  },
  categoryList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  categoryListItem: {
    padding: '8px 0',
    cursor: 'pointer',
    borderBottom: '1px solid #DDE1E4',
  },
  activeCategory: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  notesListContainer: {
    marginTop: '15px',
  },
  noteItem: {
    padding: '10px',
    border: '1px solid #DDE1E4',
    borderRadius: '4px',
    marginBottom: '10px',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
  },
  selectedNoteItem: {
    borderColor: colors.primary,
    backgroundColor: '#F0F8FF', // Light blue tint
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  noteArea: {
    flexGrow: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  noteContent: {
    flexGrow: 1,
    border: '1px solid #DDE1E4',
    borderRadius: '4px',
    padding: '15px',
    backgroundColor: '#FFFFFF',
    whiteSpace: 'pre-wrap', // Preserve formatting
  },
  noteActions: {
    marginTop: '15px',
    display: 'flex',
    gap: '10px',
  },
  actionButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: colors.primary,
    color: colors.lightText,
  },
  deleteButton: {
    backgroundColor: '#E74C3C', // Red for delete
  },
  fab: {
    position: 'absolute',
    bottom: '30px',
    right: '30px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: colors.accent,
    color: colors.text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.secondary,
    padding: '30px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
  modalInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  modalTextarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minHeight: '100px',
    boxSizing: 'border-box',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
};

// PUBLIC_INTERFACE
/**
 * Represents a single note.
 */
interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// PUBLIC_INTERFACE
/**
 * Props for the QuickNoteOrganizer component.
 */
export interface QuickNoteOrganizerProps {
  // Currently no props, but can be extended
}

// PUBLIC_INTERFACE
/**
 * Main container for the QuickNote Organizer application.
 * Handles note creation, editing, deletion, searching, and categorization.
 */
export const QuickNoteOrganizer: React.FC<QuickNoteOrganizerProps> = () => {
  // const { fps, durationInFrames, width, height } = useVideoConfig(); // Removed unused vars

  const [notes, setNotes] = useState<Note[]>([]);
  // setCategories removed as it's not used yet, categories is initialized directly
  const [categories] = useState<string[]>(['All', 'Work', 'Personal', 'Ideas']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [newNoteContent, setNewNoteContent] = useState<string>('');
  const [newNoteCategory, setNewNoteCategory] = useState<string>(categories[0] || 'All');


  // --- Feature Placeholder Functions ---

  // PUBLIC_INTERFACE
  /**
   * Handles the creation or update of a note.
   */
  const handleSaveNote = () => {
    if (!newNoteTitle.trim()) {
      console.warn('Title cannot be empty.'); // Replaced alert with console.warn
      return;
    }
    const now = new Date();
    if (editingNote) {
      setNotes(
        notes.map((n) =>
          n.id === editingNote.id
            ? { ...n, title: newNoteTitle, content: newNoteContent, category: newNoteCategory, updatedAt: now }
            : n
        )
      );
    } else {
      const newNote: Note = {
        id: Date.now().toString(), // Simple ID generation
        title: newNoteTitle,
        content: newNoteContent,
        category: newNoteCategory,
        createdAt: now,
        updatedAt: now,
      };
      setNotes([...notes, newNote]);
    }
    closeModal();
  };

  // PUBLIC_INTERFACE
  /**
   * Opens the modal to create a new note.
   */
  const handleCreateNote = () => {
    setEditingNote(null);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteCategory(selectedCategory === 'All' && categories.length > 1 ? categories[1] : selectedCategory);
    setIsModalOpen(true);
  };

  // PUBLIC_INTERFACE
  /**
   * Opens the modal to edit an existing note.
   * @param note The note to edit.
   */
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNoteTitle(note.title);
    setNewNoteContent(note.content);
    setNewNoteCategory(note.category);
    setIsModalOpen(true);
  };

  // PUBLIC_INTERFACE
  /**
   * Deletes a note.
   * @param noteId The ID of the note to delete.
   */
  const handleDeleteNote = (noteId: string) => {
    // Removed window.confirm for now to avoid browser-specific API errors
    // In a real app, a custom modal confirmation would be better here.
    console.log(`Attempting to delete note: ${noteId}`);
    setNotes(notes.filter((n) => n.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Closes the create/edit note modal.
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  // PUBLIC_INTERFACE
  /**
   * Handles search input change.
   * @param event The input change event.
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // PUBLIC_INTERFACE
  /**
   * Filters notes based on the selected category and search term.
   */
  const filteredNotes = notes.filter((note) => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AbsoluteFill style={styles.container}>
      {/* Search Bar */}
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          placeholder="Search notes..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button style={styles.searchButton}>Search</button> {/* Placeholder, search is live */}
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2>Categories</h2>
          <ul style={styles.categoryList}>
            {categories.map((category) => (
              <li
                key={category}
                style={{
                  ...styles.categoryListItem,
                  ...(selectedCategory === category ? styles.activeCategory : {}),
                }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          {/* Ideally, a way to add new categories would be here */}

          <div style={styles.notesListContainer}>
            <h3>Notes ({filteredNotes.length})</h3>
            {filteredNotes.length === 0 && <p>No notes found.</p>}
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                style={{
                  ...styles.noteItem,
                  ...(selectedNote?.id === note.id ? styles.selectedNoteItem : {}),
                }}
                onClick={() => setSelectedNote(note)}
              >
                <div style={styles.noteTitle}>{note.title}</div>
                <div style={{fontSize: '0.8em', color: '#777'}}>
                  {note.category} - {new Date(note.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note Display Area */}
        <div style={styles.noteArea}>
          {selectedNote ? (
            <>
              <h2>{selectedNote.title}</h2>
              <p style={{fontSize: '0.9em', color: '#555'}}>
                Category: {selectedNote.category} | Last updated: {new Date(selectedNote.updatedAt).toLocaleString()}
              </p>
              <div style={styles.noteContent}>{selectedNote.content}</div>
              <div style={styles.noteActions}>
                <button style={styles.actionButton} onClick={() => handleEditNote(selectedNote)}>
                  Edit
                </button>
                <button
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  onClick={() => handleDeleteNote(selectedNote.id)}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div style={{textAlign: 'center', marginTop: '50px', color: '#777'}}>
              <p style={{fontSize: '1.2em'}}>Select a note to view its content, or create a new one.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button style={styles.fab} onClick={handleCreateNote} title="Create New Note">
        +
      </button>

      {/* Create/Edit Note Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>{editingNote ? 'Edit Note' : 'Create New Note'}</h3>
            <input
              type="text"
              placeholder="Note Title"
              style={styles.modalInput}
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
            <textarea
              placeholder="Note Content"
              style={styles.modalTextarea}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
            />
            <select
              style={styles.modalInput}
              value={newNoteCategory}
              onChange={(e) => setNewNoteCategory(e.target.value)}
            >
              {categories.filter(c => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div style={styles.modalActions}>
              <button style={{...styles.actionButton, backgroundColor: '#777'}} onClick={closeModal}>Cancel</button>
              <button style={styles.actionButton} onClick={handleSaveNote}>Save Note</button>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
