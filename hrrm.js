let hrrn = []
const c = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const arrival = [], burst = [];
let sum_bt = 0, avgtt = 0, avgwt = 0, i = 0, n = 0;


const createTable= (n)=>{
      // creat table to display 

      let table = document.getElementById("table").style.display = "block"; 

      for(let i = 0; i < n; i++){
   
         const tr = document.createElement("tr");
         const td_name = document.createElement("td");
         const td_at = document.createElement("td");
         const td_bt = document.createElement("td");
         const td_ct = document.createElement("td");
         const td_tt = document.createElement("td");
         const td_wt = document.createElement("td");
   
         const tbody = document.getElementById("tbody").appendChild(tr);
   
         td_name.textContent = hrrn[i].name;
         td_at.textContent = hrrn[i].at;
         td_bt.textContent = hrrn[i].bt;
         td_ct.textContent = hrrn[i].ct;
         td_tt.textContent = hrrn[i].tt;
         td_wt.textContent = hrrn[i].wt;
   
         tr.appendChild(td_name);
         tr.appendChild(td_at);
         tr.appendChild(td_bt);
         tr.appendChild(td_ct);
         tr.appendChild(td_tt);
         tr.appendChild(td_wt);
   
      }
}

const clearTable= ()=>{
   // creat table to display 

   document.getElementById("tbody").innerHTML = "";

   
   hrrn = []
   sum_bt = 0, avgtt = 0, avgwt = 0, i = 0, n = 0;

}

