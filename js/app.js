//error
const error = status => {
    document.getElementById('not-found').style.display = status
}

//spinner
const spinner = status => {
    document.getElementById('loading-spinner').style.display = status
}

//clear text content
const clearTextContent = id => {
    document.getElementById(id).textContent = ''
}

//clear input value
const clearInputValue = id => {
    document.getElementById(id).value = ''
}

//load data
const lodeData = () => {
    document.getElementById('main').style.display = 'block'
    spinner('block')
    const inputValue = document.getElementById('inputField').value
    if (inputValue === '') {
        clearTextContent('search-result-container')
        clearTextContent('single-phone')
        clearInputValue('inputField')
        error('block')
        spinner('none')
        document.getElementById('single-phone').style.display = 'none'
    } else {
        clearTextContent('single-phone')
        error('none')
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.data))
        clearInputValue('inputField')
    }
}

//display Data
const displayData = phones => {
    //error
    if (phones === null) {
        clearTextContent('search-result-container')
        clearTextContent('single-phone')
        error('block')
        spinner('none')
    } else {
        //main
        error('none')
        document.getElementById('header').style.marginTop = '0px'
        const searchResultContainer = document.getElementById('search-result-container')
        clearTextContent('search-result-container')
        phones.forEach(phone => {
            console.log(phone)
            const div = document.createElement('div')
            div.className = 'col'
            div.innerHTML = `
                <div class="card h-100 text-center">
                <div>
                    <img height='400px'  src="${phone.image}" class="card-img-top w-75 py-4" alt="...">
                </div>
                    
                <div class="card-body p-3">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                 </div>
                 <div onclick="lodeSingleDrink(${phone.idDrink})" class="card-footer bg-primary">
                     <h6 style="cursor:pointer" class="text-white text-center ">See Details</h6>
                    </div>
                </div>
            `
            searchResultContainer.appendChild(div)
        })
        spinner('none')
    }

}

/*  
                     
                     
                  */

/*
    // load Single phone 
    const lodeSingleDrink = id => {
        clearTextContent('single-phone')
        spinner('block')
        document.getElementById('single-phone').style.display = 'block'
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySingleDrink(data.drinks[0]))

    }

    // display Single Phone
    const displaySingleDrink = drink => {
        const singlePhoneContainer = document.getElementById('single-phone')
        const div = document.createElement('div')
        clearTextContent('single-phone')
        div.innerHTML = `
                    <div class="row g-0">
                    <div class="col-md-5">
                    <img src="${drink.strDrinkThumb}" class="img-fluid rounded-start my-auto p-3" alt="...">
                    </div>
                    <div class="col-md-7 my-auto">
                    <div class="card-body">
                        <h5 class="card-title">${drink.strDrink}</h5>
                        <p class="card-text">${drink.strInstructions.slice(0,300)}</p>
                        <a  href=" ${drink.strVideo ? drink.strVideo:console.log('object')} "class=" btn btn-primary">See Video</a>
                    </div>
                    </div>
                </div>
            `
        singlePhoneContainer.appendChild(div)
        spinner('none')
        console.log(drink);
    } */