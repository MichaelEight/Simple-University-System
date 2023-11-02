import React, { useEffect, useState } from 'react';
import '../../NavPagesStyles/Stats.css';

export default function ContentStats({user}) {
    // Placeholder data for the student's stats
    const studentStats = {
      name: 'John Doe',
      grades: [85, 92, 78, 96, 89],
      totalStudents: 50, // Total number of students
    };
  
    // Calculate the student's position and percentile
    const position = 5; // Student's rank
    const percentile = ((studentStats.totalStudents - position) / studentStats.totalStudents) * 100;
  
    return (
      <main>
        <div className="content-stats">
          <h2>{studentStats.name}'s Statistics</h2>
          <div className="grade-summary">
            <p>Your grades:</p>
            <ul>
              {studentStats.grades.map((grade, index) => (
                <li key={index}>Exam {index + 1}: {grade}</li>
              ))}
            </ul>
          </div>
          <div className="position-percentile">
            <p>You are in the top {position} students based on grades.</p>
            <p>Your grades are better than {percentile.toFixed(2)}% of other students.</p>
          </div>
        </div>
      </main>
    );
  }