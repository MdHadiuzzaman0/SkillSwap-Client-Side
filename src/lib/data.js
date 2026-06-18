//get userInfo
export async function getUserInfo(email) {
  if (!email) return null;

  try {
    const response = await fetch(`http://localhost:8000/user/${email}`, {
      method: "GET",
      cache: "no-store", 
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    return null;
  }
}

//get all tasks
export const getTaskInfo = async (email) => {
  try {
    const res = await fetch(`http://localhost:3000/explore-tasks/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};