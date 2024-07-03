

function getJobIdByUrl(){
    const url = document.URL;
    const jobID = parseInt(url.split('=')[1]);
    return jobID
}