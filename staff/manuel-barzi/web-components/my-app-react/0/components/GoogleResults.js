// class GoogleResults extends Component {
//     constructor(results) {
//         super(`<section class="results">
//     </section>`)

//         if (results.length) {
//             const list = document.createElement('ul')

//             results.forEach(({ title, content, link }) => {
//                 const item = document.createElement('li')

//                 const _link = document.createElement('a');
//                 _link.href = link;
//                 _link.target = '_blank';
//                 _link.innerText = title;

//                 item.append(_link);

//                 const _content = document.createElement('p')
//                 _content.innerText = content

//                 item.append(_content)

//                 list.append(item)
//             })

//             this.container.append(list)
//         } else this.container.append(new Feedback('sorry, no results :(', 'warning').container)
//     }
// }