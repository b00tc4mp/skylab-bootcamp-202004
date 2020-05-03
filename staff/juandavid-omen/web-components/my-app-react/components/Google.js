// class Google extends Component {
//     constructor(message, level) {
//         super(`<section class="google">
//             <h2>Google</h2>
//         </section>`)

//         let _results

//         this.container.append(new Search(query => {
//             google(query, (error, results) => {
//                 if (error) throw error // TODO do something with error (feedback panel?) 

//                 if (!_results) {
//                     _results = new GoogleResults(results)

//                     this.container.append(_results.container)
//                 } else {
//                     const __results = _results

//                     _results = new GoogleResults(results)

//                     __results.container.replaceWith(_results.container)
//                 }
//             })
//         }).container)
//     }
// }

class Google extends Component {
    constructor(onSubmit) {
        super(`<section class="google">
            <h2>Google</h2>
        </section>`)

        let results;
        const _googleSearch = new SearchGoogle(query => {
            searchGoogle(query, (error, data) => {
                if (!results) {
                    results = new ResultsGoogle();

                    this.container.appendChild(results.container);
                } else {
                    const _results = results;

                    results = new ResultsGoogle(error, data);

                    _results.container.replaceWith(results.container);
                }
            });
        });
        this.container.appendChild(_googleSearch.container);

    };
};