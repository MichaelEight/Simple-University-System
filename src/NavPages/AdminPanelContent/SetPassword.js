import React, { useState } from 'react';

export default function ResetPasswordTab() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const [user_id, domain] = email.split('@');

        const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/createPasswordForUser.php?user_id=${user_id}&domain=${domain}&password=${password}`);
    
        if (response.ok) {
            const answer = await response.json();
            console.log(answer.message);

            // Clear input fields and set success message
            setEmail('');
            setPassword('');
            setMessage('Hasło ustawiono pomyślnie');
            
        } else {
            console.error('Failed to set password');
            setMessage('Błąd podczas ustawiania hasła');
        }
        } catch (error) {
        console.error('Error when setting password:', error);
        }
    };

    return (
        <div className="admin-panel-container">
        <h1>Set Password</h1>
        <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
            />
            </div>
            <button type="submit" className="submit-button">Submit</button>
            {message && <div className="success-message">{message}</div>}
        </form>
        </div>
    );
}