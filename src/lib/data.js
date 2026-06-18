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
export const getAllTasks = async () => {
    const res = await fetch('http://localhost:8000/browse-tasks')
    return res.json()
}

//get task by id
export const getTaskById = async (id) => {
    const res = await fetch(`http://localhost:8000/browse-tasks/${id}`)
    return res.json()
}