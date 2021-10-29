// I think the easiest way to store all of the inputs and functions and initiate an empty calculator is a class

class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
        this.previousOperationTextElement = previousOperationTextElement
        this.currentOperationTextElement = currentOperationTextElement
        this.clear()
    }

    //remove all properties
    clear() {
        this.currentOperation = ''
        this.previousOperation = ''
        this.operation = undefined
        $('button').click(function(){
            $('.putersPutin').empty();
        });
    }

    //append number selected to results output
    appendNumber(number) {
        this.currentOperation = this.currentOperation.toString() + number.toString()
    }

    //allow for chaining of operations, compute values as operations selected and prepend to results output
    chooseOperation(operation) {
        if (this.currentOperation === '') return
        if (this.previousOperation !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperation = this.currentOperation
        this.currentOperation = ''

    }

    //do math stuff according to operation case, generate result
    compute() {
        let putersPutin
        const prev = parseFloat(this.previousOperation)
        const current = parseFloat(this.currentOperation)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                putersPutin = prev + current
                break
            case '-':
                putersPutin = prev - current
                break
            case '*':
                putersPutin = prev * current
                break
            case '/':
                putersPutin = prev / current
                break
            case '^':
                putersPutin = prev ** current
                break
            default:
                return
        }
        this.currentOperation = putersPutin
        this.operation = undefined
        this.previousOperation = ''
        $('.putersPutin').text(putersPutin);
    }

    //convert number to delimited display value
    getDisplayNumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }

    //concatenate previous operation and current operation in the results output
    updateDisplay() {
        this.currentOperationTextElement.innerText = 
            this.getDisplayNumber(this.currentOperation)
        if (this.operation != null) {
            this.previousOperationTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`
        } else {
            this.previousOperationTextElement.innerText = ''
        }
    }
}

    // variable selectors for all UI elements

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const previousOperationTextElement = document.querySelector('[data-previous-operation]')
const currentOperationTextElement = document.querySelector('[data-current-operation]')

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement)

// loop over all buttons to add event listener i.e click on button and do something
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
});
})
