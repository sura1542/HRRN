let hrrn = []
const nameProcess = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2']
const arrival = [], burst = [];
let sum_bt = 0, avg_tt = 0, avg_wt = 0, i = 0, n = 0;


const createTable= (n)=>{

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
      const aw_wt = document.createElement("p");
      const aw_tt = document.createElement("p");

      aw_wt.textContent = avg_wt;
      aw_tt.textContent = avg_tt;   

      document.getElementById("container-awwt").style.display = "flex";
      document.getElementById("container-awtt").style.display = "flex";

      document.getElementById("container-awwt-inner").appendChild(aw_wt);
      document.getElementById("container-awtt-inner").appendChild(aw_tt);
}

const clearTable= ()=>{

   document.getElementById("tbody").innerHTML = "";
   document.getElementById("table").style.display = "none"; 
   document.getElementById("container-awwt").style.display = "none";
   document.getElementById("container-awtt").style.display = "none";

   document.getElementById("container-awwt-inner").innerHTML = "";
   document.getElementById("container-awtt-inner").innerHTML = "";


   

   hrrn = []
   sum_bt = 0, avg_tt = 0, sum_bt = 0, avg_tt = 0, avg_wt = 0, i = 0, n = 0;
  

}

const getDataHRRN= ()=>{

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


   const n = Number(burst.length);
 
   console.log(n);

   for (let i = 0; i < n; i++) {

      temp = {
         name: nameProcess[i],
         at: arrival[i],
         bt: burst[i],
         ct: 0,
         wt: 0,
         tt: 0,
         check: 0
      }
   
      hrrn.push(temp);
   

   }
   hrrn.sort((a, b) => {
      return a.at - b.at
   });

   let time = 0;
   console.log(time);
   let hrr = -9999;
   let x = 0, cur =0;
for(let A = 0; A < n; A++){
      
      for(let i = 0; i < n; i++){
         console.log(15);
         
         if(hrrn[i].at <= time && hrrn[i].check != 1){
            
           console.log(hrrn[i].at)
            x = ((time + hrrn[i].at+hrrn[i].bt) / hrrn[i].bt);

            if(hrr < x){

               hrr = x;
               console.log(hrr);

               cur = i;
            }
         }
      }

      
         if(time == 0){
         hrrn[cur].ct = hrrn[cur].bt + hrrn[cur].at ;
         console.log(time);


         hrrn[cur].tt = hrrn[cur].ct - hrrn[cur].at;

         hrrn[cur].wt = hrrn[cur].tt -  hrrn[cur].bt;
         time += hrrn[cur].ct;
         hrrn[cur].check = 1;
         hrr = 0;
         }
         else{
         hrrn[cur].ct = time + hrrn[cur].bt ;
         console.log(time);
         time = 0;
         console.log(time);

         hrrn[cur].tt = hrrn[cur].ct - hrrn[cur].at;

         hrrn[cur].wt = hrrn[cur].tt -  hrrn[cur].bt;
         time += hrrn[cur].ct;
         console.log(time);
         hrr = 0;
         
         hrrn[cur].check = 1;
         }
   }

   for(let i = 0; i < hrrn.length ; i++ ){
      avg_wt += hrrn[i].wt;
      avg_tt += hrrn[i].tt;
   }

   avg_wt = avg_wt / hrrn.length;
   avg_tt = avg_tt / hrrn.length;

   console.log(avg_wt);
   console.log(avg_tt);
   createTable(n);
}
