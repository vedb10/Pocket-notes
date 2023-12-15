import React, { useState, useEffect } from 'react';
import '../assets/styles/notes.css';
import bg from '../assets/images/main-bg.png';

export default function PocketNotes() {
  const [grpname, setGrpname] = useState('');
  const [circleColor, setCirlceColor] = useState('');
  const [showcreate, setShowcreate] = useState(false);
  const [noteGroups, setNoteGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  useEffect(() => {
    const storedNoteGroups = localStorage.getItem('noteGroups');
    console.log('Retrieved from localStorage:', storedNoteGroups);
  
    if (storedNoteGroups) {
      const parsedGroups = JSON.parse(storedNoteGroups);
      console.log('Parsed groups:', parsedGroups);
      setNoteGroups(parsedGroups);
    } else {
      // If 'noteGroups' is not present or is null, set an empty array as the default
      setNoteGroups([]);
    }
  }, []);
  useEffect(() => {
    const storedNoteGroups = localStorage.getItem('noteGroups');
    console.log('Retrieved from localStorage:', storedNoteGroups);

    if (storedNoteGroups) {
      setNoteGroups(JSON.parse(storedNoteGroups));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('noteGroups', JSON.stringify(noteGroups));
    console.log('Stored in localStorage:', JSON.stringify(noteGroups));
  }, [noteGroups]);

  const getInitials = (name) => {
    const words = name.split(' ');
    return words.map((word) => word[0].toUpperCase()).join('');
  };

  const fetchName = (e) => {
    setGrpname(e.target.value);
  };

  const handleCreateGroup = () => {
    setShowcreate(false);
    const newGroup = grpname;
  
    if (newGroup && circleColor) {
      setNoteGroups((prevGroups) => [
        ...prevGroups,
        { groupName: newGroup, color: circleColor, paragraphs: [] },
      ]);
      setCurrentGroup(newGroup);
      setShowNoteInput(true);
    }
  };
  
  const handleSendParagraph = () => {
    if (currentParagraph.trim() !== '') {
      setNoteGroups((prevGroups) =>
        prevGroups.map((group) =>
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
    <div style={{display:"flex",position:"relative"}}>
      <div className="create-page"style={showcreate === true ? {display:"flex"}: {display:"none"}}>
        <div className="create-page-content">
          <h1>Create New group</h1>
          <div className="name-input">
          <label >Group Name</label>
          <input type='text' id='grp-name' placeholder='Enter group name' onChange={(e)=>fetchName(e)}/>
          </div>
          <div className="color-picker">
          Choose colour 
          <div className="color-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" onClick={()=>setCirlceColor("#B38BFA")} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#B38BFA"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" onClick={()=>setCirlceColor("#FF79F2")}  viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#FF79F2"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" onClick={()=>setCirlceColor("#43E6FC")} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#43E6FC"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" onClick={()=>setCirlceColor("#F19576")} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#F19576"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" onClick={()=>setCirlceColor("#0047FF")} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#0047FF"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" onClick={()=>setCirlceColor("#6691FF")} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#6691FF"/></svg>
          </div>
          </div>
          <button id='create-btn' onClick={()=>handleCreateGroup()}>Create</button>
        </div>
      </div>
    <div className='sidebar'>
    <h1 id='sidebar-h'>Pocket Notes</h1>
    <div className="notes-stack">
    <ul id='note-elements' >
      {noteGroups.map((group, index) => (
          <li key={index}>
          <button id="change-grp-btn" onClick={() => handleChangeGroup(group.groupName)}>
            <div className="initial-circle"style={{ backgroundColor: group.color }}>
              {getInitials(group.groupName)}
            </div>
            {group.groupName}
          </button>
        </li>
      ))}
    </ul>
    </div>
    <button id='add-btn' onClick={()=>setShowcreate(true)} >+</button>
    </div>
    <div className='notes-page'>
      <div className="paragraphs-box">
    {noteGroups.map(
          (group) =>
            group.groupName === currentGroup &&
            group.paragraphs.map((paragraph, index) => (
              <div className='paragraphs' key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                {paragraph}
              </div>
            ))
        )}</div>
       {!showNoteInput && <img src={bg} alt='bg'/>}
       {!showNoteInput &&  <h1>Pocket Notes</h1>}
       {!showNoteInput &&  <p1 style={{width:"500px",letterSpacing:"0.44px"}}>Send and receive messages without keeping your phone online.
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p1>}
        {showNoteInput && (
          <div className='input-area'>
            
          <div id='note-heading'>
          <div className="heading-circle" style={{ backgroundColor: noteGroups.find(group => group.groupName === currentGroup)?.color }}>
  {getInitials(currentGroup)}
</div><h3>
{currentGroup}</h3></div>
          <div className='typing-area'>
          <textarea
          placeholder='Enter your text here...........'
            rows="4"
            cols="50"
            value={currentParagraph}
            onChange={(e) => setCurrentParagraph(e.target.value)}
          />
          <br />
          <button id='send-btn' onClick={handleSendParagraph}>{currentParagraph.length > 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 35 29" fill="none">
  <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" fill="#001F8B"/></svg>: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 35 29" fill="none">
  <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" fill="#ABABAB"/>
</svg>}</button>
        </div>
        </div>
      )}
    </div>
        
    </div>
  )
}
