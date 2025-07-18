    const screen = document.getElementById('screen');
    const historyPanel = document.getElementById('historyPanel');
    const historyList = document.getElementById('historyList');
    let calculationHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];
    
    function init() {
      updateHistoryDisplay();
    }
    
    function appendToScreen(value) {
      const lastChar = screen.textContent.slice(-1);
      const operators = ['+', '-', '*', '/', '%', '.'];
      
      if (operators.includes(value)) {
        if (screen.textContent !== '' && !operators.includes(lastChar)) {
          screen.textContent += value;
        }
      } else {
        screen.textContent += value;
      }
      
      adjustFontSize();
    }
    
    function clearAll() {
      screen.textContent = '';
      adjustFontSize();
    }
    
    function backspace() {
      screen.textContent = screen.textContent.slice(0, -1);
      adjustFontSize();
    }
    
    function calculate() {
      try {
        let expression = screen.textContent
          .replace(/×/g, '*')
          .replace(/÷/g, '/');
        
        if (!expression) return;
        
        const result = eval(expression);
        
        if (isNaN(result) || !isFinite(result)) {
          throw new Error('Invalid calculation');
        }
        
        calculationHistory.unshift({
          expression: screen.textContent,
          result: result.toString()
        });
        
        if (calculationHistory.length > 20) {
          calculationHistory.pop();
        }
        
        localStorage.setItem('calcHistory', JSON.stringify(calculationHistory));
        
        screen.textContent = result;
        updateHistoryDisplay();
        adjustFontSize();
        
      } catch (error) {
        screen.textContent = 'Error';
        setTimeout(clearAll, 1000);
      }
    }
    
    function adjustFontSize() {
      if (screen.textContent.length > 15) {
        screen.classList.add('overflow-more');
        screen.classList.remove('overflow');
      } else if (screen.textContent.length > 10) {
        screen.classList.add('overflow');
        screen.classList.remove('overflow-more');
      } else {
        screen.classList.remove('overflow', 'overflow-more');
      }
    }
    
    function toggleHistory() {
      historyPanel.classList.toggle('active');
    }
    
    function updateHistoryDisplay() {
      historyList.innerHTML = '';
      
      if (calculationHistory.length === 0) {
        historyList.innerHTML = '<p style="color: var(--gray); text-align: center; margin-top: 20px;">No history yet</p>';
        return;
      }
      
      calculationHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
          <div class="history-expression">${item.expression}</div>
          <div class="history-result">= ${item.result}</div>
        `;
        
        historyItem.addEventListener('click', () => {
          screen.textContent = item.expression;
          adjustFontSize();
          toggleHistory();
        });
        
        historyList.appendChild(historyItem);
      });
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key >= '0' && e.key <= '9') {
        appendToScreen(e.key);
      } else if (['+', '-', '*', '/', '%', '.'].includes(e.key)) {
        appendToScreen(e.key);
      } else if (e.key === 'Enter') {
        calculate();
      } else if (e.key === 'Backspace') {
        backspace();
      } else if (e.key === 'Escape') {
        clearAll();
      }
    });
    
    init();
