(function () {
  const BASE_URL = "https://movie-list.alphacamp.io"
  const INDEX_URL = 'https://movie-list.alphacamp.io/api/v1/movies/'
  const POSTER_URL = "https://movie-list.alphacamp.io/posters/"
  let rawData = []
  const dataPanel = document.querySelector('#data-panel')
  const nav = document.querySelector('#nav')

  const genresName = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  let navHTML = ``
  for (let i in genresName) {
    navHTML += `
        <li class="nav-item">
      <a class="nav-link" href="#" data-id = "${i}">${genresName[i]}</a>
    </li>`
  }
  nav.innerHTML = navHTML

  axios.get(INDEX_URL)
    .then((response) => {
      rawData = response.data.results
      displayDataList(rawData)
    })

  nav.addEventListener("click", (event) => {
    const genreId = event.target.dataset.id
    const filterdata = filterDataList(genreId)
    displayDataList(filterdata)
  })

  function filterDataList(genresNumber) {
    const genresId = Number(genresNumber)
    console.log(genresId)
    const result = rawData.filter(item => item.genres.includes(genresId))
    return result
  }

  function displayDataList(dataList) {
    let htmlContent = ''
    dataList.forEach(item => {
      htmlContent += `
      <div class ="col-sm-4">
        <div class="card">
          <img src="${POSTER_URL}${item.image}" class="card-img-top" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h6 class = "card-title">${item.title}</h6>
             ${displayGenresItems(item.genres)}
          </div>
        </div>
      </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  function displayGenresItems(array) {
    let genresItems = ``
    array.forEach(i => {
      genresItems += `<h6><span class="badge badge-secondary">${genresName[i]}</span></h6>`
    })
    return genresItems
  }
})()