import Task from "./Task.js";
import TaskService from "./Service.js";
const getID = (id) => document.getElementById(id);
const service = new TaskService();
// feature Thêm Task
getID("addItem").onclick = () => {
  const _name = getID("newTask").value;
  //   khởi tạo
  const task = new Task(_name, false);
  service.postTaskServiceApi(task).then(() => {
    fetchData();
  });
};
// feature fetchData
const fetchData = () => {
  service.getTaskServiceApi().then((result) => {
    renderTask(result.data);
  });
};
fetchData();
const renderTask = (arr) => {
  let content = "";
  let contentComplete = "";
  arr.forEach((item) => {
    if (!item.status) {
      content += `
      <li>
      ${item.name}
      <div>
      <button class="btn" onclick="completeTask(${item.id})">
          <i class ="fa fa-check-circle"></i>
      </button>
      <button class="btn" onclick="xoaTask(${item.id})" >
           <i class="fa fa-trash-alt"></i>
      </button>
      </div>
      </li>
      
      `;
    } else {
      contentComplete += ` <li style="color:green" >
        ${item.name}
        <div>
        <button class="btn " style="color:green" onclick="completeTask(${item.id})">
            <i class ="fa fa-check-circle"></i>
        </button>
        <button class="btn" onclick="xoaTask(${item.id})" >
             <i class="fa fa-trash-alt"></i>
        </button>
        </div>
        </li>`;
    }
  });
  getID("todo").innerHTML = content;
  getID("completed").innerHTML = contentComplete;
};
// xóa
const xoaTask = (id) => {
  service.deleteTaskServiceApi(id).then(() => {
    fetchData();
  });
};
window.xoaTask = xoaTask;
// đánh dấu
const completeTask = async (id) => {
  const task = await service
    .getApiByID(id)
    .then((result) => new Task(result.data.name, true));

  service.updateTaskServiceApi(id, task).then(() => {
    fetchData();
    let green = document.querySelectorAll(".green");
    green.forEach((item) => {
      item.style.backgroundColor = "green";
    });
  });
};
window.completeTask = completeTask;
// filter
getID("two").onclick = async () => {
  const dataSorted = await sortAZ();
  console.log(dataSorted);
  renderTask(dataSorted);
};
getID("three").onclick = async () => {
  const dataSorted = await sortAZ();
  dataSorted.reverse();
  renderTask(dataSorted);
};
const sortAZ = () => {
  return service.getTaskServiceApi().then((result) => {
    result.data.sort((a, b) => {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      return nameA.localeCompare(nameB);
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      //   return 0;
    });
    return result.data;
  });
};
window.sortAZ = sortAZ;
