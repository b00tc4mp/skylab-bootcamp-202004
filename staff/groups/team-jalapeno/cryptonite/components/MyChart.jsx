const { useState, useRef, useEffect } = React;

function MyChart({ data, name }) {
	const canvasRef = useRef();
	const [chart, setChart] = useState();
	const [canvasWidth, setCanvasWidth] = useState(1200);
	const [canvasHeight, setCanvasHeight] = useState(800);

	useEffect(() => {
		if (data) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			new Chart(ctx, config(data, name));
		}
	}, [data]);

	return (

		<div className="canvas-container">
			<canvas ref={canvasRef} width="400" height="200" />
		</div>
	);
}
