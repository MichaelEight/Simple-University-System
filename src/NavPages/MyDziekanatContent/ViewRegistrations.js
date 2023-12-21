import React, { useState, useEffect } from 'react';
import './ViewRegistrations.css'

export default function ContentViewRegistrations() {
    const [waitingStudents, setWaitingStudents] = useState([]);

    useEffect(() => {
        fetch('https://simpleuniversitysystem.000webhostapp.com/api/getPendingStudents.php')
            .then(response => response.json())
            .then(data => setWaitingStudents(data.map(student => ({ ...student, updatedStatus: null }))))
            .catch(error => console.error('Error fetching students:', error));
    }, []);

    const handleStatusChange = (studentId, newStatus) => {
        fetch(`https://simpleuniversitysystem.000webhostapp.com/api/updateStudentStatus.php?studentId=${studentId}&status=${newStatus}`)
            .then(response => {
                if (response.ok) {
                    setWaitingStudents(waitingStudents.map(student => 
                        student.id === studentId ? { ...student, updatedStatus: newStatus } : student
                    ));
                } else {
                    console.error('Failed to update student status');
                }
            })
            .catch(error => console.error('Error updating status:', error));
    };

    return (
        <main>
            <div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Data Urodzenia</th>
                            <th>Kierunek</th>
                            <th>Stopień</th>
                            <th>Tryb</th>
                            <th>Działanie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waitingStudents.map(student => (
                            <tr key={student.id}>
                                <td style={{ maxWidth: '50px' }}>{student.id}</td>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.date_of_birth}</td>
                                <td>{student.major}</td>
                                <td>{student.degree}</td>
                                <td>{student.study_mode}</td>
                                <td style={{ maxWidth: '500px' }}>
                                    {student.updatedStatus === null ? (
                                        <>
                                            <button onClick={() => handleStatusChange(student.id, 'aktywny')}>Akceptuj</button>
                                            <button onClick={() => handleStatusChange(student.id, 'nieaktywny')}>Odrzuć</button>
                                        </>
                                    ) : student.updatedStatus === 'aktywny' ? (
                                        <span>Przyjęty</span>
                                    ) : (
                                        <span>Odrzucony</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
