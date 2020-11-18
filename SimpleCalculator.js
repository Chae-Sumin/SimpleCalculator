function calculatorGenerate(id,width,height,style){ // 계산기 생성 함수
    let calFlag = false;
    let calculatorStack = ["simpleCalculater"];
    let lastAns = null;
    const box = document.getElementById(id);
    const calForm = document.createElement("form");
    box.appendChild(calForm);
    if(width != undefined) {box.style.width = width + 'px'}
    if(height != undefined) {box.style.height = height + 'px'}
    const display1 = createDisplay(); // input 생성
    const display2 = createDisplay(); // input 생성
    createBtnTable(); // 버튼 테이블 생성
    const boxTable = calForm.querySelector("table>tbody"); // boxTable
    const boxCell = new Array(boxTable.children.length); // table cell 설정
    for(let i = 0; i < boxCell.length; i++){
        boxCell[i] = new Array(boxTable.children[0].children.length);
        for (let j = 0; j < boxCell[i].length; j ++){
            boxCell[i][j] = boxTable.children[i].children[j];
        }
    }
    createBtnText(); // table cell 내용 입력
    UpperDisplayAction(display1);
    createBtnFunc();
    defaultStyle(style);
//----------------------------------------------------------------
    function createDisplay(){ // input 생성
        const display = document.createElement("input");
        display.setAttribute("type", "text");
        display.setAttribute("class", "scDisplay");
        display.setAttribute("readonly", "readonly");
        display.value = null;
        calForm.appendChild(display);
        return display;
    }
    function UpperDisplayAction(display){ //위의 디스플레이 설정
        if(calFlag) {return true;}
        if(lastAns) {display.value = "ANS("+lastAns+")"; return true;}
        display.value = "";
        for(let i = 0; i<calculatorStack.length; i++){
            display.value = display.value + calculatorStack[i] + " ";
        }
    }
    function createBtnTable(){ // 버튼 테이블 생성
        const btnTable = document.createElement("table");
        const tableBody = document.createElement("tbody");
        const tableRows = [];
        for(let i = 0; i < 6; i++){
            let tableRow = document.createElement("tr");
            tableRows.push(tableRow);
            for(let j = 0; j < 4; j++){
                let tableCell = document.createElement("td");
                let cellBtn = document.createElement("button");
                cellBtn.setAttribute("type","buttom");
                cellBtn.style.cursor = "pointer"
                tableCell.appendChild(cellBtn);
                tableRows[i].appendChild(tableCell);
            }
            tableBody.appendChild(tableRows[i]);
        }
        btnTable.appendChild(tableBody);
        calForm.appendChild(btnTable)
    };
    function createBtnText(){ // 버튼 내용 삽입
        boxCell[0][0].children[0].textContent = '%';
        boxCell[0][1].children[0].textContent = '√';
        boxCell[0][2].children[0].textContent = '^2';
        boxCell[0][3].children[0].textContent = '1/x';
        boxCell[1][0].children[0].textContent = 'CE';
        boxCell[1][1].children[0].textContent = 'C';
        boxCell[1][2].children[0].textContent = '<-';
        boxCell[1][3].children[0].textContent = '/';
        boxCell[2][0].children[0].textContent = '7';
        boxCell[2][1].children[0].textContent = '8';
        boxCell[2][2].children[0].textContent = '9';
        boxCell[2][3].children[0].textContent = '*';
        boxCell[3][0].children[0].textContent = '4';
        boxCell[3][1].children[0].textContent = '5';
        boxCell[3][2].children[0].textContent = '6';
        boxCell[3][3].children[0].textContent = '-';
        boxCell[4][0].children[0].textContent = '1';
        boxCell[4][1].children[0].textContent = '2';
        boxCell[4][2].children[0].textContent = '3';
        boxCell[4][3].children[0].textContent = '+';
        boxCell[5][0].children[0].textContent = '±';
        boxCell[5][1].children[0].textContent = '0';
        boxCell[5][2].children[0].textContent = '.';
        boxCell[5][3].children[0].textContent = '=';
        boxCell[5][3].children[0].setAttribute("type","submit");
    }
    function createBtnFunc(){ // 버튼별 동작
        let funcGroup = [];
        for(let i = 0; i < boxCell.length; i++){
            for(let j = 0; j < boxCell[i].length; j++){
            boxCell[i][j].children[0].addEventListener('click',(e)=>{
                    e.preventDefault();
                    if(calFlag){
                        calFlag = false;
                        UpperDisplayAction(display1);
                        lastAns = calculatorStack[0];
                        while(calculatorStack.pop());
                        display2.value = null;
                    }
                    funcGroup[i*boxCell[i].length + j]();
                    display2.value = display2.value == "NaN"? null : display2.value;
                    UpperDisplayAction(display1);
                })
            }
        }
        funcGroup[0] = () => { // %
            if(display2.value){
            display2.value = display2.value / 100;
            } else {display2.value = lastAns / 100;}
        }
        funcGroup[1] = () => { // 제곱근
            if(display2.value){
            display2.value = Math.sqrt(display2.value);
            } else {display2.value = Math.sqrt(lastAns);}
        }
        funcGroup[2] = () => { // 제곱
            if(display2.value){
                display2.value = display2.value*display2.value;
            } else {display2.value = lastAns*lastAns;}
        }
        funcGroup[3] = () => { // 역수
            if(display2.value){
                display2.value = display2.value!=0?1/display2.value:display2.value;
            } else {display2.value = lastAns!=0?1/lastAns:lastAns}
        }
        funcGroup[4] = () => { //비우기
            display2.value = null;
        }
        funcGroup[5] = () => { //전체 비우기
            while(calculatorStack.pop());
            display2.value = null;
            lastAns = null;
        }
        funcGroup[6] = () => { // 지우기
            if(display2.value){
            display2.value = String(display2.value).length===1? null : parseFloat(String(display2.value).slice(0,-1));
            } else {calculatorStack.pop();}
        }
        funcGroup[7] = () => { // 나누기
            calStackPush('/');
        }
        funcGroup[8] = () => {
            const a = 7;
            display2.value = parseFloat(display2.value===0? display2.value + a : String(display2.value).concat(a));
        }
        funcGroup[9] = () => {
            const a = 8;
            display2.value = parseFloat(display2.value===0? display2.value + a : String(display2.value).concat(a));
        }
        funcGroup[10] = () => {
            const a = 9;
            display2.value = parseFloat(display2.value===0? display2.value + a : String(display2.value).concat(a));
        }
        funcGroup[11] = () => { // 곱하기
            calStackPush('*');
        }
        funcGroup[12] = () => {
            const a = 4;
            display2.value = parseFloat(display2.value===0? display2.value + a : String(display2.value).concat(a));
        }
        funcGroup[13] = () => {
            const a = 5;
            display2.value = parseFloat(display2.value===0? display2.value + a : String(display2.value).concat(a));
        }
        funcGroup[14] = () => {
            const a = 6;
            display2.value = parseFloat(display2.value===0? display2.value + a : String(display2.value).concat(a));
        }
        funcGroup[15] = () => { // 빼기
            calStackPush('-');
        }
        funcGroup[16] = () => {
            const a = 1;
            display2.value = parseFloat(display2.value===0? display2.value + a : String(display2.value).concat(a));
        }
        funcGroup[17] = () => {
            const a = 2;
            display2.value = parseFloat(display2.value===0? display2.value + a : String(display2.value).concat(a));
        }
        funcGroup[18] = () => {
            const a = 3;
            display2.value = parseFloat(display2.value===0? display2.value + a : String(display2.value).concat(a));
        }
        funcGroup[19] = () => { // 더하기
            calStackPush('+');
        }
        funcGroup[20] = () => { // +-
            if(display2.value){display2.value = parseFloat(String(display2.value).indexOf("-")===0? String(display2.value).slice(1) : "-"+display2.value )}
        }
        funcGroup[21] = () => {
            const a = 0;
            display2.value = parseFloat(display2.value===0? display2.value + a : String(display2.value).concat(a));
        }
        funcGroup[22] = () => {
            const a = ".";
            display2.value = String(display2.value).indexOf(a)===-1 ?  String(display2.value).concat(a) : display2.value;
        }
        funcGroup[23] = () => { // =
            display2.value = calculate();
        }
        function calStackPush(a){
            if(display2.value){ calculatorStack.push(parseFloat(display2.value)); }
            if(typeof calculatorStack[calculatorStack.length - 1] === "number"){calculatorStack.push(a);}
            display2.value = null;
        }
        function calculate(){
            let term = [];
            let answer = 0;
            calculatorStack.push(parseFloat(display2.value));
            calculatorStack.push("= ");
            display1.value = "";
            for(let i = 0; i<calculatorStack.length; i++){
                display1.value = display1.value + calculatorStack[i] + " ";
            } 
            while(calculatorStack.indexOf("*") !== -1 || calculatorStack.indexOf("/") !== -1){
                let operator = '';
                if(calculatorStack.indexOf("*") === -1) {operator = "/";}
                else if(calculatorStack.indexOf("/") === -1) {operator = ("*");}
                else {operator = calculatorStack.indexOf("*") < calculatorStack.indexOf("/") ? "*" : "/";}
                term = calculatorStack.slice(calculatorStack.indexOf(operator) - 1,calculatorStack.indexOf(operator)+2);
                answer = termCal(term);       
                while(term.pop());
                calculatorStack.splice(calculatorStack.indexOf(operator) - 1,3,answer);
                console.log(calculatorStack);
            }
            while(calculatorStack.indexOf("+") !== -1 || calculatorStack.indexOf("-") !== -1){
                let operator = '';
                if(calculatorStack.indexOf("+") === -1) {operator = ("-")}
                else if(calculatorStack.indexOf("-") === -1) {operator = ("+")}
                else {operator = calculatorStack.indexOf("+") < calculatorStack.indexOf("-") ? ("+") : ("-");}
                term = calculatorStack.slice(calculatorStack.indexOf(operator) - 1,calculatorStack.indexOf(operator)+2);
                answer = termCal(term);       
                while(term.pop());
                calculatorStack.splice(calculatorStack.indexOf(operator) - 1,3,answer);
                console.log(calculatorStack);
            }
            calFlag = true;
            return calculatorStack[0];
            function termCal(term){
                switch (term[1]) {
                    case '+':
                        return parseFloat(term[0]) + parseFloat(term[2]);
                    case '-':
                        return parseFloat(term[0]) - parseFloat(term[2]);
                    case '*':
                        return parseFloat(term[0]) * parseFloat(term[2]);
                    case '/':
                        return parseFloat(term[0]) / parseFloat(term[2]);
                    default:
                        return false;
                }
            }
        }
    }
    function defaultStyle(style){
        if(style){
            let form = box.getElementsByTagName("form")[0];
            let table = form.getElementsByTagName("table")[0];
            form.style.width = "100%";
            form.style.height = "100%";
            form.style.background = "#ccc";
            form.style.padding = "10px"
            form.style.boxSizing = "border-box";
            display1.style.width = "100%";
            display1.style.height = "36px";
            display1.style.background = "#000";
            display1.style.color = "#fff";
            display1.style.margin = "0";
            display1.style.textAlign = "right";
            display1.style.fontSize = "16px";
            display1.style.boxSizing = "border-box";
            display1.style.border = "none";
            display1.style.padding = "0 20px";
            display2.style.width = "100%";
            display2.style.height = "40px";
            display2.style.background = "#000";
            display2.style.color = "#fff";
            display2.style.margin = "0";
            display2.style.textAlign = "right";
            display2.style.fontSize = "20px";
            display2.style.boxSizing = "border-box";
            display2.style.border = "none";
            display2.style.padding = "0 20px";
            table.style.width = "100%";
            table.style.height = "calc(100% - 90px)";
            table.style.padding = "10px 0 0 0";
            table.style.tableLayout = "fixed";
            for(let i = 0, j = 0; i < boxCell.length; i++){
                console.log(boxCell[i][j].children[0]);
                switch (j) {
                    case 0:
                        boxCell[i][j].children[0].style.width = "100%";
                        boxCell[i][j].children[0].style.height = "100%";
                        boxCell[i][j].children[0].style.border = "none";
                        boxCell[i][j].children[0].style.background = "#eee";                        
                        j++;
                    case 1:
                        boxCell[i][j].children[0].style.width = "100%";
                        boxCell[i][j].children[0].style.height = "100%";
                        boxCell[i][j].children[0].style.border = "none";
                        boxCell[i][j].children[0].style.background = "#eee";                        
                        j++;
                    case 2:
                        boxCell[i][j].children[0].style.width = "100%";
                        boxCell[i][j].children[0].style.height = "100%";
                        boxCell[i][j].children[0].style.border = "none";
                        boxCell[i][j].children[0].style.background = "#eee";                        
                        j++;
                    case 3:
                        boxCell[i][j].children[0].style.width = "100%";
                        boxCell[i][j].children[0].style.height = "100%";
                        boxCell[i][j].children[0].style.border = "none";
                        boxCell[i][j].children[0].style.background = "#eee";                        
                        j = 0;
                }
            }
        } else return false;
        createCellThema(id,'#fff',[8,9,10,12,13,14,16,17,18,21]);
    }
}
//------------------------------------------------------------------------------
// 각종 스타일용 함수
function createCellThema(id,Thema,nums){
    const box = document.getElementById(id).querySelector("table>tbody");
    let cols = [];
    let rows = [];
    if(Array.isArray(nums)) {
    for(let i = 0; i < nums.length; i++){
        if(typeof(nums[i])!=="number"){return false}
        cols.push(Math.floor(nums[i] / box.children[0].children.length));
        rows.push(nums[i] % box.children[0].children.length);
    }} else if(typeof(nums)==="number"){
        cols.push(Math.floor(nums / box.children[0].children.length));
        rows.push(nums % box.children[0].children.length);
    } else return false;
    for(let i = 0; i < cols.length; i++){
        box.children[cols[i]].children[rows[i]].children[0].style.background = Thema;
    }
}
