let dataObj = {resume: []};
let resumes = dataObj['resume'];
let currResumeIdx = 0;

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const search = document.getElementById("search");

const noSearchIn = document.getElementById("noSearchIn");
const resumeTemplate = document.getElementById("resumeTemplate");

const empName = document.getElementById("empName");
const role = document.getElementById("role");

const phone = document.getElementById("phone");
const email = document.getElementById("email");
const linkedin = document.getElementById("linkedin");
const techSkills = document.getElementById("techSkills");
const hobbies = document.getElementById("hobbies");

const preCom = document.getElementById("preCom");
const preStartDate = document.getElementById("preStartDate");
const preEndDate = document.getElementById("preEndDate");
const preSummary = document.getElementById("preSummary");
const prePos = document.getElementById("prePos");

const projects = document.getElementById("projects");

const eduUG = document.getElementById("eduUG");
const eduPU = document.getElementById("eduPU");
const eduHigh = document.getElementById("eduHigh");

const intCom = document.getElementById("intCom");
const intStartDate = document.getElementById("intStartDate");
const intEndDate = document.getElementById("intEndDate");
const intSummary = document.getElementById("intSummary");
const intPos = document.getElementById("intPos");

const achievement = document.getElementById("achievement");

function validateUser() {
    if (!window.localStorage.getItem('username') || !window.localStorage.getItem('password')) {
        window.location.href = '../index.html';
        return false;
    }
    return true;
}

function getResumes() {
    fetch("../assets/data/data.json")
        .then(response => response.json())
        .then(resData => {
            dataObj = resData;
            resumes = dataObj['resume'];
            console.log(resumes);
            fillData();
            checkButtons();
        })
        .catch(error => {
            alert(`Page Unable to load file "${error.message}". Please click on OK to Load the data from local.`);
            dataObj = data;
            resumes = dataObj['resume'];
            fillData();
            checkButtons();
            //the data variable we were talking about on line 1 is used here
        });
}

if (validateUser()) {
    getResumes();
}

function fillData() {
    const resume = resumes[currResumeIdx];

    empName.innerText = resume.basics.name;
    role.innerText = `Applied For: ${resume.basics.AppliedFor}`;

    phone.innerText = resume.basics.phone;
    email.innerText = resume.basics.email;
    linkedin.innerText = resume.basics.profiles.url;
    techSkills.innerText = resume.skills.keywords.join('\n');
    hobbies.innerText = resume.interests.hobbies.join('\n');

    preCom.innerHTML = `<strong>Company Name: </strong>${resume.work["Company Name"]}`;
    preStartDate.innerHTML = `<strong>Company Name: </strong>${resume.work["Start Date"]}`;
    preEndDate.innerHTML = `<strong>End Date: </strong>${resume.work["End Date"]}`;
    preSummary.innerHTML = `<strong>Summary: </strong>${resume.work.Summary}`;
    prePos.innerHTML = `<strong>Position: </strong>${resume.work.Position}`;

    projects.innerHTML = `<strong>${resume.projects.name}: </strong>${resume.projects.description}`;

    eduUG.innerHTML = `<strong>UG: </strong>${resume.education.UG.institute}, ${resume.education.UG.course}, ${resume.education.UG["Start Date"]}, ${resume.education.UG["End Date"]}, ${resume.education.UG.cgpa}`;

    eduPU.innerHTML = `<strong>PU: </strong>${resume.education["Senior Secondary"].institute}, ${resume.education["Senior Secondary"].cgpa}`;

    eduHigh.innerHTML = `<strong>High School: </strong>${resume.education["High School"].institute}, ${resume.education["High School"].cgpa}`;

    intCom.innerHTML = `<strong>Company Name: </strong>${resume.Internship["Company Name"]}`;
    intStartDate.innerHTML = `<strong>Company Name: </strong>${resume.Internship["Start Date"]}`;
    intEndDate.innerHTML = `<strong>End Date: </strong>${resume.Internship["End Date"]}`;
    intSummary.innerHTML = `<strong>Summary: </strong>${resume.Internship.Summary}`;
    intPos.innerHTML = `<strong>Position: </strong>${resume.Internship.Position}`;

    achievement.innerText = resume.achievements.Summary;
}

function checkButtons() {
    console.log(currResumeIdx, resumes.length);
    if (currResumeIdx >= resumes.length - 1) {
        nextBtn.style.visibility = 'hidden';
    } else {
        nextBtn.style.visibility = 'visible';
    }
    if (currResumeIdx === 0) {
        previousBtn.style.visibility = 'hidden';
    } else {
        previousBtn.style.visibility = 'visible';
    }
}

function previousButton() {
    currResumeIdx -= 1;
    fillData();
    checkButtons();
}

function nextButton() {
    currResumeIdx += 1;
    fillData();
    checkButtons();
}

previousBtn.onclick = previousButton;
nextBtn.onclick = nextButton;

search.oninput = function (event) {
    if (event.target.value !== '') {
        resumes = dataObj['resume'].filter(resume => {
            return resume.basics.AppliedFor.toLowerCase().includes((event.target.value).toLowerCase())
        })
    } else {
        resumes = dataObj['resume'];
    }
    currResumeIdx = 0;
    if (resumes.length > 0) {
        noSearchIn.style.display = 'none';
        resumeTemplate.style.display = 'block';
        fillData();
        checkButtons();
    } else {
        noSearchIn.style.display = 'block';
        resumeTemplate.style.display = 'none';
    }
}
