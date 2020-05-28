module.exports = () =>{
    
  return `<h1>Add Sticky</h1> 
<form action="/add-stickies" method="POST" id="usrform" >
  Name: <input type="text" name="usrname">
  <input type="submit">
</form>
<br>
<textarea rows="4" cols="50" name="comment" form="usrform">
Enter text here...</textarea>
`}