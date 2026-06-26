//get userInfo
export async function getUserInfo(email) {
  if (!email) return null;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${email}`, {
      method: "GET", cache: "no-store", next: { revalidate: 0 }
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/browse-tasks`,{
      headers : {
        authorization : `Bearer ${token}`
      }
    })
    return res.json()
}

//get task by id
export const getTaskById = async (id, token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/browse-tasks/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    return res.json()
}

//get top freelancer
export async function getTopFreelancers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/top-freelancers-home`);
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching top freelancers:", error);
    return [];
  }
}

//freelancer
//get freelancer profile info
export const fetchProfileData = async (email, token) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${email}`, {
      headers: { authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error("Failed to load freelancer profile");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Fetch error inside data.js:", error);
    return {};
  }
};

//get proposal data for specific freelancer
export const fetchMyProposals = async ({freelancerEmail, token}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/${freelancerEmail}`, {
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

//get proposal data for specific client
export const fetchClientProposals = async ({ clientEmail, token }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/${clientEmail}`, {
      headers: { authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error("Failed to load client proposals");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error inside data.js (Client):", error);
    return [];
  }
};

//get completed task from proposalCollection
export const fetchMyEarnings = async ({email, token}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/earnings/${email}`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tasks/${email}`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client-proposals/${email}`, {
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
}

//get paid task info from payment collection
export const fetchMyPayments = async ({email, token}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payments/${email}`, {
      headers: { authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("Failed to load payment records");
    }

    const data = await res.json();
    return data.data; // ব্যাকএন্ড থেকে আসা পেমেন্ট অ্যারে সরাসরি রিটার্ন করবে
  } catch (error) {
    console.error("Fetch error inside data.js (fetchMyPayments):", error);
    return []; // কোনো এরর হলে খালি অ্যারে রিটার্ন করবে যাতে ম্যাপ করার সময় ক্র্যাশ না করে
  }
};

//admin
// get all  user data
// export const getAllUsers = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/all-users`, { cache: "no-store" });
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/payments`, {
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
//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/all-proposals`, { cache: "no-store" });
//     const data = await res.json();
//     return data.success ? data.proposals : [];
//   } catch (error) {
//     console.error("Error fetching all proposals:", error);
//     return [];
//   }
// };

//finishing
//grt all freelancer with proposals
export async function getAllData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/allData`, {
      next:{revalidate: 20} 
    });
    
    const result = await res.json();
    
    if (result.success) {
      return {
        users: result.users || [],
        proposals: result.proposals || [],
        tasks: result.tasks || [],
      };
    }

    return { users: [], proposals: [], tasks: [] };
  } catch (error) {
    console.error("Error in getFreelancerPageData:", error);
    return { users: [], proposals: [] };
  }
}