import { useEffect, useRef } from "react";

const Navbar = () => {
	const incomeRef = useRef();
	useEffect(() => {
		const getTotalIncome = async () => {
			const response = await fetch("http://localhost:5000");
			const res = await response.json();
			incomeRef.current.innerHTML = res.data.totalAmount;
		};
		getTotalIncome();
	}, []);
	return (
		<div className="font-bold text-white mb-6 text-right w-5xl">
			Total Income: <span ref={incomeRef}>0</span>
		</div>
	);
};

export default Navbar;
