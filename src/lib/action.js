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

//insert proposal data
export const submitProposalAction = async (proposalPayload) => {
  try {
    const res = await fetch("http://localhost:8000/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proposalPayload),
    });

    if (res.ok) {
      return { success: true };
    } else {
      return { success: false, message: "Backend server returned an error." };
    }
  } catch (error) {
    console.error("Error in action.js submitting proposal:", error);
    return { success: false, message: "Server connection failed." };
  }
};

//update profile data
export const updateProfileData = async (email, profilePayload) => {
  try {
    const res = await fetch(`http://localhost:3000/users/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profilePayload),
    });
    
    if (!res.ok) {
      throw new Error("Failed to update profile data on the server");
    }
    
    // Return the successful response from the server
    return await res.json();
  } catch (error) {
    console.error("Error inside action.js:", error);
    return { success: false, message: error.message };
  }
};