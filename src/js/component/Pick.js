import React from "react";
import PropTypes from "prop-types";

export const Pick = ({ players, setPlayers, start }) => {
	return (
		<div>
			<h3>Pick your weapon</h3>
			<div style={{ background: "#000000" }} className="p-4">
				<h5>Choose your weapon</h5>
				<div className="d-flex">
					<input
						className="form-control mr-3"
						placeholder="X"
						onInput={e =>
							setPlayers({ ...players, playerX: e.target.value })
						}></input>
					<input
						className="form-control"
						placeholder="O"
						onInput={e =>
							setPlayers({ ...players, playerO: e.target.value })
						}></input>
				</div>
				<div className="w-100 text-center mt-3">
					<button
						onClick={start}
						disabled={!players.playerX || !players.playerO}
						className="btn btn-primary">
						Start
					</button>
				</div>
			</div>
		</div>
	);
};

Pick.propTypes = {
	setPlayers: PropTypes.func,
	players: PropTypes.object,
	start: PropTypes.func
};
