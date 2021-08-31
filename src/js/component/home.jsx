import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { GameView } from "./GameView";

//create your first component
const Home = () => {
	return (
		<div
			className="bg-dark pt-5 m-0 d-flex column justify-content-center text-white"
			style={{ width: "100vw", minHeight: "100vh" }}>
			<GameView></GameView>
		</div>
	);
};

export default Home;
