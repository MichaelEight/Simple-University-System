import React, { useState } from 'react';
import './EditPlan.css';

export default function ContentEditPlan({user}) {
    // State for "Change group" panel
    const [studentId, setStudentId] = useState('');
    const [subjectIdGroup, setSubjectIdGroup] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('0');

    // State for "Edit lesson" panel
    const [subjectIdLesson, setSubjectIdLesson] = useState('');
    const [place, setPlace] = useState('');
    const [startsAt, setStartsAt] = useState('');
    const [endsAt, setEndsAt] = useState('');
    const [whichWeeks, setWhichWeeks] = useState('wszystkie');
    const [weekday, setWeekday] = useState('poniedziałek');
    const [groupNumber, setGroupNumber] = useState('0');

    const [groupChangeMessage, setGroupChangeMessage] = useState('');
    const [groupChangeMessageType, setGroupChangeMessageType] = useState('');

    const [lessonChangeMessage, setLessonChangeMessage] = useState('');
    const [lessonChangeMessageType, setLessonChangeMessageType] = useState('');

    // Validation check for 'Change group' panel
    const isGroupChangeValid = () => {
        return studentId && subjectIdGroup && selectedGroup;
    };

    // Validation check for 'Edit lesson' panel
    const isLessonEditValid = () => {
        return subjectIdLesson && place && startsAt && endsAt && whichWeeks && weekday && groupNumber;
    };

    const handleGroupChange = async () => {
        if (!isGroupChangeValid()) {
            alert('Please fill all the fields in the "Change group" panel.');
            return;
        }

        // Reset the message
        setGroupChangeMessage('');
        setGroupChangeMessageType('');
    
        try {
            const token = user.token; // Assuming 'user.token' holds the token
    
            // Construct the URL for the API call
            const url = `https://simpleuniversitysystem.000webhostapp.com/api/changeGroup.php?token=${encodeURIComponent(token)}&studentId=${studentId}&subjectId=${subjectIdGroup}&targetGroup=${selectedGroup}`;

            // Perform the API call
            const response = await fetch(url);

            if (response.ok) {
                const responseData = await response.json();
    
                // Check for success message in the response
                if (responseData.message === "Group updated successfully") {
                    setGroupChangeMessage('Zmiana pomyślna');
                    setGroupChangeMessageType('success');
                } else {
                    setGroupChangeMessage('Wystąpił błąd');
                    setGroupChangeMessageType('error');
                }
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
            setGroupChangeMessage('Wystąpił błąd');
            setGroupChangeMessageType('error');
        }
    };

    const handleLoadSubject = async () => {
        if (!subjectIdLesson) {
            alert('Please enter a Subject ID to load.');
            return;
        }

        try {
            const token = user.token; // Assuming 'user.token' holds the token
            const subjectId = subjectIdLesson; // Assuming 'subjectIdLesson' holds the subject ID to be loaded
    
            // Construct the URL for the API call
            const url = `https://simpleuniversitysystem.000webhostapp.com/api/getSubjectInfo.php?token=${encodeURIComponent(token)}&subjectId=${subjectId}$groupNumber=${groupNumber}`;
    
            // Perform the API call
            const response = await fetch(url);

            if (response.ok) {
                const subjectDetails = await response.json();

                // Update the state with the subject details
                setPlace(subjectDetails.place || '');
                setStartsAt(subjectDetails.starts_at || '');
                setEndsAt(subjectDetails.ends_at || '');
                setWhichWeeks(subjectDetails.which_weeks || 'wszystkie');
                setWeekday(subjectDetails.weekday || 'poniedziałek');
                setGroupNumber(subjectDetails.group_number || '0');

                setLessonChangeMessage('Ładowanie pomyślne');
                setLessonChangeMessageType('success');
            } else {
                setLessonChangeMessage('Wystąpił błąd podczas ładowania');
                setLessonChangeMessageType('error');
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
            setLessonChangeMessage('Wystąpił błąd podczas ładowania');
            setLessonChangeMessageType('error');
        }
    };
    

    const handleSubmitChanges = async () => {
        if (!isLessonEditValid()) {
            alert('Please fill all the fields in the "Edit lesson" panel.');
            return;
        }

        // Reset the message
        setLessonChangeMessage('');
        setLessonChangeMessageType('');
    
        try {
            const token = user.token; // Assuming 'user.token' holds the token
    
            // Construct the URL for the API call
            const url = `https://simpleuniversitysystem.000webhostapp.com/api/changeSubject.php?token=${encodeURIComponent(token)}&subjectId=${subjectIdLesson}&place=${place}&startsAt=${startsAt}&endsAt=${endsAt}&weekday=${weekday}&whichWeeks=${whichWeeks}&groupNumber=${groupNumber}`;

            // Perform the API call
            const response = await fetch(url);

            if (response.ok) {
                const responseData = await response.json();
    
                // Check for success message in the response
                if (responseData.message === "Lesson updated successfully") {
                    setLessonChangeMessage('Zmiana pomyślna');
                    setLessonChangeMessageType('success');
                } else {
                    setLessonChangeMessage('Wystąpił błąd');
                    setLessonChangeMessageType('error');
                }
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
            setLessonChangeMessage('Wystąpił błąd');
            setLessonChangeMessageType('error');
        }
    };

    return (
        <main>
            <div className='edit-plan-container'>
                <div className="panel change-group-panel">
                    <center><h3>Zmiana Grupy</h3></center>
                    <label>ID Studenta</label>
                    <input
                        type="number"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="ID Studenta"
                        min="100000"
                        max="999999"
                    />
                    <label>ID Przedmiotu</label>
                    <input
                        type="number"
                        value={subjectIdGroup}
                        onChange={(e) => setSubjectIdGroup(e.target.value)}
                        placeholder="ID Przedmiotu"
                        min="1"
                    />
                    <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                        <option value="wszyscy">Wszyscy</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <button onClick={handleGroupChange}>Zmień grupę</button>
                    {groupChangeMessage && (
                        <div style={{ color: groupChangeMessageType === 'success' ? 'green' : 'red' }}>
                            {groupChangeMessage}
                        </div>
                    )}
                </div>

                <div className="panel edit-lesson-panel">
                    <center><h3>Edycja Zajęć</h3></center>
                    <input
                        type="number"
                        value={subjectIdLesson}
                        onChange={(e) => setSubjectIdLesson(e.target.value)}
                        placeholder="Subject ID"
                    />
                    <button style={{marginBottom: '10px'}} onClick={handleLoadSubject}>Załaduj przedmiot</button>

                    <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        placeholder="Place"
                    />
                    <input
                        type="time"
                        value={startsAt}
                        onChange={(e) => setStartsAt(e.target.value)}
                    />
                    <input
                        type="time"
                        value={endsAt}
                        onChange={(e) => setEndsAt(e.target.value)}
                    />
                    <select value={whichWeeks} onChange={(e) => setWhichWeeks(e.target.value)}>
                        <option value="wszystkie">Wszystkie</option>
                        <option value="parzyste">Parzyste</option>
                        <option value="nieparzyste">Nieparzyste</option>
                    </select>
                    <select value={weekday} onChange={(e) => setWeekday(e.target.value)}>
                        <option value="poniedziałek">Poniedziałek</option>
                        <option value="wtorek">Wtorek</option>
                        <option value="środa">Środa</option>
                        <option value="czwartek">Czwartek</option>
                        <option value="piątek">Piątek</option>
                    </select>
                    <select value={groupNumber} onChange={(e) => setGroupNumber(e.target.value)}>
                        <option value="0">Wszyscy</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <button onClick={handleSubmitChanges}>Zatwierdź zmiany</button>
                    {lessonChangeMessage && (
                        <div style={{ color: lessonChangeMessageType === 'success' ? 'green' : 'red' }}>
                            {lessonChangeMessage}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
