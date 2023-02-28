import {Component} from '@angular/core';
import {KEYS} from "./mock_key";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  input: string = '';
  result: string = '';
  keys = KEYS;

  memory: string = '';
  yummyMemory: string = '';
  arrMess: string[] = [];


  getLastOperand() {
    let pos: number;
    console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
    console.log('Last ' + this.input.substring(pos + 1))
    return this.input.substring(pos + 1)
  }

  pressNum(num: any) {
    if (num == 'M+') {
      let x = Number(this.input)
      console.log('x:' + x)
      this.memory = (Number(this.memory) + x).toString();
      console.log('m:' + this.memory)
      this.yummyMemory = this.memory;
      return;
    }
    if (num == 'M-') {
      let x = Number(this.input)
      console.log('x:' + x)
      this.memory = (Number(this.memory) - x).toString();
      console.log('m:' + this.memory)
      this.yummyMemory = this.memory;
      return;
    }
    if (num == "MS") {
      this.memory = this.result;
      return;
    }
    if (num == "MR") {
      this.input = this.memory;
      this.result = this.memory;
      console.log(this.memory);
      return;
    }
    if (num == "MC") {
      this.input = '';
      this.result = '0';
      this.memory = '';
      this.yummyMemory='';
      return;
    }

    if (num == "C") {
      this.clearAll()
      return;
    }
    if (num == "CE") {
      this.clear()
      return;
    }
    if (num == ".") {
      if (this.input != "") {

        const lastNum = this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }
    if (this.input.length < 1 && (num === '/' || num === '*')) {
      return;
    }
    if (num == "0") {
      if (this.input == "") {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
        return;
      }
    }

    if(num=='%'){
      // let yumRs = (Math.round(parseFloat(this.input)) / 100);
      this.result=(1/Number(this.input)).toString()
      return;
    }
    if(num == '+'){
      this.input=this.result;
    }
    // if (num === '+/-') {
    //   if (!this.input.startsWith('-') && this.input.length == 1) {
    //     this.input = '-' + this.input;
    //     return;
    //   } else if (this.input.startsWith('-') && this.input.length == 2) {
    //     this.input = this.input.substring(1);
    //     return;
    //   } else if (this.input.length >= 3) {
    //     if (this.input.substring(this.input.length - 1) === ')') {
    //       this.input = this.input.substring(0, this.input.length - 4) + this.input.charAt(this.input.length - 2)
    //     } else {
    //       this.input = this.input.substring(0, this.input.length - 1) + '(-' + this.input.substring(this.input.length - 1) + ')';
    //     }
    //     this.calculate();
    //     return;
    //   }
    // }

    this.input = this.input + num
    this.calculate();
  }

  calculate() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substring(0, formula.length - 1);
    }

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
      formula = formula.substring(0, formula.length - 1);
    }

    // if (lastKey === '%') {
    //   this.result = ((Math.round(parseFloat(this.input)) / 100)).toString();
    // }
    console.log("Formula " + formula);
    this.result = eval(formula);
  }

  getAnswer() {
    this.calculate();
    this.input = this.result;
    if (this.input == "0") this.input = "";
  }


  clearAll() {
    this.input = '';
    this.result = '0';
  }

  clear() {
    if (this.input != '') {
      this.input = this.input.substring(0, this.input.length - 1);
    }
  }

  clearHistoryMem() {
    this.yummyMemory = '';
    this.result = '0';
  }

}
