const numbers = document.querySelectorAll('[data-numbers]');
const operations = document.querySelectorAll('[data-operations]');
const deleteButton = document.querySelector('[data-delete]');
const equal = document.querySelector('[data-equals]');
const reset = document.querySelector('[data-reset]');
const oldValueText = document.getElementById('previous_number');
const currentValueText = document.getElementById('current_number');
const percent = document.querySelector('[data-percent]');



class Calculator {

    constructor(oldValueText, currentValueText) {
        this.oldValueText = oldValueText
        this.currentValueText = currentValueText
        this.isFinalResult = false;
        this.clear()

    }


    clear() {
        this.actualOldValue = ''
        this.actualCurrentValue = ''
        this.operation = undefined

    }

    delete() {
        if (this.actualCurrentValue !== '')
            this.actualCurrentValue = this.actualCurrentValue.slice(0, -1);
    }

    contcatNumbers(number) {
        if (number === '.' && this.actualCurrentValue.includes('.')) return
        this.actualCurrentValue = this.actualCurrentValue + number;

    }
    choseOperations(operation) {
        if (this.actualCurrentValue === '') return
        if (this.actualOldValue !== '') {
            this.resolve();
        }
        this.operation = operation
        this.actualOldValue = this.actualCurrentValue
        this.actualCurrentValue = ''


    }

    showResult() {
        this.currentValueText.innerText = this.actualCurrentValue;
        if (this.operation != null) {
            this.oldValueText.innerText = `${this.actualOldValue} ${this.operation}`
        } else {
            this.oldValueText.innerText = ''
        }
    }

    resolve() {
        let result;
        let num1 = parseFloat(this.actualOldValue)
        let num2 = parseFloat(this.actualCurrentValue)
        if (isNaN(num1) || isNaN(num2)) {
            return false;
        }
        switch (this.operation) {
            case '-':
                result = num1 - num2;
                break;
            case '+':
                result = num1 + num2;
                break;
            case '÷':
                result = num1 / num2
                break
            case 'x':
                result = num1 * num2;
                break
            default:
                return
        }

        this.isFinalResult = true;
        this.actualCurrentValue = result;
        this.operation = undefined;
        this.actualOldValue = '';
        return true

    }

    percent() {
        let result;
        let num1 = parseFloat(this.actualCurrentValue)
        if (isNaN(num1)) {
            return
        }
        result = num1 / 100;
        this.actualCurrentValue = result;
        this.operation = undefined;
        this.actualOldValue = '';
    }


}


const calculator = new Calculator(oldValueText, currentValueText)

numbers.forEach(button => {
    button.addEventListener('click', () => {
        if (this.actualCurrentValue !== '' && this.actualOldValue === '' && this.isFinalResult) {
            this.actualCurrentValue = '';
            this.isFinalResult = false;
        }
        calculator.contcatNumbers(button.innerText);
        calculator.showResult()
    })
})

operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOperations(button.innerText)
        calculator.showResult()
    })
})

reset.addEventListener('click', () => {
    calculator.clear()
    calculator.showResult()

})

equal.addEventListener('click', () => {
    if (!calculator.resolve()) {
        return
    }
    calculator.showResult()


})

percent.addEventListener('click', () => {
    calculator.percent()
    calculator.showResult()

})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.showResult()

})