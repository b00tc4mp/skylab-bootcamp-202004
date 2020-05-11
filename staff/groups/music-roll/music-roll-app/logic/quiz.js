

function quiz() {
  const {musicStyles = [] } = user
    

  
  const style = document.getElementById("style").innerText;

  const index = musicStyles.indexOf(style);

  if (index < 0 && musicStyles.length < 3) {
    musicStyles.push(style);
  } else {
    musicStyles.splice(index, 1);
  }

  call('POST', )

}
