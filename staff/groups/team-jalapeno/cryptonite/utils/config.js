function config(_data, name) {

	return {
		type: 'line',
		data: {
			labels: new Array(200),
			datasets: [
				{
					label: `${name}`,
					data: _data,
					backgroundColor:
						'rgba(247, 206, 120, 0.2)',
					borderColor:
						'rgba(247, 206, 120)',
					borderWidth: 1,
				},
			],
		},
		options: {
			elements: {
				point: {
					radius: 0
				}
			},
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
					},
				],
				xAxes: [{
					display: false
				}]
			},
			mainAspectRatio: false,
			responsive: true,
			fill: false
		},
	}
}

