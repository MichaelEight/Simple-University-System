import React, { useState, useEffect } from 'react';
import '../MyDziennikContent/SubjectInfo.css';
import axios from "axios";

export default function ContentSubjectInfo({ user }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [updatedConsultations, setUpdatedConsultations] = useState('');
  const [updatedLiterature, setUpdatedLiterature] = useState('');
  const [updatedSubjectName, setUpdatedSubjectName] = useState('');
  const [updatedSubjectCode, setUpdatedSubjectCode] = useState('');
  const [updatedEcts, setUpdatedEcts] = useState('');
  const [updatedSylabus, setUpdatedSylabus] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const fetchSubjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        try{
            const res = await axios.get("https://api.ipify.org/?format=json").catch(() => ({ data: { ip: "0" } }));
            let action = "getallsubjects";
            const lgcall = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/log.php?ip=${res.data.ip}&action=${action}&token=${user.token}`);
          }catch(error){
        }

        const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getAllSubjects.php?token=${user.token}`);
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
        setUpdatedSubjectName(selected.subject_name);
        setUpdatedSubjectCode(selected.subject_code);
        setUpdatedEcts(selected.ects);
        setUpdatedSylabus(selected.sylabus);
        setMessage('');
        setMessageType('');
    }
  };


    const handleSubmitChanges = async () => {
        try {
            try{
                const res = await axios.get("https://api.ipify.org/?format=json").catch(() => ({ data: { ip: "0" } }));
                let action = "subjectinfochanges";
                let jsonObject = {
                    subject_id: selectedSubject.subject_id,
                    subject_name: updatedSubjectName,
                    subject_code: updatedSubjectCode,
                    ects: updatedEcts,
                    sylabus: updatedSylabus,
                    konsultacje: updatedConsultations,
                    literatura: updatedLiterature
                };
                const argsParam = encodeURIComponent(JSON.stringify(jsonObject));
                const lgcall = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/log.php?ip=${res.data.ip}&action=${action}&args=${argsParam}&token=${user.token}`);
              }catch(error){
            }

            const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/updateSubjectDetailsDziekanat.php?token=${user.token}&subject_id=${selectedSubject.subject_id}&subject_name=${updatedSubjectName}&subject_code=${updatedSubjectCode}&ects=${updatedEcts}&sylabus=${updatedSylabus}&konsultacje=${updatedConsultations}&literatura=${updatedLiterature}`);
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
                            <div className="editable-field">
                                <label htmlFor="subject_name">Nazwa przedmiotu:</label>
                                <input type="text" id="subject_name" value={updatedSubjectName} onChange={e => setUpdatedSubjectName(e.target.value)} />
                            </div>
                            <div className="editable-field">
                                <label htmlFor="subject_code">Kod przedmiotu:</label>
                                <input type="text" id="subject_code" value={updatedSubjectCode} onChange={e => setUpdatedSubjectCode(e.target.value)} />
                            </div>
                            <div className="editable-field">
                                <label htmlFor="ects">ECTS:</label>
                                <input type="text" id="ects" value={updatedEcts} onChange={e => setUpdatedEcts(e.target.value)} />
                            </div>
                            <p><strong>Kierunek:</strong> {selectedSubject.wydział}</p>
                            <div className="editable-field">
                                <label htmlFor="sylabus">Sylabus:</label>
                                <input type="text" id="sylabus" value={updatedSylabus} onChange={e => setUpdatedSylabus(e.target.value)} />
                            </div>
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
                                <button onClick={handleSubmitChanges}>Zatwierdź zmiany</button>
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
