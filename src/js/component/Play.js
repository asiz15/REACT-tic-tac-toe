import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Confetti from "react-confetti";

export const Play = ({ players, turn, setTurn }) => {
	const boardSchema = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];
	const [board, setBoard] = useState(boardSchema);
	const [winner, setWinner] = useState({
		arr: [],
		is: false,
		turn: null
	});

	useEffect(() => {
		console.log("board has changes!");
	}, [board]);

	const selectCell = (row, cell) => {
		let matrix = [...board];
		matrix[row].splice(cell, 1, turn);
		setBoard(matrix);

		if (check.row(row).is) {
			setWinner({
				arr: [
					[row, 0],
					[row, 1],
					[row, 2]
				],
				is: true,
				turn: turn
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
				is: true,
				turn: turn
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
				is: true,
				turn: turn
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
				is: true,
				turn: turn
			});
		}

		switchTurn();
	};
	const clearBoard = () => {
		setBoard(boardSchema);
		setWinner({
			arr: [],
			is: false,
			turn: null
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
		<div className="p-0 m-0">
			{!winner.is && <h3>It is {turn} turn!</h3>}
			{winner.is && (
				<Confetti width={1900} height={900} initialVelocityY={10} />
			)}
			{winner.is && winner.turn !== null && (
				<div className="alert alert-success p-4 mb-3" role="alert">
					<span style={{ fontSize: "2em" }}>
						{players[`player${winner.turn}`]} ({winner.turn}) wins!
					</span>
					<div className="w-100 text-center mt-3">
						<button
							className="btn btn-primary"
							onClick={clearBoard}>
							Play again
						</button>
					</div>
				</div>
			)}
			<div className="board pb-5 px-3" style={{ width: "600px" }}>
				{board.map((row, rowIndex) => {
					return (
						<div className="row" key={rowIndex}>
							{row.map((cell, index) => {
								return (
									<button
										disabled={cell !== null || winner.is}
										className={`col-4 cell ${
											check.winnerCell(rowIndex, index)
												? "cell--winner"
												: ""
										}`}
										key={index}
										onClick={() =>
											selectCell(rowIndex, index)
										}>
										<span>{cell}</span>
									</button>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};

Play.propTypes = {
	players: PropTypes.object,
	turn: PropTypes.string,
	setTurn: PropTypes.func
};
