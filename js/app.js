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
    //clear previous content
    document.getElementById('single-phone').style.display = "none"
    spinner('block')

    //error check, spinner && data load 
    const inputValue = document.getElementById('inputField').value
    if (inputValue === '') {
        clearTextContent('search-result-container')
        clearTextContent('single-phone')
        clearInputValue('inputField')
        error('block')
        spinner('none')
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
    //error check , spinner && display data
    if (phones.length === 0) {
        clearTextContent('search-result-container')
        clearTextContent('single-phone')
        error('block')
        spinner('none')
    } else {
        //clear previous
        error('none')
        clearTextContent('search-result-container')

        //display data
        const searchResultContainer = document.getElementById('search-result-container')
        phones.forEach(phone => {
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

        //remove spinner
        spinner('none')
    }
}



// load Single phone 
const lodeSinglePhone = phoneId => {
    //clear previous && spinner
    clearTextContent('single-phone')
    spinner('block')

    //data load
    document.getElementById('single-phone').style.display = 'block'
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySinglePhone(data.data))

}


// display Single Phone
const displaySinglePhone = phone => {
    //clear previous
    clearTextContent('single-phone')

    //display Single Phone
    const singlePhoneContainer = document.getElementById('single-phone')
    const div = document.createElement('div')
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
                                <span class='fw-bolder'> ReleaseDate:</span> ${phone.releaseDate ? phone.releaseDate:'No Release Date Found'}
                            </h6>
                            <p>
                                <span class='fw-bolder'> ChipSet: </span> ${phone.mainFeatures.chipSet}
                            </p>
                            <p>
                                <span class='fw-bolder'> Display Size: </span> ${phone.mainFeatures.displaySize}
                            </p>
                            <p>
                                <span class='fw-bolder'> Memory:</span> ${phone.mainFeatures.memory}
                            </p>
                            <p>
                                <span class='fw-bolder'> Storage:</span> ${phone.mainFeatures.storage}
                            </p>
                            <p>
                                <span class='fw-bolder'> Sensors:</span> ${phone.mainFeatures.sensors}
                            </p>
                            <div>
                                <div id='undefined-others' > 
                                    <span class='fw-bolder'> Others:</span> <p> Data Not Avilable </p> 
                                </div>
                
                                <div id='defined-others' > 
                                    <span class='fw-bolder'> Others:</span> </br>
                                    <span class='fw-bolder'> Bluetooth:</span> ${phone.others?.Bluetooth}
                                    <span class='fw-bolder'> GPS:</span> ${phone.others?.GPS} 
                                    <span class='fw-bolder'> NFC:</span> ${phone.others?.NFC}
                                    <span class='fw-bolder'> Radio:</span> ${phone.others?.Radio}
                                    <span class='fw-bolder'> USB:</span> ${phone.others?.USB}
                                    <span class='fw-bolder'> WLAN:</span> ${phone.others?.WLAN}   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
    singlePhoneContainer.appendChild(div)

    //error handling others Property
    if (phone.others === undefined) {
        document.getElementById('undefined-others').style.display = 'block'
        document.getElementById('defined-others').style.display = 'none'
    } else if (phone.others !== undefined) {
        document.getElementById('undefined-others').style.display = 'none'
        document.getElementById('defined-others').style.display = 'block'
    }

    //remove spinner
    spinner('none')
}