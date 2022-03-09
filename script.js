var sound = new Audio("https://freespecialeffects.co.uk/soundfx/clocks/clock_tick_03.wav");
sound.loop= true;
var listOfAlarm = [];
var clock = document.getElementById("Clock");


var currentTime = setInterval(function(){
    var date = new Date();
    var hours = date.getHours();
    var mintus = date.getMinutes();
    var second = date.getSeconds();

    var ampm = 'AM';
    if(hours==00){
        hours = 12;
    }
    if(hours>12){
        hours = hours-12;
        ampm= 'PM';
    }
    clock.textContent = addZero(hours) +":" + addZero(mintus) + ":" + addZero(second) + ":"+ ampm;
},1000)

function addZero(time){
    return(time < 10) ? "0" + time : time;
}
//hours menu
function hoursMenu(){
    var select = document.getElementById("alarmhrs");
    var hrs = 11;
    for(i =0; i<= hrs; i++){
        select.options[select.options.length] = new Option(i<10 ? "0"+i:i,i);
    }
}
hoursMenu();

//mintus menu
function mintusMenu(){
    var select = document.getElementById("alarmmins");
    var min = 59;
    for(i =0; i<= min; i++){
        select.options[select.options.length] = new Option(i<10 ? "0"+i:i,i);
    }
}
mintusMenu(); 

//SecondMenu
function secondMenu(){
    var select = document.getElementById("alarmsecs");
    var sec = 59;
    for(i =0; i<= sec; i++){
        select.options[select.options.length] = new Option(i<10 ? "0"+i:i,i);
    }
}
secondMenu(); 

//Set Alarm
window.numberOfAlarm=0;
function setAlarm(){

    var alarmTable = document.getElementById("alarmTable");

    var hr = document.getElementById("alarmhrs");
    var mint = document.getElementById("alarmmins");
    var sec = document.getElementById("alarmsecs");
    var ampm = document.getElementById("ampm");

    var selectHours = hr.options[hr.selectedIndex].value;
    var selectMinuts = mint.options[mint.selectedIndex].value;
    var selectSeconds = sec.options[sec.selectedIndex].value;
    var selectAp = ampm.options[ampm.selectedIndex].value;

    var alarmTime = addZero(selectHours) + ":" + addZero(selectMinuts) + ":" +addZero(selectSeconds) + ":" +addZero(selectAp);
    //Add the row to the tabel to display
    var row = alarmTable.insertRow(window.q);
    row.className='row-alarm';
    row.id=alarmTime;
    var deleteButton = "<button onclick=deleteAlarm('"+alarmTime+"')>Delete Alarm</button>";
    window.numberOfAlarm=window.numberOfAlarm+1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = alarmTime;
    cell2.innerHTML = deleteButton;
    var alarm = {time:alarmTime, status:"inactive"};
    listOfAlarm.push(alarm);
    //

    // document.getElementById("alarmhrs").disable =true;
    // document.getElementById("alarmmins").disable =true;
    // document.getElementById("alarmsecs").disable =true;
    // document.getElementById("ampm").disable =true;

    var clock = document.getElementById("Clock");
    
    //play audio when item 
     
    setInterval(function(){
        var date = new Date();
        var hours = date.getHours();
        var mintus = date.getMinutes();
        var second = date.getSeconds();
    
        var ampm = 'AM';
        if(hours==00){
            hours = 12;
        }
        if(hours>12){
            hours = hours-12;
            ampm= 'PM';
        }
        var currentTime = clock.textContent = addZero(hours) +":" + addZero(mintus) + ":" + addZero(second) + ":"+ ampm;
        
        //Looping through all the alarm time.
        for(var i=0;i<listOfAlarm.length;i++){
            let alarmTime = listOfAlarm[i];
            //console.log(i+"-->"+almTime)
            if(alarmTime.time== currentTime){
                listOfAlarm[i].status="active";
                sound.play();
                break;
            }
           // console.log(listOfAlarm[i]);
        }       

    },1000)

}
function clearAlarm(){
    document.getElementById("alarmhrs").disable =false;
    document.getElementById("alarmmins").disable =false;
    document.getElementById("alarmsecs").disable =false;
    document.getElementById("ampm").disable =false;
    
    for(var i=0;i<listOfAlarm.length;i++){
        let alarmTime = listOfAlarm[i];
        console.log(i+"-->"+alarmTime)
        document.getElementById(alarmTime.time).remove();  
    }
    listOfAlarm=[];
    window.numberOfAlarm=0;
    sound.pause();

}

function deleteAlarm(almTime){
    console.log("entering into delete alarm for deleting -->"+almTime);
    for(var i=0;i<listOfAlarm.length;i++){
        let alarmTime = listOfAlarm[i];
        console.log(i+"-->"+alarmTime)
        if(alarmTime.time == almTime){
            if(alarmTime.status=="active"){
                sound.pause();
            }
            listOfAlarm.splice(i,1);
            console.log(listOfAlarm);
            document.getElementById(alarmTime.time).remove();
            window.numberOfAlarm=window.numberOfAlarm-1;
        }

    }
    if(listOfAlarm.length==0){
        var alarmTable = document.getElementById("alarmTable");
        while(alarmTable.rows.length > 0) {
            alarmTable.deleteRow(0);
          }
          window.numberOfAlarm=0;
    }

}



