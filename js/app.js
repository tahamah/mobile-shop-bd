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
            .then(data => displayData(data.data.slice(0, 20)))
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
            // console.log(phone)
            const div = document.createElement('div')
            div.className = 'col'
            div.innerHTML = `
                <div class="card h-100 text-center">
                <div>
                    <img height='400px'  src="${phone.image}" class="card-img-top w-75 py-4" alt="...">
                </div>
                    
                <div class="card-body p-3">
                    <h3 class="card-title">${phone.phone_name}</h3>
                    <p class="card-text">${phone.brand}</p>
                 </div>
                 <div onclick="lodeSinglePhone('${phone.slug}')" class="card-footer bg-primary">
                     <h5 style="cursor:pointer" class="text-white  text-center ">See Details</h5>
                    </div>
                </div>
            `
            searchResultContainer.appendChild(div)
        })
        spinner('none')
    }

}



// load Single phone 
const lodeSinglePhone = phoneId => {
    clearTextContent('single-phone')
    spinner('block')
    document.getElementById('single-phone').style.display = 'block'

    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySinglePhone(data.data))
        // console.log(data.data)
}


// display Single Phone
const displaySinglePhone = phone => {
    console.log(phone);
    const singlePhoneContainer = document.getElementById('single-phone')
    const div = document.createElement('div')
    clearTextContent('single-phone')
    div.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4 my-auto">
                        <img src="${phone.image}" class="img-fluid rounded-start my-auto p-3" alt="...">
                    </div>
                    <div class="col-md-8 my-auto">
                        <div class="card-body">
                            <h5 class="card-title">
                                 <span class='fw-bolder'> Name:</span>  ${phone.name}
                            </h5>
                            <h6 class="card-text">
                                <span class='fw-bolder'> ReleaseDate:</span> ${phone.releaseDate ? phone.releaseDate:'Not Found'}
                            </h6>
                            <p class="">
                                <span class='fw-bolder'> ChipSet: </span> ${phone.mainFeatures.chipSet}
                            </p>
                            <p class="">
                                <span class='fw-bolder'> Display Size: </span> ${phone.mainFeatures.displaySize}
                            </p>
                            <p class="">
                                <span class='fw-bolder'> Memory:</span> ${phone.mainFeatures.memory}
                            </p>
                            <p class="">
                                <span class='fw-bolder'> Storage:</span> ${phone.mainFeatures.storage}
                            </p>
                            <p class="">
                                <span class='fw-bolder'> Sensors:</span> ${phone.mainFeatures.sensors[0]}
                            </p>
                        </div>
                    </div>
                </div>
            `
    singlePhoneContainer.appendChild(div)
    spinner('none')
}

/* <a  href=" ${phone.strVideo ? phone.strVideo:console.log('object')} "class=" btn btn-primary">See Video</a> */