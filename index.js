
const breedSelect = document.getElementById("breedSelect");
const info = document.getElementById("info");
const API_KEY = "live_Fwz3thfIflixj4JhmkiMkHY1O722Ja01dBMLRgN1ZJihVAZjApcN9CkvrzIwbWQg";


axios.defaults.baseURL = `https://api.thedogapi.com/v1`;
axios.defaults.headers.common["x-api-key"] = API_KEY;

const loadFirst = async () => {
    try {
        const response = await axios.get(`/breeds`);

        if (response.status !== 200) {
            throw new Error("Failed to retrieve breeds");
        }
         const breedList = response.data;
        console.log("BreedList", breedList);

        breedList.forEach((breed) => {
            const option = document.createElement("option");
            option.value = breed.breed_group;
            breedSelect.appendChild(option);
        });
        fetchInfo(breedList[0].breed_group);

        breedSelect.addEventListener("change", async function (e) {
            const breedId = e.target.value;
            await fetchInfo(breed_group);
        });
    } catch (error) {
        console.log(error);
    }
};
loadFirst();

async function fetchInfo(id) {
    try {
        const {data: response } = await axios.get(`/images/search?limit=10&breed_ids=${id}&has_breeds=1`);

        console.log("Breedinfo:", response);

    } catch (error) {
        console.log(error);
    }

    const currentCatInfoDump = (breed) => {
        infoDump.innerHTML = "";
        const catInfo = `
        <h3>${breed.name}</h3>
        <p>${breed.description}</p>
        <p><h3>Life Span</h3>: ${breed.life_span}</p>
        <p>Temperament: ${breed.temperament}</p>
        <p>Child Friendly: ${breed.child_friendly}</p>
        <p>Bred For: ${breed.bred_for}`;

        infoDump.innerHTML = catInfo;
      };
      
}

//display images 
