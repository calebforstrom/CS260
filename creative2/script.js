console.log("Start")

const url = 'https://api.thedogapi.com/v1'

const fetchDogBreeds = async () => {
    
    const response = await fetch(url + '/breeds');
    const dogBreeds = await response.json()
    fillBreedSelect(dogBreeds);
}

const fillBreedSelect = (breeds) => {
    const select = document.querySelector('.breedselect');
    const breedOptions = breeds.map(breed => {
        const option = document.createElement('option');
        option.text = breed.name;
        option.value = breed.id;
        return option;
    })
    
    breedOptions.forEach(breedOption => {
        select.appendChild(breedOption);
    })
}

const fillDogImage = (imageUrl) => {
    document.querySelector('#dogimg').setAttribute('src', imageUrl);
}


const getDog = async (breedId) => {
    
    const [data] = await fetch(url + '/images/search?include_breed=1&breed_id=' + breedId).then((data) => data.json())
    const {url: imageUrl, breeds} = data;
    fillDogImage(imageUrl);
}

const changeDog = () => {
    getDog(event.target.value);
}

fetchDogBreeds();