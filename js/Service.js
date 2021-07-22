export default class TaskService {
  getTaskServiceApi() {
    return axios({
      url: "https://60e7016815387c00173e49f3.mockapi.io/api/Task",
      method: "GET",
    });
  }
  getApiByID(id) {
    return axios({
      url: `https://60e7016815387c00173e49f3.mockapi.io/api/Task/${id}`,
      method: "GET",
    });
  }
  postTaskServiceApi(task) {
    return axios({
      url: "https://60e7016815387c00173e49f3.mockapi.io/api/Task",
      method: "POST",
      data: task,
    });
  }

  deleteTaskServiceApi(id) {
    return axios({
      url: `https://60e7016815387c00173e49f3.mockapi.io/api/Task/${id}`,
      method: "DELETE",
    });
  }
  updateTaskServiceApi(id, task) {
    return axios({
      url: `https://60e7016815387c00173e49f3.mockapi.io/api/Task/${id}`,
      method: "PUT",
      data: task,
    });
  }
}
