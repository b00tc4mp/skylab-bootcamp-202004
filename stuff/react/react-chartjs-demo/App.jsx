const { useState, useRef, useEffect } = React;

function App() {
	const [data, setData] = useState();

	const handleClick = e => {
		e.preventDefault();

		const newData = [];

		for (let i = 0; i < 6; i++) {
			newData.push(Math.floor(Math.random() * 30) + 1);
		}

		setData(newData);
	};

	return (
		<div>
			<h1>ChartJS demo</h1>
			<button onClick={handleClick}> Click Me! </button>
			<MyChart data={data} />
		</div>
	);
}
