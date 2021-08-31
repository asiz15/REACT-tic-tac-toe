import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Play = ({ players, turn, setTurn }) => {
	const boardSchema = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];
	const [board, setBoard] = useState(boardSchema);
	const [winner, setWinner] = useState({
		arr: [],
		is: false
	});

	useEffect(() => {
		console.log("board has changes!");
	}, [board]);

	const selectCell = (row, cell) => {
		let matrix = [...board];
		matrix[row].splice(cell, 1, turn);
		setBoard(matrix);

		if (check.row(row).is) {
			console.log("There is a winner Row");
			setWinner({
				arr: [
					[row, 0],
					[row, 1],
					[row, 2]
				],
				is: true
			});
		}
		if (check.column(cell).is) {
			console.log("There is a winner Col");
			setWinner({
				arr: [
					[0, cell],
					[1, cell],
					[2, cell]
				],
				is: true
			});
		}
		if (check.diagonal1()) {
			console.log("There is a winner Diagonal 1");
			setWinner({
				arr: [
					[0, 0],
					[1, 1],
					[2, 2]
				],
				is: true
			});
		}
		if (check.diagonal2()) {
			console.log("There is a winner Diagonal 2");
			setWinner({
				arr: [
					[2, 0],
					[1, 1],
					[0, 2]
				],
				is: true
			});
		}

		//switchTurn();
	};
	const clearBoard = () => {
		setBoard(boardSchema);
		setWinner({
			arr: [],
			is: false
		});
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
		},
		diagonal1: function() {
			return diagonal1().every(cell => cell === turn);
		},
		diagonal2: function() {
			return diagonal2().every(cell => cell === turn);
		},
		winnerCell: function(row, col) {
			const maped = winner.arr.map(coords => coords.join(""));
			const arr = [row, col].join("");
			console.log(
				`Es ganadora ${maped.some(coord => coord === arr)}, ${arr}`
			);

			return maped.some(coord => coord === arr);
		}
	};
	const diagonal1 = () => {
		return board.map((row, index) => row[index]);
	};
	const diagonal2 = () => {
		return board.map((row, index) => row[board.length - 1 - index]);
	};

	return (
		<div className="board pb-5" style={{ width: "600px" }}>
			Turno {turn}
			<button className="btn btn-primary" onClick={clearBoard}>
				Clear board
			</button>
			Winner : {JSON.stringify(winner)}
			{board.map((row, rowIndex) => {
				return (
					<div className="row" key={rowIndex}>
						{row.map((cell, index) => {
							return (
								<button
									disabled={cell !== null}
									className={`col-4 cell ${
										check.winnerCell(rowIndex, index)
											? "cell--winner"
											: ""
									}`}
									key={index}
									onClick={() => selectCell(rowIndex, index)}>
									<span>
										{check.winnerCell(rowIndex, index)
											? "G"
											: ""}
									</span>
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
