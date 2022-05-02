const alertBanner = document.getElementById('alert');
const trafficCanvas = document.getElementById('traffic-chart');
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("mobile-chart");
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
const notificationIcon = document.getElementById("bell");
const notificationList = document.getElementById("bell-list");
const trafficInterval = document.querySelector(".traffic-nav");


// js chart data
let trafficData = trafficDataMonthly  = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
    "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
        2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
        }]
};

let trafficDataHourly = {
    labels: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
    "08:00", "09:00", "10:00", "11:00", "12:00"],
    datasets: [{
        data:  [1250, 1850, 1000, 2000,  1750, 750, 1250,  2250, 1500,
        2500, 1500, 300],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
        }]
};

let trafficDataDaily = {
    labels: ["01:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00",
    "15:00", "17:00", "19:00", "21:00", "23:00", "01:00"],
    datasets: [{
        data:  [ 1850, 2500, 1000, 1250, 1750, 750, 2000, 1250,  2250, 1500,
        1500, 450, 1700],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
        }]
};

let trafficDataWeekly = {
    labels: ["Thurs", "Fri", "Sat", "Sun", "Mon", "Tues", "Wed"],
    datasets: [{
        data:  [1000, 2500, 750, 1250, 1750, 2000, 1250],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
        }]
};

let trafficOptions = {
    backgroundColor: 'rgba(112, 104, 201, .5)',
    fill: true,
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        y: {
        beginAtZero: true
        }
    },
    plugins: {
        legend: {
        display: false
        }
    }
};

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
    });    

    // data for daily traffic bar chart
const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
        }]
    };

const dailyOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
    });

const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: '# of Users',
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ]
    }]
};

const mobileOptions = {
    aspectRatio: 1.9,
    plugins: {
        legend: {
            position: 'right',
            labels: {
            boxWidth: 20,
            fontStyle: 'bold'
            }
        }
    }
};

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});
    
// notification data
const notificationMessages = [ 
    'Dan Oliver requested access to your page',
    'Dawn Wood sent you a message',
    'Dale Byrd shared his page with you',
    'Your password expires in 6 days',
    'Dale Byrd posted on your page',
    'Today is Dan Oliver\'s birthday'
];

// disable notification alert
notificationIcon.addEventListener('click', (e) => {
    const element = e.target.firstElementChild;
    if (element.className !== 'invisible') {
        makeInvisible(element);
    }

    const listItems = notificationList.childNodes;
    for(let i = 0; i < listItems.length; i++) {
        let listItem = listItems[i];
        if (listItem.className === 'invisible') {
            makeVisible(listItem);
        }    
    }
});

// disable notification list item
notificationList.addEventListener('click', event => {
    makeInvisible(event.target);
});

// make element invisible
function makeInvisible(element) {
    return element.classList.add('invisible');
}

// make element invisible element visible
function makeVisible(element) {
    return element.classList.remove('invisible');
}

// unordered list function
function createListElements (listElement, listObjects) {
    let lis = '';
    for (let i = 0; i < listObjects.length; i++){
        lis += `<li class="invisible">${listObjects[i]}</li>`;
    }
    return listElement.innerHTML = lis;
}


// call unordered list function to create notifications
createListElements(notificationList, notificationMessages);

// create html for the banner
alertBanner.innerHTML = 
    `
        <div class="alert-banner flex">
            <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
            <p class="alert-banner-close">x</p>
        </div>
    `
;

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = "none";
    }
});

// traffic interval selection
trafficInterval.addEventListener('click', e => {
    const element = e.target;
    if (element.tagName === 'LI' && (!element.classList.contains('highlight'))) {
        const intervals = trafficInterval.children;
        for (let i = 0; i < intervals.length; i++) {
            let interval = intervals[i];
            if (interval.classList.contains('highlight')) {
                interval.classList.remove('highlight');
            }
        }
        element.classList.add('highlight');
    }
    if (element.textContent === 'hourly') { 
        trafficChart.data = trafficDataHourly;
        trafficChart.update(); }
    if (element.textContent === 'daily') { 
        trafficChart.data = trafficDataDaily;
        trafficChart.update();}
    if (element.textContent === 'weekly') { 
        trafficChart.data = trafficDataWeekly;
        trafficChart.update();
    }
    if (element.textContent === 'monthly') { 
        trafficChart.data = trafficDataMonthly 
        trafficChart.update();
    }
})

// send events

send.addEventListener('click', () => {
    // ensure user and message fields are filled out
    if (user.value === "" && message.value === "") {
    alert("Please fill out user and message fields before sending");
    } else if (user.value === "" ) {
    alert("Please fill out user field before sending");
    } else if (message.value === "" ) {
    alert("Please fill out message field before sending");
    } else {
    alert(`Message successfully sent to: ${user.value}`);
    }
    });