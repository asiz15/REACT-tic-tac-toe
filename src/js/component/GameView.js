import React, { useState } from "react";
import { Pick } from "./Pick";
import { Play } from "./Play";

const playersSchema = {
	playerX: null,
	playerO: null
};

export const GameView = () => {
	const [step, setStep] = useState("pick");
	const [players, setPlayers] = useState(playersSchema);
	const [turn, setTurn] = useState("X");

	function startGame() {
		setStep("playing");
	}
	return (
		<div>
			<h2>Tic tac toe React</h2>
			{step}
			<div>
				{step === "pick" ? (
					<Pick
						players={players}
						setPlayers={setPlayers}
						start={startGame}></Pick>
				) : (
					<Play
						players={players}
						turn={turn}
						setTurn={setTurn}></Play>
				)}
			</div>
		</div>
	);
};
