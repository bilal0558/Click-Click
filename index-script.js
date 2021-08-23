function startGame() {
    var time = document.forms["startForm"]["time-field"].value;
    if (time == "") {
      alert("Enter the Duration of the Game !");
      return false;
    }
    localStorage["time"] = time;
}