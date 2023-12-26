import React, { useEffect, useState } from 'react';
import './CreateProfile.css';
import axios from "axios";

export default function ContentTechForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        dateOfBirth: '',
        major: 'Informatematyka Technologiczna',
        degree: 'inżynier/licencjat',
        studyMode: 'stacjonarne',
        clubs: ''
      });
    
      const [errors, setErrors] = useState({});
    
      // Custom style for the disabled button
        const disabledButtonStyle = {
            cursor: 'not-allowed',
            opacity: 0.5
        };

      const validateField = (name, value) => {
        let error = '';
        const now = new Date();
        const thirteenYearsAgo = new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
    
        switch (name) {
          case 'firstName':
          case 'lastName':
            if (value.length < 3 || value.length > 64) {
              error = 'Nazwa musi mieć od 3 do 64 znaków';
            }
            break;
          case 'password':
            if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}/.test(value)) {
              error = 'Hasło musi zawierać co najmniej 8 znaków, w tym małą i dużą literę oraz cyfrę';
            }
            break;
          case 'dateOfBirth':
            if (new Date(value) > thirteenYearsAgo) {
              error = 'Musisz mieć co najmniej 13 lat';
            }
            break;
          default:
            break;
        }
        return error;
      };

      const isFormValid = () => {
        // Check if there are any errors
        const hasErrors = Object.values(errors).some(error => error !== '');
        // Check if required fields are filled
        const isFilled = formData.firstName && formData.lastName && formData.password && formData.dateOfBirth && formData.major && formData.degree && formData.studyMode;

        return isFilled && !hasErrors;
    };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        // Validation on change
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
      };
    
      const handleBlur = (e) => {
        const { name, value } = e.target;
    
        // Validation on blur
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
      };
    
      const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Check if a cooldown is already in progress
        const cooldown = localStorage.getItem('formCooldown');
        if (cooldown && new Date() < new Date(cooldown)) {
            setIsSubmitting(true);
            const timeLeft = new Date(cooldown) - new Date();

            setTimeout(() => {
                setIsSubmitting(false);
                localStorage.removeItem('formCooldown');
            }, timeLeft);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if we are in cooldown
        if (isSubmitting) {
            alert("Odczekaj zanim zarejestrujesz kolejne konto!");
            return;
        }

        const queryString = new URLSearchParams(formData).toString();

        setIsSubmitting(true); // Start cooldown

        try{
          const res = await axios.get("https://api.ipify.org/?format=json").catch(() => ({ data: { ip: "0" } }));
          let action = "registernewacc";
          let jsonObject = {
            formData: formData,
          };
          const argsParam = encodeURIComponent(JSON.stringify(jsonObject));
          const lgcall = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/log.php?ip=${res.data.ip}&action=${action}&args=${argsParam}`);
        }catch(error){
        }

        await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/registerStudent.php?${queryString}`)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert("Rekrutacja pomyślna! Oczekuj na zatwierdzenie konta");
                setTimeout(() => setIsSubmitting(false), 60000); // 60 seconds cooldown
            } else if (data.error) {
                alert("Rekrutacja nieudana! Coś poszło nie tak...");
                setIsSubmitting(false); // Reset cooldown in case of error
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Rekrutacja nieudana! Coś poszło nie tak...");
            setIsSubmitting(false); // Reset cooldown in case of fetch error
        });

        // Set cooldown
        const cooldownTime = new Date(new Date().getTime() + 60000); // 60 seconds from now
        localStorage.setItem('formCooldown', cooldownTime);
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            localStorage.removeItem('formCooldown');
        }, 60000); // 60 seconds cooldown
    };
      

      return (
        <main className="form-container">
          <h2>Formularz Rekrutacyjny</h2>
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                {/* First Name */}
                <tr>
                  <td><label htmlFor="firstName">Imię:</label></td>
                  <td>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required 
                      style={{ border: errors.firstName ? 'solid red 3px' : '' }} 
                    />
                    {errors.firstName && <div style={{ color: 'darkred', fontSize: '12px', marginTop: '5px' }}>{errors.firstName}</div>}
                  </td>
                </tr>
      
                {/* Last Name */}
                <tr>
                  <td><label htmlFor="lastName">Nazwisko:</label></td>
                  <td>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required 
                      style={{ border: errors.lastName ? 'solid red 3px' : '' }} 
                    />
                    {errors.lastName && <div style={{ color: 'darkred', fontSize: '12px', marginTop: '5px' }}>{errors.lastName}</div>}
                  </td>
                </tr>
      
                {/* Password */}
                <tr>
                  <td><label htmlFor="password">Hasło:</label></td>
                  <td>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required 
                      style={{ border: errors.password ? 'solid red 3px' : '' }} 
                    />
                    {errors.password && <div style={{ color: 'darkred', fontSize: '12px', marginTop: '5px' }}>{errors.password}</div>}
                  </td>
                </tr>
      
                {/* Date of Birth */}
                <tr>
                  <td><label htmlFor="dateOfBirth">Data urodzenia:</label></td>
                  <td>
                    <input 
                      type="date" 
                      id="dateOfBirth" 
                      name="dateOfBirth" 
                      value={formData.dateOfBirth} 
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required 
                      style={{ border: errors.dateOfBirth ? 'solid red 3px' : '' }} 
                    />
                    {errors.dateOfBirth && <div style={{ color: 'darkred', fontSize: '12px', marginTop: '5px' }}>{errors.dateOfBirth}</div>}
                
                  </td>
                </tr>
      
                {/* Major */}
                <tr>
                  <td><label htmlFor="major">Kierunek studiów:</label></td>
                  <td>
                    <select 
                      id="major" 
                      name="major" 
                      value={formData.major} 
                      onChange={handleChange}
                      required
                    >
                      <option value="Informatematyka Technologiczna">Informatematyka Technologiczna</option>
                      <option value="Januszowanie">Januszowanie</option>
                    </select>
                  </td>
                </tr>
      
                {/* Degree */}
                <tr>
                  <td><label htmlFor="degree">Stopień:</label></td>
                  <td>
                    <select 
                      id="degree" 
                      name="degree" 
                      value={formData.degree} 
                      onChange={handleChange}
                      required
                    >
                      <option value="inżynier/licencjat">inżynier/licencjat</option>
                      <option value="magister">magister</option>
                    </select>
                  </td>
                </tr>
      
                {/* Study Mode */}
                <tr>
                  <td><label htmlFor="studyMode">Tryb studiów:</label></td>
                  <td>
                    <select 
                      id="studyMode" 
                      name="studyMode" 
                      value={formData.studyMode} 
                      onChange={handleChange}
                      required
                    >
                      <option value="stacjonarne">stacjonarne</option>
                      <option value="niestacjonarne">niestacjonarne</option>
                    </select>
                  </td>
                </tr>
      
                {/* Clubs */}
                <tr>
                  <td><label htmlFor="clubs">Koła naukowe:</label></td>
                  <td>
                    <input 
                      type="text" 
                      id="clubs" 
                      name="clubs" 
                      value={formData.clubs} 
                      onChange={handleChange} 
                    />
                  </td>
                </tr>
      
                {/* Submit Button */}
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center' }}>
                  <button
                            type="submit"
                            disabled={!isFormValid() || isSubmitting}
                            style={!isFormValid() || isSubmitting ? disabledButtonStyle : {}}
                        >
                            Zatwierdź
                        </button>
                        {isSubmitting && (
                            <div style={{ color: 'red', fontSize: '12px', marginTop: '10px' }}>
                                Zaczekaj, zanim zarejestrujesz kolejne konto!
                            </div>
                        )}
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </main>
      );
      
}
