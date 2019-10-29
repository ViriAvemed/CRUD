//Variables
const ListActivities = document.getElementById('list-activities');


//Event Listeners
eventListeners();

function eventListeners() {
    document.querySelector('#form').addEventListener('submit',
        addActivity);

    //Delete activities
    ListActivities.addEventListener("click", deleteActivities);

    //Loading contend
    document.addEventListener("DOMContentLoaded", localStorageOk);
}

// Functions

//Aggregate tweet del form
function addActivity(e) {
    e.preventDefault();

    //Leer value textarea
    const activity = document.getElementById('activity').value;

    //Creat the btn of delete
    const btnDelete = document.createElement("a");
    btnDelete.classList = "delete-activity";
    btnDelete.innerText = "X";

    //Creat element and aggregate the contend to list
    const  li = document.createElement('li');
    li.innerText = activity;
    // Aggregate the btn of delete to activity
    li.appendChild(btnDelete);
    //Aggregate el activity a la list
    ListActivities.appendChild(li);

    // Aggregate to Local Storage
    addActivityLocalStorage(activity);


}

//delete  activity of DOM
function deleteActivities(e) {
    e.preventDefault();
    if (e.target.className === "delete-activity"){
        e.target.parentElement.remove();
        deleteActivitiesLocalStorage(e.target.parentElement.innerText);

    }

}

//Show dates localStorage in the list
function localStorageOk() {
    let activities;
    activities = getActivitiesLocalStorage();

    activities.forEach(function (activity) {
        const btnDelete = document.createElement("a");
        btnDelete.classList = "delete-activity";
        btnDelete.innerText = "X";

        //Creat element and aggregate the contend to list
        const  li = document.createElement('li');
        li.innerText = activity;
        // Aggregate the btn of delete to activity
        li.appendChild(btnDelete);
        //Aggregate el activity a la list
        ListActivities.appendChild(li);
    })


}

//Aggregate activity to local Storage
function addActivityLocalStorage(activity) {
    let activities;
    activities = getActivitiesLocalStorage();

    //Aggregate new tweet
    activities.push(activity);

    //Convert string to array
    localStorage.setItem("activities", JSON.stringify(activities));

}

//Element local Storage
function getActivitiesLocalStorage() {
    let activities;

    //Revisers values of local storage
    if(localStorage.getItem("activities") === null) {
        activities = [];
    } else {
        activities = JSON.parse(localStorage.getItem("activities"));
    }
    return activities;

}

//Delete tweet of local storage

function deleteActivitiesLocalStorage(activity) {
    let activities, activityDelete;
    //Delete X of activity
    activityDelete = activity.substring(0, activity.length -1);
    activities = getActivitiesLocalStorage();

    activities.forEach(function (activity, index) {
        if (activityDelete === activity){
            activities.splice(index, 1);
        }
    });
    localStorage.setItem("activities", JSON.stringify(activities));


}


