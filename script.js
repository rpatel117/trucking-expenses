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



function calculateExpenses(income, miles) {
    let expenses = 0;
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


