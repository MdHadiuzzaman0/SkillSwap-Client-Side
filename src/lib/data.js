//get userInfo
export async function getUserInfo(email, token) {
  if (!email) return null;
  try {
    const response = await fetch(`http://localhost:8000/user/${email}`, {
      method: "GET", cache: "no-store", next: { revalidate: 0 }, 
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    return null;
  }
}

//get all tasks
export const getAllTasks = async (token) => {
    const res = await fetch('http://localhost:8000/browse-tasks', {
        headers: {
            authorization: `Bearer ${token}`
        },
    })
    return res.json()
}

//get task by id
export const getTaskById = async (id, token) => {
    const res = await fetch(`http://localhost:8000/browse-tasks/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    return res.json()
}

//get top freelancer
export async function getTopFreelancers() {
  try {
    const res = await fetch("http://localhost:8000/top-freelancers-home", {
      next: { revalidate: 30 } 
    });
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching top freelancers:", error);
    return [];
  }
}

//freelancer
//get proposal data for specific freelancer
export const fetchMyProposals = async (freelancerEmail, token) => {
  try {
    const res = await fetch(`http://localhost:8000/proposals/${freelancerEmail}`, {
      headers: { authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error("Failed to load freelancer proposals");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error inside data.js:", error);
    return [];
  }
};

//get completed task from proposalCollection
export const fetchMyEarnings = async (email, token) => {
  try {
    const res = await fetch(`http://localhost:8000/earnings/${email}`, {
      cache: "no-store", 
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, 
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch earnings data");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in fetchMyEarnings:", error);
    return []; 
  }
};

//CLIENT SECTION  
//get data of posted task - post task
export const getMyTasksAction = async ({email, token}) => {
  try {
    const res = await fetch(`http://localhost:8000/my-tasks/${email}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    return data.success ? data.tasks : [];
  } catch (error) {
    console.error("Error fetching my tasks:", error);
    return [];
  }
};

//get proposed data through client email - post task
export const getClientProposalsAction = async ({email, token}) => {
  try {
    const res = await fetch(`http://localhost:8000/client-proposals/${email}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    return data.submissions || [];
  } catch (error) {
    console.error("Error fetching client proposals:", error);
    return [];
  }
};

//admin
// get all  user data
// export const getAllUsers = async () => {
//   try {
//     const res = await fetch("http://localhost:8000/admin/all-users", { cache: "no-store" });
//     const data = await res.json();
//     return data.success ? data.users : [];
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return [];
//   }
// };

// get all payment data
export const getAllPayments = async (token) => {
  try {
    const res = await fetch("http://localhost:8000/admin/payments", { 
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    const data = await res.json();
    return data.success ? data.payments : [];
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
};

// get all proposal data - in-progress
// export const getAllProposalsForAdmin = async () => {
//   try {
//     const res = await fetch("http://localhost:8000/admin/all-proposals", { cache: "no-store" });
//     const data = await res.json();
//     return data.success ? data.proposals : [];
//   } catch (error) {
//     console.error("Error fetching all proposals:", error);
//     return [];
//   }
// };

//finishing
//grt all freelancer with proposals
export async function getAllData(token) {
  try {
    const res = await fetch("http://localhost:8000/api/allData", {
      next:{revalidate: 20},
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    
    const result = await res.json();
    
    if (result.success) {
      return {
        users: result.users || [],
        proposals: result.proposals || [],
        tasks: result.tasks || [],
      };
    }
    
    return { users: [], proposals: [] };
  } catch (error) {
    console.error("Error in getFreelancerPageData:", error);
    return { users: [], proposals: [] };
  }
}