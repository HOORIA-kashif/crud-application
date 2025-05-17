const addBtn = document.getElementById('add-button')
const taskModal = document.getElementById('taskModal')
const saveTaskBtn = document.getElementById('saveTaskBtn')
const closeModelBtn = document.getElementById('closeModelBtn')
const taskTitle = document.getElementById('taskTitle')
const taskDesc = document.getElementById('taskDesc')
const taskList = document.getElementById('task-list')

let tasks =[]


addBtn.addEventListener('click',()=>{
    taskModal.classList.remove('hidden')
    gsap.from('.modal-content' ,{y:-100, opacity:0,duration:0.5});
     gsap.to('.modal-content', { y: 0, opacity: 1, duration: 0.5 });
})

closeModelBtn.addEventListener('click',()=>{
    gsap.to('.modal-content',{
        y:-100,
        opacity:0,
        duration:0.4,
        onComplete: ()=>{
            taskModal.classList.add('hidden')
            taskTitle.value = "";
            taskDesc.value = "";

        }
    })
})

saveTaskBtn.addEventListener('click',()=>{
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();

    if(!title){
        alert('please enter a task title!')
        return;
    }
    
  if (taskBeingEditedId) {
    // Update existing task
    const index = tasks.findIndex(t => t.id === taskBeingEditedId);
    if (index !== -1) {
      tasks[index].title = title;
      tasks[index].desc = desc;
    }
    taskBeingEditedId = null;}
    else{

    


   


const newTask = {
    id: Date.now(),
    title,
    desc,
    createdAt: new Date().toISOString()
};
tasks.push(newTask);
}
taskModal.classList.add('hidden');
taskTitle.value = "";
taskDesc.value = "";

saveTaskToStorage();
renderTasks();
});




function saveTaskToStorage  (){
     localStorage.setItem('tasks',JSON.stringify(tasks))
}

function loadTaskFromStorage(){
    const saved = localStorage.getItem('tasks');
    if(saved){
        tasks = JSON.parse(saved)
    }
}

function renderTasks (){
    taskList.innerHTML = '';
    tasks.forEach(task =>{
        const taskCard = document.createElement('div')
        taskCard.classList.add('task-card')
        taskCard.innerHTML = `
        <div class = 'card-header'>
        <h3>${task.title}</h3>
        <div>
        <button class = 'edit-btn' data-id = '${task.id}'>
              <i class="fas fa-edit"></i>
        </button>
        <button class = 'delete-btn' data-id = '${task.id}'><i class="fas fa-trash"></i></button>
        </div>
        </div>
        <p>${task.desc}</p>
        <small>Created : ${new Date(task.createdAt).toLocaleString()}</small>
        `
        
    taskList.appendChild(taskCard)
    gsap.from(taskCard,{
        opacity: 0,
        y:30,
        duration:0.4
    })

    const deleteBtn = taskCard.querySelector('.delete-btn')
    deleteBtn.addEventListener('click',()=>{
        gsap.to(taskCard,{
            opacity:0,
            y:-20,
            duration:0.3,
            onComplete:()=>{
                tasks = tasks.filter(t => t.id !==task.id);
                taskBeingEditedId = null; 

                saveTaskToStorage();
                renderTasks();
            }
        })

       
    })

    const editBtn = taskCard.querySelector('.edit-btn')
    editBtn.addEventListener('click',()=>{
        taskTitle.value = task.title;
        taskDesc.value = task.desc;
        
        taskBeingEditedId = task.id
        taskModal.classList.remove('hidden');
        gsap.from('.modal-content' ,{y:-100, opacity:0,duration:0.5});
        gsap.to('.modal-content', { y: 0, opacity: 1, duration: 0.5 });
    })
    })


}

window.addEventListener('load',()=>{
    loadTaskFromStorage();
    renderTasks();
})

let taskBeingEditedId = null;
