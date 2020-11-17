# SimpleCalculator

## How to Use this JS

1. Put the SimpleCalculator.js file in your html document
2. Create a box where you want the calculator to be created and call the function
  Call the function in window.onload or after the box you want to use as a calculator.

    ```javascript 
    calculatorGenerate("ID",width,height);
    ```
    >* "ID" is the ID of the box you want to be a calculator
    >* width and height are the desired calculator size, can only be entered in numbers and are calculated in px   
    >If the value is empty, a calculator that fits the size of the box is automatically created.

3. hange the design of the button
  Call the function in window.onload or after the box you want to use as a calculator.
    
    ```javascript 
    createCellThema("ID","background style",button key);
    ```
    >* "ID" is the ID of the box you want to be a calculator
    >* "background style" is written in a format that enters the background property of css   
    >The botton key is the number of the button you want to change the design of. Refer to the table below.   
    >If you want to change multiple buttons at the same time, enter the numbers in [].
      
      button key
      |||||
      |:---:|:---:|:---:|:---:|
      |0|1|2|3|
      |4|5|6|7|
      |8|9|10|11|
      |12|13|14|15|
      |16|17|18|19|
      |20|21|22|23|
  
감사합니다
