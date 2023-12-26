import React, { useEffect, useState } from 'react';
import '../../NavPagesStyles/Stats.css';
import './Rank.css';
import axios from "axios";

export default function ContentStats({user}) {  
    const [targetStudentId, setTargetStudentId] = useState('');
    const [position, setPosition] = useState(null);
    const [percentile, setPercentile] = useState(null);
    const [totalStudents, setTotalStudents] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchStudentRank = async () => {
        setIsLoading(true);
        try {
            try{
                const res = await axios.get("https://api.ipify.org/?format=json").catch(() => ({ data: { ip: "0" } }));
                let action = "getrank";
                let jsonObject = {
                    targetStudentId: targetStudentId,
                };
                const argsParam = encodeURIComponent(JSON.stringify(jsonObject));
                const lgcall = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/log.php?ip=${res.data.ip}&action=${action}&args=${argsParam}&token=${user.token}`);
              }catch(error){
            }

            const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getPositionInRanking.php?studentId=${targetStudentId}`);

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
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="rank-content-stats-main">
            <div className="rank-input-container">
                <label>Indeks: </label>
                <input 
                    className="rank-student-id-input"
                    type="number" 
                    value={targetStudentId} 
                    onChange={(e) => setTargetStudentId(e.target.value)}
                    placeholder="Enter Student ID"
                    min='100000'
                    max='999999'
                />
                <button className="rank-submit-button" onClick={fetchStudentRank} disabled={isLoading}>Zobacz miejsce</button>

                {position !== null && (
                    <div className="rank-results-container">
                        <p className="rank-result">Miejsce: {position}</p>
                        <p className="rank-result">Percentyl: {!isNaN(percentile) ? percentile.toFixed(2) : "n/a"}%</p>
                    </div>
                )}
            </div>
        </main>
    );
  }