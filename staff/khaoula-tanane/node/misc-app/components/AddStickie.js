module.exports = feedback => {
    return `<section class = "add-stickie">
    <h2>Add Sticky</h2>
    <form action="/add-stickie" method="POST" id="textarea">
      Tag: <input type="text" name="tag" placeholder="tag">
      <input type="submit">
    </form>
    <br>
    <textarea rows="4" cols="30" name="message" form="textarea" placeholder='Introduce your sticky!!!'></textarea>
    ${feedback?feedback:''}
</section>
    `
}