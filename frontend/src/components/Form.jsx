import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { useReducer } from "react";
import { normalInputs, labInputs } from "../constants";

const updateState = (state, action) => {
	switch (action.type) {
		case "UPDATE_FIELD":
			return { ...state, [action.field]: action.value };
		case "RESET":
			return action.initialState;
		default:
			return state;
	}
};

const initialState = {
	snapType: "Snapshot",
	photoNo: "",
	photoSize: "Stamp",
	quantity: 4,
	amount: 50,
	printMethod: "Normal",
	printType: "Glossy",
	deliveryType: "Non-Urgent",
	labPhotoSize: "3R",
	labQuantity: 1,
};

const Form = () => {
	const [state, dispatch] = useReducer(updateState, initialState);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(state),
			});

			const result = await response.json();

			if (!response.ok) {
				alert(`Error: ${result.message || "Failed to save photo details"}`);
				return;
			}

			alert("Success! " + result.message);
			dispatch({ type: "RESET", initialState });
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("An error occurred while submitting the form. Is the backend running?");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-[#222222] px-5 py-4 rounded-md text-[#cccccc] text-center w-5xl">
			{normalInputs.map((input, index) => (
				<div className="mb-5" key={index}>
					<label htmlFor={input.id} className="block mb-2">
						{input.label}
					</label>
					{input.type === "select" ? (
						<Select options={input.options} id={input.id} dispatch={dispatch} value={state[input.id]} />
					) : (
						<Input
							id={input.id}
							type={input.type}
							placeholder={input.placeholder}
							disabled={state.snapType === "Scan" && input.id === "photoNo"}
							dispatch={dispatch}
							value={state[input.id]}
						/>
					)}
				</div>
			))}

			{state.printMethod === "Lab" &&
				labInputs.map((input, index) => (
					<div className="mb-5" key={index}>
						<label htmlFor={input.id} className="block mb-2">
							{input.label}
						</label>
						{input.type === "select" ? (
							<Select options={input.options} id={input.id} dispatch={dispatch} value={state[input.id]} />
						) : (
							<Input
								id={input.id}
								type={input.type}
								placeholder={input.placeholder}
								dispatch={dispatch}
								value={state[input.id]}
							/>
						)}
					</div>
				))}
			<Button />
		</form>
	);
};

export default Form;
