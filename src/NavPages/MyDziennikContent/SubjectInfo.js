import React, { useState, useEffect } from 'react';

export default function ContentSubjectInfo({ user }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [updatedConsultations, setUpdatedConsultations] = useState('');
  const [updatedLiterature, setUpdatedLiterature] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        setUpdatedConsultations(subject.konsultacje);
        setUpdatedLiterature(subject.literatura);
    };

    const handleSubmitChanges = async () => {
        try {
            const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/updateSubjectDetails.php?token=${user.token}&subject_id=${selectedSubject.subject_id}&konsultacje=${updatedConsultations}&literatura=${updatedLiterature}`);
            if (response.ok) {
                console.log("Changes successfully saved");
            } else {
                console.error("Failed to save changes");
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
              <div>
                  <div style={{ height: '300px', overflowY: 'scroll' }}>
                      {subjects.map(subject => (
                          <div key={subject.subject_id} onClick={() => handleSubjectSelect(subject)}>
                              {subject.subject_code} - {subject.subject_name}
                          </div>
                      ))}
                  </div>
                  {selectedSubject && (
                    <div>
                      <p>{selectedSubject.subject_name}</p>
                      <p>{selectedSubject.subject_code}</p>
                      <p>{selectedSubject.ects}</p>
                      <p>{selectedSubject.wydział}</p>
                      <p>{selectedSubject.sylabus}</p>
                      <input type="text" value={updatedConsultations} onChange={e => setUpdatedConsultations(e.target.value)} />
                      <input type="text" value={updatedLiterature} onChange={e => setUpdatedLiterature(e.target.value)} />
                      <button onClick={handleSubmitChanges}>Zatwierdź zmiany</button>
                    </div>
                  )}
              </div>
          )}
      </main>
    );
}
