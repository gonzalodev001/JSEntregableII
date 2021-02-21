var contenido = document.querySelector('#contenido')
const metas = document.getElementsByName('api-key')
const API_KEY = metas[0].getAttribute("content")

//Busca los términos al presionar el botón Buscar.
function btnSearch(){
    let btn = document.getElementById('btnSearch');
    btn.addEventListener("click", () => {
        let input = document.getElementById('terms');
        if(input.value === " "){
            lastNews();
        }else{
            document.querySelector('#top-news h2').textContent = "Resultados";
            let url = `https://api.currentsapi.services/v1/search?keywords=${input.value}&apiKey=${API_KEY}`;
            let request = new Request(url);
            getData(request);
            document.querySelector('#terms').value = "";
        }
        
    })
}

function lastNews(){
    let url = `https://api.currentsapi.services/v1/latest-news?apiKey=${API_KEY}`;
    let request = new Request(url);
    document.querySelector('#top-news h2').textContent = "Top Noticias";
    getData(request);
}

function byLanguage(lang){
    let abbreviation = lang.value;
    let url = `https://api.currentsapi.services/v1/latest-news?language=${lang.value}&apiKey=${API_KEY}`;
    let request = new Request(url);
    languages(abbreviation);
    getData(request);
}

function languages(abbreviation){
    var url = 'https://api.currentsapi.services/v1/available/languages'
    var request = new Request(url);
    fetch(request)
    .then(response => response.json())
    .then(data => {
        let languages = data.languages;
        for (var le in languages){
            if(languages[le] === abbreviation){
                document.querySelector('#top-news h2').textContent = "Top Noticias en " + le ;
            }
        }
    });
}

//Busca los términos al presionar intro.
function bySearch(){
    let input = document.getElementById("terms");
    input.addEventListener("keypress", (e) => {
        if(e.code === "Enter"){
            e.preventDefault();
            if(input.value === " "){
                lastNews();
            }else{
                document.querySelector('#top-news h2').textContent = "Resultados";
                let url = `https://api.currentsapi.services/v1/search?keywords=${input.value}&apiKey=${API_KEY}`;
                let request = new Request(url);
                getData(request);
                document.querySelector('#terms').value = "";
            }
            
        }
    });
}

function getData(request){
    contenido.innerHTML ="";
    fetch(request)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < 6; i++){
            drawNews(data.news[i]);
        }
    })
}

const drawNews = news => {
    const noticia = `
    <div class="col-lg-4 col-md-6">
        <div class="card h-100">
            <div class="single-post post-style-2 post-style-3">
                <div class="blog-info">
                    <h6 class="pre-title"><a href="#"><b>${news.author}</b></a></h6>
                    <h4 class="title">
                        <a href="${news.url}">
                            <b>${news.title}</b>
                        </a>
                    </h4>
                    <div class="post-footer">
                        <span><p>Published: ${news.published.slice(0,10)}</p></span>
                        <span><p>country: ${news.language.toUpperCase()}</p></span>
                    </div>
                </div><!-- blog-info -->
            </div><!-- single-post -->
        </div><!-- card -->
    </div>
    `;
    contenido.insertAdjacentHTML('beforeEnd', noticia);
}

lastNews();
bySearch();
btnSearch();