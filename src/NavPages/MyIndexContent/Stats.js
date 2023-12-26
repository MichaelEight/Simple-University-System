import React, { useEffect, useState } from 'react';
import '../../NavPagesStyles/Stats.css';

export default function ContentStats({user}) {  
    const [position, setPosition] = useState(null);
    const [percentile, setPercentile] = useState(null);
    const [totalStudents, setTotalStudents] = useState(null);

    useEffect(() => {
        const fetchStudentRank = async () => {
            try {
                const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getPositionInRanking.php?studentId=${user.id}`);

                if (response.ok) {
                    const data = await response.json();

                    if (data.rank !== -1) {
                      setPosition(data.rank);
                      // Assuming you can get the total number of students to calculate the percentile
                      setTotalStudents(data.totalStudents);
                      setPercentile((1 - data.rank / data.totalStudents) * 100);
                  } else {
                      setPosition("Not Available");
                      setPercentile("Not Available");
                  }
                } else {
                    throw new Error('Failed to fetch the student rank');
                }
            } catch (error) {
                console.error('Error:', error);
                setPosition("Error");
                setPercentile("Error");
            }
        };

        fetchStudentRank();
    }, [user]);

    return (
        <main>
            <div className="content-stats">
                <h2>Statystyki dla {user.name} {user.lastname}</h2>
                <div className="position-percentile">
                    {position !== null ? 
                        <p>Jesteś w top {position} studentów na podstawie ocen, z {totalStudents} studentów w sumie.</p> : 
                        <p>Pozycja w rankingu niedostępna!</p>}
                    <p>Twoje oceny są lepsze niż {percentile.toFixed(2)}% innych studentów.</p>
                </div>
            </div>
        </main>
    );
  }