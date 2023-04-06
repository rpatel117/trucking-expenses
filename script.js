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



function calculateExpenses(income, miles) {
    let expenses = 0;
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

    return income - expenses;


}


if (submitBtn) { 
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault(); 

    let income = document.getElementById('incomeInput').value;
    let distance = document.getElementById('milesInput').value;

    
    console.log(`Input 1: ${income}`);
    console.log(`Input 2: ${distance}`);
    outputfield.innerHTML = calculateExpenses(parseFloat(income), parseFloat(distance))

    
  });
} else {
  console.error('Submit button not found'); 
}


