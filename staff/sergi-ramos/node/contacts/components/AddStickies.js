module.exports = () => {


    return `<section class="stickies">
<h1>Add Sticky</h1>

<form action="/add-sticky" id="usrform" method='POST'>
  Name: <input type="text" name="name">
  <input type="submit">
</form>
<br>
<textarea rows="4" cols="50" name="comment" form="usrform">
Enter text here...</textarea>`
}