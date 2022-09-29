import React, { useReducer } from 'react'
import './Calculator.css'
import DigitButtons from './DigitButtons'
import OperationButtons from './OperationButtons'

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}
function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.override) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    override: false,
                }
            }
            if (payload.digit === "0" && state.currentOperand === "0") return state
            if (payload.digit === "." && state.currentOperand.includes('.')) return state
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.DELETE_DIGIT:
            if (state.override) {
                return {
                    ...state,
                    override: false,
                    currentOperand: null
                }
            }
            if (state.currentOperand == null) return state
            if (state.currentOperand.length === 1) {
                return { ...state, currentOperand: null }
            }
            return{
                ...state,
                currentOperand:state.currentOperand.slice(0,-1)
            }
        case ACTIONS.CHOOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null
            }
        case ACTIONS.EVALUATE:
            if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
                return state
            }
            return {
                ...state,
                override: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state)
            }

    }
}
function evaluate({ currentOperand, previousOperand, operation }) {
    let current = parseFloat(currentOperand)
    let previous = parseFloat(previousOperand)
    if (isNaN(previous) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
        case "+":
            computation = previous + current
            break;
        case "-":
            computation = previous - current
            break;
        case "*":
            computation = previous * current
            break;
        case "÷":
            computation = previous / current
            break;
    }
    return computation.toString()
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
    maximumFractionDigits:0,
})
function formatOperand(operand){
    if(operand == null) return
    const [integer,decimal] = operand.split(".")
    if(decimal==null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
export default function Calculator() {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
    return (
        <div className='calculator'>
            <div className='calculator-grid'>
                <div className='output'>
                    <div className='previous-operand'>
                        {formatOperand(previousOperand)} {operation}
                    </div>
                    <div className='current-operand'>
                        {formatOperand(currentOperand)}
                    </div>
                </div>
                <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
                <button onClick={()=>dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
                <OperationButtons operation="÷" dispatch={dispatch} />
                <DigitButtons digit="1" dispatch={dispatch} />
                <DigitButtons digit="2" dispatch={dispatch} />
                <DigitButtons digit="3" dispatch={dispatch} />
                <OperationButtons operation="*" dispatch={dispatch} />
                <DigitButtons digit="4" dispatch={dispatch} />
                <DigitButtons digit="5" dispatch={dispatch} />
                <DigitButtons digit="6" dispatch={dispatch} />
                <OperationButtons operation="+" dispatch={dispatch} />
                <DigitButtons digit="7" dispatch={dispatch} />
                <DigitButtons digit="8" dispatch={dispatch} />
                <DigitButtons digit="9" dispatch={dispatch} />
                <OperationButtons operation="-" dispatch={dispatch} />
                <DigitButtons digit='.' dispatch={dispatch} />
                <DigitButtons digit="0" dispatch={dispatch} />
                <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
            </div>
        </div>
    )
}