const getDataHRRN= ()=>{

   // clear 
   clearTable();

   const arrivalString = document.getElementById("ArrivalTimes").value;
   const BurstString = document.getElementById("BurstTimes").value;
   

   const arrival = arrivalString.split(' ').map(function(item) {
      return parseInt(item, 10);
   });

   const burst = BurstString.split(' ').map(function(item) {
      return parseInt(item, 10);
   });

   document.getElementById("ArrivalTimes").value = "";
   document.getElementById("BurstTimes").value = "";


   // check length 
   const n = Number(burst.length);
 
   console.log(n);
   // Initail process burst time 
   for (let i = 0; i < n; i++) {

      temp = {
         name: c[i],
         at: arrival[i],
         bt: burst[i],
         ct: 0,
         wt: 0,
         tt: 0,
         completed: 0
      }
   
      hrrn.push(temp);
   
      // Variable for sum of all Burst Times
      sum_bt += burst[i];
   }

   // sort by at 
   hrrn.sort((a, b) => {
      return a.at - b.at
   });

   let time = 0;
   console.log(time);
   // Set lower limit to response ratio 
   let hrr = -9999;
   let x = 0, loc =0;
   console.log(sum_bt);
   // Response Ratio = (W + S)/S
for(let A = 0; A < n; A++){
      // select next process 
      for(let i = 0; i < n; i++){
         console.log(15);
         // Checking if process has arrived and is Incomplete
         if(hrrn[i].at <= time && hrrn[i].completed != 1){
            
            // Calculating Response Ratio 
            x = ((time + hrrn[i].at+hrrn[i].bt) / hrrn[i].bt);

            // hecking for Highest Response Ratio 
            if(hrr < x){

               // Storing Response Ratio  
               hrr = x;
               console.log(hrr);
               // Storing Location
               loc = i;
            }
         }
      }


         // Updating time value 
      
         if(time == 0){
         hrrn[loc].ct = hrrn[loc].bt + hrrn[loc].at ;
         console.log(time);


         // Calculation of Turn Around Time 
         hrrn[loc].tt = hrrn[loc].ct - hrrn[loc].at;
         // Calculation of waiting time 
         hrrn[loc].wt = hrrn[loc].tt -  hrrn[loc].bt;
         time += hrrn[loc].ct;//4
         hrrn[loc].completed = 1;
         hrr = 0;
         }
         else{
         hrrn[loc].ct = time + hrrn[loc].bt ;
         console.log(time);
         time = 0;
         console.log(time);
         // Calculation of Turn Around Time 
         hrrn[loc].tt = hrrn[loc].ct - hrrn[loc].at;
         // Calculation of waiting time 
         hrrn[loc].wt = hrrn[loc].tt -  hrrn[loc].bt;
         time += hrrn[loc].ct;//10
         console.log(time);
         hrr = 0;
         
         hrrn[loc].completed = 1;
         }
      

      

      
      
      
   }
   // create html table
   
   createTable(n);



}
const getDataHRRN_RR=(quantum)=>{

   // clear
   clearTable()

   const arrivalString = document.getElementById("ArrivalTimes").value;
   const BurstString = document.getElementById("BurstTimes").value;

   const arrival = arrivalString.trim().split(' ').map(function(item) {
      return parseInt(item);
   });

   const burst = BurstString.trim().split(' ').map(function(item) {
      return parseInt(item);
   });

   console.log(arrival);
   console.log(burst);

   // check length
   if(arrival.length != burst.length) {

      document.getElementById("ArrivalTimes").value = "";
      document.getElementById("BurstTimes").value = "";

      alert('incorrect');

   }

   else if (arrivalString == "" || BurstString == "" ){
      alert('incorrect');

   }

   else {

      document.getElementById("ArrivalTimes").value = "";
      document.getElementById("BurstTimes").value = "";


      // Initail process burst time 
      for (let i = 0; i < arrival.length; i++) {

         temp = {
            name: c[i],
            at: arrival[i],
            bt: burst[i],
            ct: 0,
            wt: 0,
            tt: 0,
            // count time quantum
            count: 0,
            completed: 0
         }

         hrrn.push(temp);
         
         // Variable for sum of all Burst Times
         sum_bt += burst[i];
      }

      console.log(hrrn);


      // sort by at 
      hrrn.sort((a, b) => {
         if(a.at > b.at) return 1;
         if(a.at < b.at) return -1;
         return 0;
      })

      // print log sort 
      console.log("print hrrn sort");
      console.log(hrrn);
      console.log("-------------");


      
      let time = hrrn[0].at;

      let processBF = "";

      // Response Ratio = (W + S)/S
      while(time < sum_bt + hrrn[0].at){

         // Set lower limit to response ratio 
         let hrr = -100;
         let x = 0, loc =0;

         // select next process 
         for(let i = 0; i < burst.length; i++){

            // Checking if process has arrived and is Incomplete -> เลือก process ตัวถัดไป
            if(hrrn[i].at <= time && hrrn[i].completed !== 1 && hrrn[i].name != processBF){

               // Calculating Response Ratio 
               let wt_temp = (time - hrrn[i].at);
               if(wt_temp <= 0) wt_temp *= 1
               x = ((hrrn[i].bt + wt_temp) / hrrn[i].bt);

               // hecking for Highest Response Ratio 
               if(hrr < x){

                  // Storing Response Ratio  
                  hrr = x;

                  // Storing Location
                  loc = i;

                  processBF = hrrn[loc].name;

               }
            }
         }

         // set time quantum -> ทำงานตา quantum
         count = 0;
         while(count < parseInt(quantum)){


            time += 1;

            // set time count 
            hrrn[loc].count += 1;

            // update counter check quantum 
            count += 1;

            // Calculation of waiting time 
            hrrn[loc].wt = time - hrrn[loc].at - hrrn[loc].bt;

            // Calculation of Turn Around Time 
            hrrn[loc].tt = time - hrrn[loc].at;

            // Calculation of Complete time
            hrrn[loc].ct = time;

            // check process complete
            if(hrrn[loc].count === hrrn[loc].bt){
               hrrn[loc].completed = 1;
               break;
            }

         
         }
      }

      for(let i = 0; i < hrrn.length ; i++ ){
         avgwt += hrrn[i].wt;
         avgtt += hrrn[i].tt;
      }

      avgwt = avgwt / hrrn.length;
      avgtt = avgtt / hrrn.length;
   

      // create html table
      createTable(hrrn.length);
   
   }

}