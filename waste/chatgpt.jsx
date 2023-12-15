import React, { useState } from 'react';

const NoteApp = () => {
  const [noteGroups, setNoteGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleCreateGroup = () => {
    const newGroup = prompt('Enter a name for the notes group:');
    if (newGroup) {
      setNoteGroups(prevGroups => [...prevGroups, { groupName: newGroup, paragraphs: [] }]);
      setCurrentGroup(newGroup);
      setShowNoteInput(true);
    }
  };

  const handleSendParagraph = () => {
    if (currentParagraph.trim() !== '') {
      setNoteGroups(prevGroups =>
        prevGroups.map(group =>
          group.groupName === currentGroup
            ? { ...group, paragraphs: [...group.paragraphs, currentParagraph] }
            : group
        )
      );
      setCurrentParagraph('');
    }
  };

  const handleChangeGroup = (groupName) => {
    setCurrentGroup(groupName);
    setShowNoteInput(true);
  };

  return (
    <div>
      <h2>Note Groups</h2>
      <button onClick={handleCreateGroup}>Create Group</button>

      <div>
        <h3>Note Groups:</h3>
        <ul>
          {noteGroups.map((group, index) => (
            <li key={index}>
              <button onClick={() => handleChangeGroup(group.groupName)}>{group.groupName}</button>
            </li>
          ))}
        </ul>
      </div>

      {showNoteInput && (
        <div>
          <h3>{currentGroup}</h3>
          <textarea
            rows="4"
            cols="50"
            value={currentParagraph}
            onChange={(e) => setCurrentParagraph(e.target.value)}
          />
          <br />
          <button onClick={handleSendParagraph}>Send</button>
        </div>
      )}

      <div>
        <h3>Paragraphs:</h3>
        {noteGroups.map(
          (group) =>
            group.groupName === currentGroup &&
            group.paragraphs.map((paragraph, index) => (
              <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                {paragraph}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default NoteApp;
