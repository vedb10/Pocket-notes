
import React, { useState, useEffect } from 'react';
import '../assets/styles/notes.css';
import bg from '../assets/images/main-bg.png';

export default function PocketNotes() {
  const initData = {
    noteGroups: JSON.parse(localStorage.getItem('noteGroups')) || [],
    currentGroup: localStorage.getItem('currentGroup') || '',
    currentParagraph: localStorage.getItem('currentParagraph') || '',
  };
  const [grpname, setGrpname] = useState('');
  const [circleColor, setCirlceColor] = useState('');
  const [showcreate, setShowcreate] = useState(false);
  const [noteGroups, setNoteGroups] = useState(initData.noteGroups);
  const [currentGroup, setCurrentGroup] = useState(initData.currentGroup);
  const [currentParagraph, setCurrentParagraph] = useState(initData.currentParagraph);
  const [showNoteInput, setShowNoteInput] = useState(noteGroups.length > 0 ? true : false);
  const currentDate = new Date();
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [isSidebarVisible, setSidebarVisibility] = useState(true);
  const formattedDate = `${currentDate.getDate()} - ${currentDate.toLocaleString('default', { month: 'long' })} - ${currentDate.getFullYear()}`;

  // Format time as hh:mm am/pm
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;


  useEffect(() => {
    localStorage.setItem('noteGroups', JSON.stringify(noteGroups));
    localStorage.setItem('currentGroup', currentGroup);
    localStorage.setItem('currentParagraph', currentParagraph);
  }, [noteGroups, currentGroup, currentParagraph]);


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
      const updatedGroups = [
        ...noteGroups,
        { groupName: newGroup, color: circleColor, paragraphs: [] },
      ];
  
      setNoteGroups(updatedGroups);
      setCurrentGroup(newGroup);
      setShowNoteInput(true);
      
      // Update localStorage with the new group
      localStorage.setItem('noteGroups', JSON.stringify(updatedGroups));
      localStorage.setItem('currentGroup', newGroup);

    }
  };
  
  const handleCreateGroupMobile = () => {
    setShowcreate(false);
    const newGroup = grpname;
  
    if (newGroup && circleColor) {
      const updatedGroups = [
        ...noteGroups,
        { groupName: newGroup, color: circleColor, paragraphs: [] },
      ];
  
      setNoteGroups(updatedGroups);
      setCurrentGroup(newGroup);
      setShowNoteInput(true);
      const sidebar = document.querySelector(".sidebar")
      sidebar.style.display = "none"
      // Update localStorage with the new group
      localStorage.setItem('noteGroups', JSON.stringify(updatedGroups));
      localStorage.setItem('currentGroup', newGroup);

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

  const handleChangeGroup = (groupName,index) => {
    setCurrentGroup(groupName);
    setShowNoteInput(true);
    setSelectedGroupIndex(index);
    setSidebarVisibility(false);
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  };

  const hamburger = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'block'
  };


  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <div className="create-page" style={showcreate === true ? { display: 'flex' } : { display: 'none' }}>
        <div className="create-page-content">
          <h1>Create New group</h1>
          <div className="name-input">
            <label id='grp-name'>Group Name</label>
            <input type="text" id="grp-name" placeholder="Enter group name" onChange={(e) => fetchName(e)} />
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
          <button id="create-btn" onClick={() => handleCreateGroup()}>
            Create
          </button>
          <button id="create-btn-mobile" onClick={() => handleCreateGroupMobile()}>
            Create
          </button>
        </div>
      </div>
      <div className="sidebar">
        <h1 id="sidebar-h">Pocket Notes</h1>
        <div className="notes-stack">
          <ul id="note-elements">
            {noteGroups.map((group, index) => (
              <li key={index}>
                <button id="change-grp-btn" className={selectedGroupIndex === index ? 'selected' : ''} onClick={() => handleChangeGroup(group.groupName,index)}>
                  <div className="initial-circle" style={{ backgroundColor: group.color }}>
                    {getInitials(group.groupName)}
                  </div>
                  {group.groupName}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button id="add-btn" onClick={() => setShowcreate(true)}>
          +
        </button>
      </div>
      <div className="notes-page">
        <div className="paragraphs-box">
          {noteGroups.map(
            (group) =>
              group.groupName === currentGroup &&
              group.paragraphs.map((paragraph, index) => (
                <div
                  className="paragraphs"
                  key={index}
                  style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}
                >
                  {paragraph}
                <div className="date-time">
                  <div className="date" style={{marginRight:"20px"}}>
                  {formattedDate}
                  </div>
                  <div className="icon" style={{marginRight:"20px"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <circle cx="4" cy="4" r="4" fill="#353535"/>
                    </svg>
                  </div>
                  <div className="time">
                  {formattedTime}
                  </div>
                   
                </div>
                </div>
              ))
          )}
        </div>
        {!showNoteInput && <img src={bg} alt="bg" />}
        {!showNoteInput && <h1>Pocket Notes</h1>}
        {!showNoteInput && (
          <p1 id='covertext' style={{ width: '500px', letterSpacing: '0.44px' }}>
            Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1
            mobile             phone
          </p1>
        )}
        {showNoteInput && (
          <div className="input-area">
            <div id="note-heading">
            <div className="hamburger-icon"  >
            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=> hamburger()} width="16" height="12" viewBox="0 0 16 12" fill="none">
  <path d="M6.27495 10.85C6.47495 10.65 6.57095 10.4083 6.56295 10.125C6.55495 9.84167 6.45061 9.6 6.24995 9.4L3.42495 6.575H14.5749C14.8583 6.575 15.0959 6.479 15.2879 6.287C15.4799 6.095 15.5756 5.85767 15.5749 5.575C15.5749 5.29167 15.4789 5.054 15.2869 4.862C15.0949 4.67 14.8576 4.57433 14.5749 4.575H3.42495L6.27495 1.725C6.47495 1.525 6.57495 1.28733 6.57495 1.012C6.57495 0.736666 6.47495 0.499333 6.27495 0.3C6.07495 0.0999997 5.83728 0 5.56195 0C5.28661 0 5.04928 0.0999997 4.84995 0.3L0.274948 4.875C0.174948 4.975 0.103947 5.08333 0.0619469 5.2C0.0199471 5.31667 -0.000720024 5.44167 -5.34058e-05 5.575C-5.34058e-05 5.70833 0.0209484 5.83333 0.0629482 5.95C0.104948 6.06667 0.175614 6.175 0.274948 6.275L4.87495 10.875C5.05828 11.0583 5.28728 11.15 5.56195 11.15C5.83661 11.15 6.07428 11.05 6.27495 10.85Z" fill="white"/>
</svg>
              </div>
              <div
                className="heading-circle"
                style={{ backgroundColor: noteGroups.find((group) => group.groupName === currentGroup)?.color }}
              >
                {getInitials(currentGroup)}
              </div>
              <h3>{currentGroup}</h3>
            </div>
            <div className="typing-area">
              <textarea
                placeholder="Enter your text here..........."
                rows="4"
                cols="50"
                value={currentParagraph}
                onChange={(e) => setCurrentParagraph(e.target.value)}
              />
              <br />
              <button id="send-btn" onClick={handleSendParagraph}>
                {currentParagraph.length > 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 35 29" fill="none">
                    <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" fill="#001F8B" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 35 29" fill="none">
                    <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" fill="#ABABAB" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

