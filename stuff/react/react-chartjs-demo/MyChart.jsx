function MyChart({ data }) {
	const canvasRef = useRef(null);
	const [chart, setChart] = useState();
	const [canvasWidth, setCanvasWith] = useState(400);
	const [canvasHeight, setCanvasHeight] = useState(400);

	useEffect(() => {
		if (data) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');

			if (!chart) return setChart(new Chart(ctx, config));

			chart.data.datasets.forEach(dataset => {
				dataset.data = data;
			});

			chart.update();
		}
	}, [data]);

	return (
		<div className="canvas-container">
			<canvas ref={canvasRef} />
		</div>
	);
}
