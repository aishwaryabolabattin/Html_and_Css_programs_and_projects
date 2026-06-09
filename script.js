let students =
JSON.parse(localStorage.getItem("students")) || [];

renderTable();

function addStudent(){

    let name =
    document.getElementById("name").value.trim();

    let roll =
    document.getElementById("roll").value.trim();

    if(name === "" || roll === ""){
        showToast("Please fill all fields");
        return;
    }

    students.push({
        name:name,
        roll:roll,
        status:"Absent"
    });

    saveData();
    renderTable();

    document.getElementById("name").value="";
    document.getElementById("roll").value="";

    showToast("Student Added Successfully");
}

function toggleAttendance(index){

    students[index].status =
    students[index].status === "Present"
    ? "Absent"
    : "Present";

    saveData();
    renderTable();

    showToast("Attendance Updated");
}

function deleteStudent(index){

    students.splice(index,1);

    saveData();
    renderTable();

    showToast("Student Deleted");
}

function saveData(){

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

function renderTable(){

    let table =
    document.getElementById("studentTable");

    table.innerHTML="";

    let present=0;
    let absent=0;

    students.forEach((student,index)=>{

        if(student.status==="Present")
            present++;
        else
            absent++;

        table.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td class="${
                student.status==="Present"
                ? "present"
                : "absent"
            }">
                ${student.status}
            </td>
            <td>
                <button
                class="toggle-btn"
                onclick="toggleAttendance(${index})">
                Toggle
                </button>

                <button
                class="delete-btn"
                onclick="deleteStudent(${index})">
                Delete
                </button>
            </td>
        </tr>`;
    });

    let total = students.length;

    let percentage =
    total === 0 ? 0 :
    ((present/total)*100).toFixed(1);

    document.getElementById("total").innerText = total;
    document.getElementById("presentCount").innerText = present;
    document.getElementById("absentCount").innerText = absent;
    document.getElementById("percentage").innerText =
    percentage + "%";

    document.getElementById("progressBar").style.width =
    percentage + "%";
}

function searchStudent(){

    let input =
    document.getElementById("search")
    .value.toLowerCase();

    let rows =
    document.querySelectorAll("#studentTable tr");

    rows.forEach(row=>{

        let text =
        row.textContent.toLowerCase();

        row.style.display =
        text.includes(input)
        ? ""
        : "none";
    });
}

function showToast(message){

    let toast =
    document.getElementById("toast");

    toast.innerText = message;
    toast.style.display = "block";

    setTimeout(()=>{
        toast.style.display = "none";
    },2000);
}