import React, { useState } from 'react';
import styles from './App.module.css';

const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OPERATIONS = ['+', '-', '=', 'C'];

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [result, setResult] = useState(null);

	const handleNumberClick = (num) => {
		if (operator) {
			setOperand2(operand2 + num);
		} else {
			setOperand1(operand1 + num);
		}
	};

	const handleOperationClick = (operation) => {
		if (operation === 'C') {
			setOperand1('');
			setOperand2('');
			setOperator('');
			setResult(null);
		} else if (operation === '=') {
			if (operand1 && operand2 && operator) {
				const calculation = calculateResult(
					parseInt(operand1),
					parseInt(operand2),
					operator,
				);
				setResult(calculation);
			}
		} else {
			if (operand1) {
				setOperator(operation);
			}
		}
	};

	const calculateResult = (op1, op2, operator) => {
		switch (operator) {
			case '+':
				return op1 + op2;
			case '-':
				return op1 - op2;
			default:
				return null;
		}
	};

	const getDisplayValue = () => {
		if (result !== null) {
			return result;
		}
		return `${operand1} ${operator} ${operand2}`;
	};

	return (
		<div className={styles.calculator}>
			<div
				className={styles.display}
				style={{ color: result !== null ? '#2ecc71' : '#fff' }}
			>
				{getDisplayValue() || '0'}
			</div>
			<div className={styles.buttons}>
				<div className={styles.numbers}>
					{NUMS.map((num) => (
						<button key={num} onClick={() => handleNumberClick(num)}>
							{num}
						</button>
					))}
				</div>
				<div className={styles.operations}>
					{OPERATIONS.map((operation) => (
						<button
							key={operation}
							onClick={() => handleOperationClick(operation)}
							className={operation === 'C' ? styles.clear : ''}
						>
							{operation}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
