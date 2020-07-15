module.exports = () => {

    return `<section class="stickies">
                <h1>Add Sticky</h1>

                <form action="/add-sticky" id="textarea" method='POST'>
                    Title: <input type="text" name="title">
                    
                    <button>Submit</button>
                </form>
                <br>
                <textarea rows="4" cols="50" name="comment" form="textarea" placeholder="Enter text here..."></textarea>
            </section>`

} 