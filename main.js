function cal(value) {
 let screen = document.getElementById('1');
      if (value === 'AC'){
        screen.value = '';
      } 
      else if (value === 'C'){
        screen.value = screen.value.slice(0, -1);
      } 
      else {
        screen.value += value;
      }
}
function calculator() {
 let screen = document.getElementById('1');
 let expression = screen.value;
 let result = eval(expression);
  screen.value = result;
}
