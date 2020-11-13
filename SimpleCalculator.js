function calculatorGenerate(id,width,height){ // 계산기 생성 함수
    let calFlag = false;
    const box = document.getElementById(id);
    const calForm = document.createElement("form");
    box.appendChild(calForm);
    let calculatorStack = [];
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
//----------------------------------------------------------------
    function createDisplay(){ // input 생성
        const display = document.createElement("input");
        display.setAttribute("type", "text");
        display.setAttribute("class", "scDisplay");
        display.setAttribute("readonly", "readonly");
        display.value = 0;
        calForm.appendChild(display);
        return display;
    }
    function UpperDisplayAction(display){ //위의 디스플레이 설정
        if(calFlag) {return true;}
        display.value = "";
        console.log(calculatorStack);
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
                        display2.value = "0";
                    }
                    console.log(i*boxCell[i].length + j);
                    funcGroup[i*boxCell[i].length + j]();
                    UpperDisplayAction(display1);
                })
            }
        }
        funcGroup[0] = () => {
            display2.value = display2.value / 100;
        }
        funcGroup[1] = () => {
            display2.value = Math.sqrt(display2.value);
        }
        funcGroup[2] = () => {
            display2.value = display2.value*display2.value;
        }
        funcGroup[3] = () => {
            display2.value = display2.value!=0?1/display2.value:display2.value;
        }
        funcGroup[4] = () => {
            display2.value = 0;
        }
        funcGroup[5] = () => {
            while(calculatorStack.pop());
            display2.value = 0;
        }
        funcGroup[6] = () => {
            display2.value = parseFloat(String(display2.value).length===1? 0 : String(display2.value).slice(0,-1));
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
            const a = "-";
            display2.value = parseFloat(String(display2.value).indexOf(a)===0? String(display2.value).slice(1) : a+display2.value )
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
            calculatorStack.push(parseFloat(display2.value));
            calculatorStack.push(a);
            display2.value = 0;
        }
        function calculate(){
            // let answer = parseFloat(display2.value);
            // let term = "";
            // display1.value = display1.value + display2.value + " =";
            // while(calculatorStack.length){
            //     term = calculatorStack.pop();
            //     if(term === "+"){
            //         term = calculatorStack.pop();
            //         answer += parseFloat(term);
            //     } else if(term === "-"){
            //         term = calculatorStack.pop();
            //         answer = parseFloat(term) - answer;
            //     } else if(term === "*"){
            //         term = calculatorStack.pop();
            //         answer *= parseFloat(term);
            //     } else if(term === "/"){
            //         term = calculatorStack.pop();
            //         console.log(term);
            //         answer = parseFloat(term) / answer;
            //     }
            // }
            // calFlag = true;
            // return answer;
        }
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