"use server";

//get all, filter, search
export async function getFilteredTasks({ category, search, page = 1 }) {
  try {
    let url = `http://localhost:8000/tasks?page=${page}&limit=9`; 

    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    } 
    if (search) {
      const separator = url.includes("?") ? "&" : "?";
      url += `${separator}search=${encodeURIComponent(search)}`;
    }

    const res = await fetch(url, { cache: "no-store" });
    const result = await res.json();

    return {
        tasks: result.data || [],
        count: result.total || 0
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { tasks: [], count: 0 };
  }
}

//insert create profile data
export async function handleFormSubmit(profileData, token) {
  try {
    const response = await fetch("http://localhost:8000/user", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
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
    const data = await res.json();

    if (res.ok) {
      return { success: true };
    } else {
      return { success: false, message: data.message};
    }
  } catch (error) {
    console.error("Error in action.js submitting proposal:", error);
    return { success: false, message: "Server connection failed." };
  }
};

//update profile data
export const updateProfileData = async (email, profilePayload, token) => {
  try {
    const res = await fetch(`http://localhost:8000/users/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
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

//update proposal task, task submit
export const updateProposalTask = async (proposalId, payload, token) => {
  try {
    const res = await fetch(`http://localhost:8000/proposals-update/${proposalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization : `Bearer ${token}`,
    },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) throw new Error("Failed to update");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

//insert posted data info
export const createTaskAction = async ({taskPayload, token}) => {
  try {
    const res = await fetch("http://localhost:8000/post-task", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(taskPayload),
    });
    
    const data = await res.json();

    if (res.ok) {
      return { success: true, message: data.message || "Task created!" };
    } else {
      return { success: false, message: data.message || "Failed to create task." };
    }
  } catch (error) {
    console.error("Error in action.js creating task:", error);
    return { success: false, message: "Server connection failed." };
  }
};

//update posted task data
export const updateTaskAction = async (taskId, updatedData) => {
  try {
    const res = await fetch(`http://localhost:8000/task-update/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error inside updateTaskAction:", error);
    return { success: false, message: "Network error, failed to update task" };
  }
};

//delete posted data
export const deleteTaskAction = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, message: "Failed to connect to server" };
  }
};

//update status for accept/ignore botton
export const updateProposalStatusAction = async ({proposalId, status, token}) => {
  try {
    const res = await fetch(`http://localhost:8000/proposal-status/${proposalId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
       },
      body: JSON.stringify({ status }), 
    });
    return await res.json();
  } catch (error) {
    console.error("Error inside updateProposalStatusAction:", error);
    return { success: false, message: "Network error" };
  }
};

//update status after payment
export const changeSatusAfterPayment = async (infoField) => {
  try {
    const res = await fetch("http://localhost:8000/api/payments/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoField),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error inside changeSatusAfterPayment action:", error);
    return { success: false, message: "Action execution failed" };
  }
};

//update freelancer earnings
export async function syncFreelancerEarnings({email, token, earnings }) {
  try {
    const res = await fetch("http://localhost:8000/update-earnings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email, earnings }),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error syncing earnings to backend:", error);
    return { success: false, message: "Sync failed" };
  }
}

//isBlocked status update
export async function toggleUserBlockStatus({userId, currentStatus, token}) {
  try {
    const res = await fetch(`http://localhost:8000/api/users/${userId}/block`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ isBlocked: !currentStatus }), 
    });
    
    const result = await res.json();
    return result.success;
  } catch (error) {
    console.error("Error toggling block status:", error);
    return false;
  }
} 