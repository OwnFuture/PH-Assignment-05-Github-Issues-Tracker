const createElements=(arr)=>{
    const htmlElements=arr.map((el)=>`<span class="btn">${el}</span>`);
    return(htmlElements.join(" "));
}

let allIssues = [];

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;  
            displayIssues(allIssues);
        }); 
};

const displayIssues=(issues)=>{
    const cardContainer =document.getElementById('card-container');
    const issueCount =document.getElementById('issue-count');
    cardContainer.innerHTML='';

    for(let issue of issues){
        const cardDiv=document.createElement('div');
        cardDiv.innerHTML=`
         <div class="card bg-white rounded-xl p-5 space-y-3 h-full border-t-4 ${issue.status==='open' ? 'border-green-500' : 'border-purple-500'}">
                <div class="flex justify-between">
                    <img src="${issue.status=='open' ? './B13-A5-Github-Issue-Tracker/assets/Open-Status.png' : './B13-A5-Github-Issue-Tracker/assets/Closed- Status .png'}" alt="">
                    <p class="px-2 py-1 rounded text-white text-xs ${
                        issue.priority === 'high' 
                        ? 'bg-red-500' 
                        : issue.priority === 'medium' 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-gray-500'
                    }">
                        ${issue.priority}
                    </p>
                </div>
                <div>
                    <h2 class="text-[18px] font-bold">${issue.title}</h2>
                    <p class="text-[12px]">${issue.description}</p>
                </div>
                <div>${createElements(issue.labels)}</div><hr>
                <div>
                    <h2 class="font-bold text-[14px]">#${issue.id} by ${issue.author}</h2>
                    <p class="text-[12px]">${issue.createdAt}</p>
                </div>
            </div>
        `
        cardContainer.append(cardDiv);
        
        issueCount.innerText=cardContainer.children.length;
    }
}

loadIssues();

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

//Button Toggle

const buttons =[allBtn,openBtn,closedBtn];

const activeButton=(active)=>{
    buttons.forEach(btn=>{
        if(btn===active){
            btn.classList.add('btn-primary');
        }else{
            btn.classList.remove('btn-primary');
        }
    })
}

allBtn.addEventListener("click", () => {
    displayIssues(allIssues);
    activeButton(allBtn);
});

openBtn.addEventListener("click", () => {
    const openIssues = allIssues.filter(issue => issue.status === "open");
    displayIssues(openIssues);
    activeButton(openBtn);
});

closedBtn.addEventListener("click", () => {
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    displayIssues(closedIssues);
    activeButton(closedBtn);
});






