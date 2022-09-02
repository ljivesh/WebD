const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//functions
function showError(input, message)
{
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function showSuccess(input)
{
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function validateEmail(email)
{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!(re.test(String(email.value).toLowerCase()))) showError(email, 'Please enter a valid email address.');
    else showSuccess(email);
}

function validatePassword(password)
{
    flag = /[A-Z]/.test(password.value) &&
           /[a-z]/.test(password.value) &&
           /[0-9]/.test(password.value) &&
           /[^A-Za-z0-9]/.test(password.value) &&
           (password.value).length >=8;

    if(!flag) showError(password, 'Pleas enter a valid password');
    else showSuccess(password);
}

function getFeildType(input)
{
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr)
{
    var flag = true;
    inputArr.forEach(function(input) 
    {
        

        if(input.value.trim() === '')
        {
            showError(input, `${getFeildType(input)} is required!`);
            flag = false;
        }
        
        else
        {
            showSuccess(input);
        }

        
    });
    return flag;
}

function confirmPassword(input1, input2)
{
    if(input1.value === input2.value && input2!='') 
    {
        showSuccess(input2);

    }
    else 
    {
        showError(input2, 'Password does not match');

    }
}


//Event Listners
form.addEventListener('submit', function(e)
{
    e.preventDefault();
    if(checkRequired([username, email, password, password2]))
    {
        validateEmail(email);
        validatePassword(password);
        confirmPassword(password, password2);

    }
    

}
);