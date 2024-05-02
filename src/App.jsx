import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [characterAllowed, setCharacterAllowed] = useState(false);
	const [password, setPassword] = useState("");

	const passwordRef = useRef();

	const passwordGenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

		if (numberAllowed) {
			str += "0123456789";
		}
		if (characterAllowed) {
			str += "@#$&*?";
		}

		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);

			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [length, numberAllowed, characterAllowed, setPassword]);

	useEffect(() => {
		passwordGenerator();
	}, [length, numberAllowed, characterAllowed, passwordGenerator]);

	const copyToClipBoard = useCallback(()=>{
		passwordRef.current?.select();
		window.navigator.clipboard.writeText(password)
	},[password])

	return (
		<>
			<section className="container">
				<section className="head-section">
					<h1>Password Generator</h1>
				</section>
				<section className="body-section">
					<div className="top">
						<input
							type="text"
							value={password}
							placeholder="Password"
							readOnly
							className="input-bar"
							ref={passwordRef}
						/>
						<button className="copy-button"
							onClick={copyToClipBoard}
						>Copy</button>
					</div>
					<div className="bottom">
						<div>
							<input
								type="range"
								min={8}
								max={30}
								value={length}
								onChange={(e) => {
									setLength(e.target.value);
								}}
								className="range-input"
							/>
							<label>Length:{length}</label>
						</div>
						<div>
							<input
								type="checkbox"
								defaultChecked={numberAllowed}
								onChange={(e) => {
									setNumberAllowed((prev) => !prev);
								}}
								className="range-input"
							/>
							<label>Number</label>
						</div>
						<div>
							<input
								type="checkbox"
								defaultChecked={characterAllowed}
								onChange={(e) => {
									setCharacterAllowed((prev) => !prev);
								}}
								className="range-input"
							/>
							<label>Special Character</label>
						</div>
					</div>
				</section>
			</section>
		</>
	);
}

export default App;
