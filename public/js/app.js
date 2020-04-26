// alert('kllsjdkljsdl')
function searchByName(event) {
  event.preventDefault();
  $.get('/digimon/search/name/' + event.target.name.value).then((data) =>
    newDigimon(data)
  );
}
function searchByLevel(event) {
  event.preventDefault();
  $.get('/digimon/search/level/' + event.target.level.value).then((data) =>
    newDigimon(data)
  );
}

function newDigimon(newData) {
  $('#digimons').empty();
  newData.forEach((element) => {
    let templete = document.getElementById('html').innerHTML;
    var rendered = Mustache.render(templete, {
      name: element.name,
      level: element.level,
      img: element.img,
    });
    $(rendered).appendTo('#digimons');
  });
}
