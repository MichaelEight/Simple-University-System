import React, { useEffect, useState } from 'react';
import '../../NavPagesStyles/Stats.css';

export default function ContentStats({user}) {  
    // Calculate the student's position and percentile
    const position = 10; // Student's rank
    const percentile = 90.00;
  
    return (
      <main>
        <div className="content-stats">
          <h2>{user.name} {user.lastname}'s Statistics</h2>
          <div className="position-percentile">
            <p>You are in the top {position} students based on grades.</p>
            <p>Your grades are better than {percentile.toFixed(2)}% of other students.</p>
          </div>
        </div>
      </main>
    );
  }