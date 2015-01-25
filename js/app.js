function registerUpDown(plus, minus, text) {
    text.value = '0';
    plus.onclick = function() {
        text.value = parseInt(text.value) + 1;        
    };
        
    minus.onclick = function() {
        if (parseInt(text.value) <= 0) return;
        text.value = parseInt(text.value) - 1;
    };    
}


