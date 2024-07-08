import * as Carousel from "./carousel.js";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const API_KEY =   "live_Mx9kAkuBxLT8WFiRgQYmMwYS3cqLZJWJhluYf21OMEhhvIAEmlTq31ihLh3RrzTG";
;
const Dog_Key= "live_Fwz3thfIflixj4JhmkiMkHY1O722Ja01dBMLRgN1ZJihVAZjApcN9CkvrzIwbWQg";

axios.defaults.baseURL = `https://api.thedogapi.com/v1`;
axios.defaults.headers.common["x-api-key"] = Dog_Key;

axios.interceptors.request.use(request => {
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime();
    return request;
});

axios.interceptors.response.use(
    (response) => {
        response.config.metadata.endTime = new Date().getTime();
        response.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;
        return response;
    },
    (error) => {
        error.config.metadata.endTime = new Date().getTime();
        error.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;
        throw error;
});

const loadFirst = async () => {
    try {
        const response = await axios.get(`/breeds`);
        console.log("Response status:", response.status);
        if (response.status !== 200) {
            throw new Error("Failed to retrieve breeds");
        }
         const breedList = response.data;
        console.log("BreedList", breedList);

        breedList.forEach((breed) => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.textContent =breed.name;
            breedSelect.appendChild(option);
        });
        fetchInfo(breedList[0].id);

        breedSelect.addEventListener("change", async function (e) {
            const breedId = e.target.value;
            await fetchInfo(breedId);
        });
    } catch (error) {
        console.log(error);
    }
};
loadFirst();



// const test = document.createElement("div")
// test.textContent = "hi"
// infoDump.appendChild(test);
async function fetchInfo(id) {
    try {
        const {data: response } = await axios.get(`/images/search?limit=10&breed_ids=${id}&has_breeds=1`);

        console.log("Breedinfo:", response);
        for(let d = 0; d < response.length; d++) {
            console.log(response[d]);
            // Carousel.createCarouselItem(response[d].url, "Picture of Puppers", response[d].id);
           
            Carousel.appendCarousel(Carousel.createCarouselItem(response[d].url, "Picture of Puppers", response[d].id)
        );

        }

    } catch (error) {
        console.log(error);
    }

    const currentDogInfoDump = (breed) => {
        info.innerHTML = "";
        const dogInfo = `
        <h3>${breed.name}</h3>
        <p>${breed.description}</p>
        <p><h3>Life Span</h3>: ${breed.life_span}</p>
        <p>Temperament: ${breed.temperament}</p>
        <p>Child Friendly: ${breed.child_friendly}</p>
        <p>Bred For: ${breed.bred_for}`;

        info.textContent = dogInfo;
      };
      
}

// axios.get()
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

//display images 
