//get userInfo
export async function getUserInfo(email) {
  if (!email) return null;
  try {
    const response = await fetch(`http://localhost:8000/user/${email}`, {
      method: "GET",
      cache: "no-store",
      next: { revalidate: 0 }  
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    return null;
  }
}

//get all tasks
export const getAllTasks = async () => {
    const res = await fetch('http://localhost:8000/browse-tasks')
    return res.json()
}

//get task by id
export const getTaskById = async (id) => {
    const res = await fetch(`http://localhost:8000/browse-tasks/${id}`)
    return res.json()
}

//get proposal data for specific freelancer
export const fetchMyProposals = async (freelancerEmail) => {
  try {
    const res = await fetch(`http://localhost:8000/proposals/${freelancerEmail}`);

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
export const fetchMyEarnings = async (email) => {
  try {
    const res = await fetch(`http://localhost:8000/earnings/${email}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to load earnings history");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

//CLIENT SECTION  
//get data of posted task - post task
export const getMyTasksAction = async (email) => {
  try {
    const res = await fetch(`http://localhost:8000/my-tasks/${email}`, {
      cache: "no-store"
    });
    const data = await res.json();
    return data.success ? data.tasks : [];
  } catch (error) {
    console.error("Error fetching my tasks:", error);
    return [];
  }
};

//get proposed data through client email - post task
export const getClientProposalsAction = async (clientEmail) => {
  try {
    const res = await fetch(`http://localhost:8000/client-proposals/${clientEmail}`, {
      cache: "no-store"
    });
    const data = await res.json();
    return data.success ? data.submissions : [];
  } catch (error) {
    console.error("Error fetching client proposals:", error);
    return [];
  }
};

//admin
// get all  user data
export const getAllUsers = async () => {
  try {
    const res = await fetch("http://localhost:8000/admin/all-users", { cache: "no-store" });
    const data = await res.json();
    return data.success ? data.users : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// get all payment data
export const getAllPayments = async () => {
  try {
    const res = await fetch("http://localhost:8000/admin/payments", { cache: "no-store" });
    const data = await res.json();
    return data.success ? data.payments : [];
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
};

// get all proposal data - in-progress
export const getAllProposalsForAdmin = async () => {
  try {
    const res = await fetch("http://localhost:8000/admin/all-proposals", { cache: "no-store" });
    const data = await res.json();
    return data.success ? data.proposals : [];
  } catch (error) {
    console.error("Error fetching all proposals:", error);
    return [];
  }
};