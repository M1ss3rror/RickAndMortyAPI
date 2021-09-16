character()

function character(pagina = 1, busqueda = false) {
    var url = (pagina != 1 && pagina != "") ? pagina.slice(47) : pagina
    let url_api_character = ""
    if (busqueda) {
        let buscar_name = document.getElementById("buscar").value
        url_api_character = "https://rickandmortyapi.com/api/character?name=" + buscar_name
        console.log(url_api_character)
    } else {
        url_api_character = "https://rickandmortyapi.com/api/character?page=" + url
    }
    let info_api = fetch(url_api_character)
    var contenedor_grid = document.getElementById("contenedor_p")
    contenedor_grid.innerHTML = ""
    var contenedor_paginador = document.getElementById("pagination")
    let btn_next = ""
    let btn_prev = ""


    //console.log(contenedor_paginador)

    //console.log(info_api)

    info_api.then(res => res.json())
        .then(data_api => {
            //console.log(data_api)
            for (const resultaditos of data_api.results) {
                estado = resultaditos.status
                if (estado == "Alive") {
                    estado = "vivo"
                } else {
                    estado = "muerto"
                }
                //console.log(resultaditos)
                contenedor_grid.innerHTML +=
                    `<div class="col">
                        <div class="card h-100">
                                <img src="${resultaditos.image}" class="card-img-top" alt="...">
                                <div class="card-body ${estado}">
                                    <h5 class="card-title">${resultaditos.name}</h5>
                                    <p class="card-text">${resultaditos.gender} - ${resultaditos.species}</p>
                                </div>
                            </div>
                        </div>`
            }

            if (data_api.info.prev == null) {
                btn_prev = "disabled"
            }
            if (data_api.info.next == null) {
                btn_next = "disabled"
            }
            console.log(data_api.info.next)
            contenedor_paginador.innerHTML =
                `<button type = "button" class = "btn btn-dark" ${btn_prev} onclick="character('${data_api.info.prev}')">Anterior</button>
                <button type = "button" class = "btn btn-dark" ${btn_next} onclick="character('${data_api.info.next}')">Siguiente</button>
            `

        }).catch(error_api_rick => console.log(error_api_rick))
}

function planet(pagina = 1) {
    var url = (pagina != 1) ? pagina.slice(46) : pagina
    let url_api_planet = "https://rickandmortyapi.com/api/location?page=" + url + "&type=Planet"
    console.log(url_api_planet)
    let info_api = fetch(url_api_planet)
    var contenedor_grid = document.getElementById("contenedor_p")
    contenedor_grid.innerHTML = ""
    var contenedor_paginador = document.getElementById("pagination")
    console.log(contenedor_paginador)
        //console.log(info_api)

    info_api.then(res => res.json())
        .then(data_api => {
            console.log(data_api)
            for (const resultaditos of data_api.results) {
                estado = resultaditos.status

                console.log(resultaditos)
                contenedor_grid.innerHTML +=
                    `<div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                            <h5 class="card-title">${resultaditos.name}</h5>
                            <h6 class="card-subtitle mb-2 text-mute">${resultaditos.dimension}</h6>
                            <a onclick="residentes('${data_api.info.prev}','${resultaditos.id}')" class="card-link">Residentes</a>
                            </div>
                        </div>
                    </div>`
            }

            //console.log(data_api.info.next)
            contenedor_paginador.innerHTML =
                `<button type = "button" class = "btn btn-dark" onclick="planet('${data_api.info.prev}')">Anterior</button>
                <button type = "button" class = "btn btn-dark" onclick="planet('${data_api.info.next}')">Siguiente</button>
            `
        }).catch(error_api_rick => console.log(error_api_rick))
}

function residentes(pagina = 1, id) {
    var url = (pagina != 1) ? pagina.slice(47) : pagina
    let url_api_planet = "https://rickandmortyapi.com/api/location/" + id
        //console.log(url_api_planet)
    let info_api = fetch(url_api_planet)
    var contenedor_grid = document.getElementById("contenedor_p")
    contenedor_grid.innerHTML = ""
    var contenedor_paginador = document.getElementById("pagination")
    var title = document.getElementsByTagName("h1")
        //console.log(contenedor_paginador)
    console.log(info_api)

    info_api.then(res => res.json())
        .then(data_api => {
            console.warn(data_api)
            for (const result of data_api.residents) {
                console.log(data_api)
                let info_residentes = fetch(result)
                info_residentes.then(res => res.json())
                    .then(data_res => {
                        estado = data_res.status
                        if (estado == "Alive") {
                            estado = "vivo"
                        } else {
                            estado = "muerto"
                        }
                        //console.log(result.residents)
                        title.innerHTML = `${data_res.name}`
                        contenedor_grid.innerHTML +=
                            `<div class="col">
                            <div class="card h-100">
                            <img src="${data_res.image}" class="card-img-top" alt="...">
                            <div class="card-body ${estado}">
                                <h5 class="card-title">${data_res.name}</h5>
                                <p class="card-text">${data_res.gender} - ${data_res.species}</p>
                            </div>
                        </div>
                    </div>`
                    })
            }
            //console.log(data_api.info.next)

        }).catch(error_api_rick => console.error(error_api_rick))

}