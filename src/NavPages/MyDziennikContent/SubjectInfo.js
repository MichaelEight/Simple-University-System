import React, { useState, useEffect } from 'react';
import './SubjectInfo.css';

export default function ContentSubjectInfo({ user }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [updatedConsultations, setUpdatedConsultations] = useState('');
  const [updatedLiterature, setUpdatedLiterature] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const fetchSubjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getTeacherSubjects.php?token=${user.token}`);
          if (response.ok) {
              const data = await response.json();
              setSubjects(data);
              setIsLoading(false);
          } else {
              setError("Błąd podczas łączenia z bazą danych! Spróbuj ponownie za chwilę!");
              setIsLoading(false);
          }
      } catch (error) {
          setError("Błąd podczas ładowania danych");
          setIsLoading(false);
      }
  };

  useEffect(() => {
      fetchSubjects();
  }, []);

  const handleSubjectSelect = (subjectId) => {
    const selected = subjects.find(sub => sub.subject_id === subjectId);
    if (selected) {
        setSelectedSubject(selected);
        setUpdatedConsultations(selected.konsultacje);
        setUpdatedLiterature(selected.literatura);
        setMessage('');
        setMessageType('');
    }
  };


    const handleSubmitChanges = async () => {
        try {
            const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/updateSubjectDetails.php?token=${user.token}&subject_id=${selectedSubject.subject_id}&konsultacje=${updatedConsultations}&literatura=${updatedLiterature}`);
            if (response.ok) {
                console.log("Changes successfully saved");
                setMessage('Zmiany wprowadzono pomyślnie!');
                setMessageType('success');

                // Update the local data
                // Assuming 'subjects' is the state holding the list of subjects
                const updatedSubjects = subjects.map(subject => {
                    if (subject === selectedSubject) {
                        return {
                            ...subject,
                            konsultacje: updatedConsultations, // Update with the current value from the state
                            literatura: updatedLiterature   // Update with the current value from the state
                        };
                    }
                    return subject;
                });
                setSubjects(updatedSubjects);
            } else {
                console.error("Failed to save changes");
                setMessage('Wystąpił problem podczas wprowadzania zmian!');
                setMessageType('error');
            }
        } catch (error) {
            console.error("Error saving changes", error);
        }
    };

    return (
        <main>
            {isLoading ? (
                <p>Trwa ładowanie, proszę czekać...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="subject-info-container">
                        <div className="subject-list">
                        {subjects.map(subject => (
                            <div
                                key={subject.subject_id}
                                className={`subject-item ${selectedSubject && subject.subject_id === selectedSubject.subject_id ? 'selectedSubject' : ''}`}
                                onClick={() => handleSubjectSelect(subject.subject_id)}
                            >
                                {subject.subject_code} - {subject.subject_name}
                            </div>
                        ))}
                </div>
                    {selectedSubject && (
                        <div className="subject-details">
                            <h2>Szczegóły Przedmiotu</h2>
                            <p><strong>Nazwa przedmiotu:</strong> {selectedSubject.subject_name}</p>
                            <p><strong>Kod przedmiotu:</strong> {selectedSubject.subject_code}</p>
                            <p><strong>Liczba punktów ECTS:</strong> {selectedSubject.ects}</p>
                            <p><strong>Kierunek:</strong> {selectedSubject.wydział}</p>
                            <p><strong>Sylabus:</strong> {selectedSubject.sylabus}</p>
                            <div className="editable-field">
                                <label htmlFor="konsultacje">Konsultacje:</label>
                                <input
                                    type="text"
                                    id="konsultacje"
                                    value={updatedConsultations}
                                    onChange={e => setUpdatedConsultations(e.target.value)} />
                            </div>
                            <div className="editable-field">
                                <label htmlFor="literatura">Literatura:</label>
                                <input
                                    type="text"
                                    id="literatura"
                                    value={updatedLiterature}
                                    onChange={e => setUpdatedLiterature(e.target.value)} />
                            </div>
                            <div className="submit-button-container">
                                <button className="subjectinfo-button" onClick={handleSubmitChanges}>Zatwierdź zmiany</button>
                            </div>
                            {message && (
                                <div className={`message ${messageType}`}>
                                    {message}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
