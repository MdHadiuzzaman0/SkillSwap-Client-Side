"use server";

//insert create profile data
export async function handleFormSubmit(profileData) {
  try {
    // Sending profileData straight to your Express backend user profile endpoint
    const response = await fetch("http://localhost:8000/user", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(profileData),
    });

    // Checking if the server responded with a successful status code
    if (!response.ok) {
      throw new Error("Server failed to process profile configuration data");
    }

    const result = await response.json();
    return { success: true, result };

  } catch (error) {
    // Catching network errors or manual throw messages safely
    return { success: false, error: error.message };
  }
}