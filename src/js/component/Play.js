import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Play = ({ players, turn, setTurn }) => {
	const boardSchema = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];
	const [board, setBoard] = useState(boardSchema);

	useEffect(() => {
		console.log("board has changes!");
	}, [board]);

	const selectCell = (row, cell) => {
		let matrix = [...board];
		matrix[row].splice(cell, 1, turn);
		setBoard(matrix);

		if (check.row(row).is) {
			console.log("There is a winner Row");
		}
		if (check.column(cell).is) {
			console.log("There is a winner Col");
		}
		if (check.diagonals(cell)) {
			console.log("There is a winner Diagonal");
		}

		switchTurn();
	};
	const clearBoard = () => {
		setBoard(boardSchema);
	};
	const switchTurn = () => {
		turn === "X" ? setTurn("O") : setTurn("X");
	};
	const check = {
		row: function(r) {
			return {
				is: board[r].every(cell => cell === turn),
				rowIndex: r
			};
		},
		column: function(col) {
			const column = board.map(row => row[col]);
			return {
				is: column.every(cell => cell === turn),
				colIndex: col
			};
		},
		diagonals: function() {
			return (
				diagonal1().every(cell => cell === turn) ||
				diagonal2().every(cell => cell === turn)
			);
		}
	};
	const diagonal1 = () => {
		return board.map((row, index) => row[index]);
	};
	const diagonal2 = () => {
		return board.map((row, index) => row[board.length - 1 - index]);
	};
	const checkWinner = () => {
		let winner = {
			is: false
		};
	};
	return (
		<div className="board pb-5" style={{ width: "600px" }}>
			Turno {turn}
			<button className="btn btn-primary" onClick={clearBoard}>
				Clear board
			</button>
			{JSON.stringify(diagonal1())}
			{JSON.stringify(diagonal2())}
			{board.map((row, rowIndex) => {
				return (
					<div className="row" key={rowIndex}>
						{row.map((cell, index) => {
							return (
								<button
									disabled={cell !== null}
									className={`col-4 cell ${
										index % 2 === 0 ? "cell--winner" : ""
									}`}
									key={index}
									onClick={() => selectCell(rowIndex, index)}>
									<span>{cell}</span>
								</button>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

Play.propTypes = {
	players: PropTypes.object,
	turn: PropTypes.string,
	setTurn: PropTypes.func
};
