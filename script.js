// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgDkTfHmv2POozkVwkuqBpwYGnOhxZPOM",
  authDomain: "trucking-expenses.firebaseapp.com",
  projectId: "trucking-expenses",
  storageBucket: "trucking-expenses.appspot.com",
  messagingSenderId: "388441761237",
  appId: "1:388441761237:web:ae19edff5b69d17bcf895c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const submitBtn = document.getElementById('submit');

const outputfield = document.getElementById('output');

let carLoan = .09;
let insurance = .12;
let phone = .0051;
let fuel = .20;
let trailer = .09;
let commission = .1;
let maintenance = .08
let tire = .02
let expenses = 0;
let profit = 0;
let incomeTable = document.getElementById('incomeTable');
let distanceTable = document.getElementById('distanceTable');
let commissionTable = document.getElementById('commissionTable');
let carTable = document.getElementById('carTable');
let insuranceTable = document.getElementById('insuranceTable');
let phoneTable = document.getElementById('phoneTable');
let fuelTable = document.getElementById('fuelTable');
let trailerTable = document.getElementById('trailerTable');
let maintenanceTable = document.getElementById('maintenanceTable');
let tireTable = document.getElementById('tireTable');
const dateInput = document.getElementById('dateInput')




function calculateExpenses(income, miles) {
    expenses = 0;
    incomeTable.innerHTML = Math.ceil(income);
    distanceTable.innerHTML = Math.ceil(miles);
    commissionTable.innerHTML = Math.ceil(income * commission);
    carTable.innerHTML = Math.ceil(miles * carLoan);
    insuranceTable.innerHTML = Math.ceil(miles * insurance);
    phoneTable.innerHTML = Math.ceil(miles * phone);
    fuelTable.innerHTML = Math.ceil(miles * fuel);
    trailerTable.innerHTML = Math.ceil(miles * trailer);
    maintenanceTable.innerHTML = Math.ceil(miles * maintenance);
    tireTable.innerHTML = Math.ceil(miles * tire);

    income = income - (income * commission);
    expenses = miles * carLoan;
    expenses += miles * insurance;
    expenses += miles * phone;
    expenses += miles * fuel; 
    expenses += miles * trailer;
    expenses += miles * maintenance;
    expenses += miles * tire;
    profit = Math.ceil(income - expenses);
    return profit;
}


if (submitBtn) { 
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault(); 

    let income = document.getElementById('incomeInput').value;
    let distance = document.getElementById('milesInput').value;
    
    console.log(`Input 1: ${income}`);
    console.log(`Input 2: ${distance}`);
    
    outputfield.innerHTML = calculateExpenses(parseFloat(income), parseFloat(distance))
    
    const contractsRef = db.collection('contracts');
    const newContractRef = contractsRef.doc();

    const inputtedDate = new Date(dateInput.value)
    const timezoneOffset = inputtedDate.getTimezoneOffset();
    const localTime = new Date(inputtedDate.getTime() - timezoneOffset * 60 * 1000);

    console.log(dateInput.value) 
    console.log(localTime)
    

    console.log(inputtedDate)
    // create an object to represent the data you want to write
    const newContract = {
      income: income,
      distance: distance,
      commission: parseInt(commissionTable.innerHTML),
      carLoan: parseInt(carTable.innerHTML),
      insurance: parseInt(insuranceTable.innerHTML),
      phone: parseInt(phoneTable.innerHTML),
      fuel: parseInt(fuelTable.innerHTML),
      trailer: parseInt(trailerTable.innerHTML),
      maintenance: parseInt(maintenanceTable.innerHTML),
      tire: parseInt(tireTable.innerHTML),
      date: inputtedDate,
      trueDate: dateInput.value, //I'll fix this later
      profit: profit
    };

    // write the data to the "users" collection
    newContractRef.set(newContract)
      .then(() => {
        console.log('Data successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });

  });
} else {
  console.error('Submit button not found'); 
}


// Alright from here we're gonna develop retrieval

const contractsRef = db.collection('contracts');
const sd = document.getElementById('startDate');
const ed = document.getElementById('endDate');
const retrievalBtn = document.getElementById('retrieveData');
const expenseReport = document.getElementById('expense-report')

retrievalBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const startDate = new Date(sd.value)
  const endDate = new Date(ed.value)
  console.log(startDate)
  console.log(endDate)


  const query = contractsRef
                .where('date', '>=', startDate)
                .where('date', '<=', endDate);



query.get().then((querySnapshot) => {

  expenseReport.innerHTML = "";

  querySnapshot.forEach((doc) => {
    // doc.data() is the data for the document
    let data = doc.data();

let html = "<table><thead><tr><th>Date</th><th>Income</th><th>Distance</th><th>Commission</th><th>Car Loan</th><th>Insurance</th><th>Phone</th><th>Trailer</th><th>Maintenance</th><th>Tire</th><th>Profits</th></tr></thead><tbody>";

html += "<tr>";
html += "<td style='padding: 7x;'>" + data.trueDate + "</td>";
html += "<td style='padding: 7px;'>" + data.income + "</td>";
html += "<td style='padding: 7px;'>" + data.distance + "</td>";
html += "<td style='padding: 7px;'>" + data.commission + "</td>";
html += "<td style='padding: 7px;'>" + data.carLoan + "</td>";
html += "<td style='padding: 7px;'>" + data.insurance + "</td>";
html += "<td style='padding: 7px;'>" + data.phone + "</td>";
html += "<td style='padding: 7px;'>" + data.trailer + "</td>";
html += "<td style='padding: 7px;'>" + data.maintenance + "</td>";
html += "<td style='padding: 7px;'>" + data.tire + "</td>";
html += "<td style='padding: 7px;'>" + data.profit + "</td>";
html += "</tr>";

html += "</tbody></table>";

let div = document.createElement("div");
div.innerHTML = html;

    expenseReport.appendChild(div);
    console.log(doc.id, " => ", doc.data());
  });
});
});
