document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calculate').addEventListener('click', function (e) {
        e.preventDefault();
        clearErrors();

        const age = document.getElementById('age').value;
        const income = parseFloat(document.getElementById('income').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const deductions = parseFloat(document.getElementById('deductions').value);

        let hasErrors = false;

        if (!age) {
            document.getElementById('ageError').style.display = 'block';
            hasErrors = true;
        }

        if (isNaN(income) || income < 0) {
            document.getElementById('incomeError').style.display = 'block';
            hasErrors = true;
        }

        if (isNaN(extraIncome) || extraIncome < 0) {
            document.getElementById('extraIncomeError').style.display = 'block';
            hasErrors = true;
        }

        if (isNaN(deductions) || deductions < 0) {
            document.getElementById('deductionsError').style.display = 'block';
            hasErrors = true;
        }

        if (!hasErrors) {
            let tax = 0;
            const threshold = 8;

            if (income + extraIncome - deductions > threshold) {
                const taxableIncome = income + extraIncome - deductions - threshold;
                if (age === '<40') {
                    tax = 0.3 * taxableIncome;
                } else if (age === '>=40&<60') {
                    tax = 0.4 * taxableIncome;
                } else {
                    tax = 0.1 * taxableIncome;
                }
            }

            document.getElementById('taxAmount').textContent = `${tax.toFixed(2)} Lakhs`;
            document.getElementById('modal').style.display = 'block';
        }
    });

    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target == document.getElementById('modal')) {
            document.getElementById('modal').style.display = 'none';
        }
    });

    function clearErrors() {
        document.querySelectorAll('.error').forEach(function (error) {
            error.style.display = 'none';
        });
    }
    
});

// error msg function
function showErrorMessage(event, message) {
    showTooltip(event, message);
    setTimeout(hideTooltip, 5000);
}


//show tooltip function
function showTooltip(event, message) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerText = message;
    tooltip.style.top = (event.clientY + 10) + 'px'; 
    tooltip.style.left = (event.clientX + 10) + 'px'; 
    tooltip.style.display = 'block';
}

//hide tooltip function
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}

// showing tooltip messages through event
document.querySelectorAll('.suggestion').forEach(icon => {
    icon.addEventListener('mouseover', function(event) {
     
        const fieldName = event.target.parentElement.parentElement.getAttribute('for');
        let message = '';
        switch (fieldName) {
            case 'age':
                message = 'This field requires you to select your age group.';
                break;
            case 'income':
                message = 'Gross annual income is your total salary in a year before any deductions.';
                break;
            case 'extraIncome':
                message = 'Extra income is income from another extra resource.';
                break;
            case 'deductions':
                message = 'Deductions are expenses that can be subtracted from a taxpayer\'s gross income to reduce taxable income.';
                break;
            default:
                message = 'Invalid field.';
                break;
        }
        showTooltip(event, message);
    });
    icon.addEventListener('mouseout', hideTooltip); 
});