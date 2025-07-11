const access_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjY5MWEwNTkyQG1pdHMuYWMuaW4iLCJleHAiOjE3NTIyMTIwNzIsImlhdCI6MTc1MjIxMTE3MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI2YmQ1MDk1LTQwODktNDEzOS1hM2NlLWQ0MDVjNjBhYmEzYSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Imsga2FydGhpayIsInN1YiI6ImE1YjZlYzYxLTA2ZjktNGFlMS05NTkzLWFkNjNmZTc4YTA3YSJ9LCJlbWFpbCI6IjIyNjkxYTA1OTJAbWl0cy5hYy5pbiIsIm5hbWUiOiJrIGthcnRoaWsiLCJyb2xsTm8iOiIyMjY5MWEwNTkyIiwiYWNjZXNzQ29kZSI6ImNhVnZOSCIsImNsaWVudElEIjoiYTViNmVjNjEtMDZmOS00YWUxLTk1OTMtYWQ2M2ZlNzhhMDdhIiwiY2xpZW50U2VjcmV0IjoiaFNKd1BSQ1V6UXlSSmhBViJ9.IG1SaPHq2e2a7F8gVh-VeJQCG5o-MBEV4W9ghK1hjl8";

async function Log(stack, level, pkg, message) {
  try {
    const response = await fetch('http://localhost:3001/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Authorization': access_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Log response:', result);
    return result;
  } catch (error) {
    console.error('Logging failed:', error.message, error);
    throw error;
  }
}

export default Log;