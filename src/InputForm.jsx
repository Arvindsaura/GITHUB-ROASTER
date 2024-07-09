import React, { useState } from 'react';





const InputForm = () => {
  const [username, setUsername] = useState('');
  const [roast, setRoast] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      fetchGitHubData(username.trim());
    }
  };

  const fetchGitHubData = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      
      if (response.ok) {
        const { public_repos, followers, following } = data;
        const prompt = `This user has ${public_repos} public repositories, ${followers} followers, and is following ${following} people. Roast this GitHub profile.`;
        await callGeminiAPI(prompt);
      } else {
        console.error('Failed to fetch GitHub data:', response.status, data);
        setRoast('Failed to fetch GitHub data.');
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setRoast('An error occurred while fetching GitHub data.');
    }
  };

  const callGeminiAPI = async (prompt) => {
    const APIBody = {
      model: "gemini-1.5-flash",
      messages: [
        { role: "system", content: "You are Marv, a chatbot that reluctantly answers questions with sarcastic responses." },
        { role: "user", content: prompt }
      ]
    };

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini:generateContent?key=AIzaSyDUCdXbfdswBxt24GLbGb7r21BBAGYXCVg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(APIBody)
      });

      const data = await response.json();
      if (response.ok) {
        const roastMessage = data.response.text;
        setRoast(roastMessage);
      } else {
        console.error('Gemini API response error:', response.status, data);
        setRoast('Failed to generate a roast.');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setRoast('An error occurred while generating a roast.');
    }
  };

  return (
    <div className="main">
      <h1>Welcome <span className="name">{username}</span> to ReopSHITory <span role="img" aria-label="fire">🔥</span></h1>
      <div className="logo">
        <i className="fa-brands fa-github"></i>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter GitHub username" 
            className="username"
          />
          <button type="submit" className="roastbtn">Roast Me <span role="img" aria-label="fire">🔥</span></button>
        </form>
      </div>
      {roast && <p>{roast}</p>}
      <p className="disclaimer">Disclaimer: Do not read roast if you get hurt easily as it will be brutally true.</p>
    </div>
  );
};

export default InputForm;
