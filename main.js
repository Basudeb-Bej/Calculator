function cal(value) {
    let screen = document.getElementById('1');
    let lastChar = screen.value.slice(-1); 

    const operators = ['+', '-', '/', '%', '.', '×']; 
    
    if (value === 'AC') {
        screen.value = '';  
        screen.classList.remove('overflow', 'overflow-more');
    } 
    else if (value === 'C') {
        screen.value = screen.value.slice(0, -1); 
    } 
    else if (operators.includes(value)) {
        if (screen.value !== '' && !operators.includes(lastChar)) {
            screen.value += value;
        }
    } 
    else if (value === '*') {
        if (lastChar !== '×') {
            screen.value += '×'; 
        }
    }
    else {
        screen.value += value; 
    }

    adjustFontSize(screen);
}

function adjustFontSize(screen) {
  
    if (screen.value.length > 15) {
        screen.classList.add('overflow-more');
        screen.classList.remove('overflow'); 
    } else if (screen.value.length > 10) {
        screen.classList.add('overflow'); 
    } else {
        screen.classList.remove('overflow', 'overflow-more'); 
    }
}

function calculator() {
    let screen = document.getElementById('1');
    let expression = screen.value.replace(/×/g, '*');  
    
    try {
        let result = eval(expression);  
        if (isNaN(result)) {
            throw new Error("Invalid Calculation"); 
        }
        screen.value = result;
        adjustFontSize(screen);
    } catch (error) {
        screen.value = 'Error'; 
        adjustFontSize(screen);
    }
}
