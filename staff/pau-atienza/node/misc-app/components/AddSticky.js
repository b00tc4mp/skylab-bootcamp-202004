module.exports = () => `<section class = "add-sticky">
    <h2>Add Sticky</h2>
    <form action="/add-sticky" method="POST" id="textarea">
      Tag: <input type="text" name="tag" placeholder="e.g. idea, task, etc. or the name of the sticky">
      <input type="submit">
    </form>
    <br>
    <textarea rows="4" cols="50" name="comment" form="textarea" placeholder='Introduce your sticky!!!'></textarea>
    <br>
    <a href = '/stickies'>Stickies</a>
</section>`