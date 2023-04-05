//creating variable
const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");


const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");


// fletching from url
async function fetchAPI(word) {

    // using try catch to find error

    try {
        //again the text will show for another word colz below it was display none
        infoTextEl.style.display = "block";

        //for meaning shown box
        meaningContainerEl.style.display = "none";

        //    for slower internet      
        infoTextEl.innerText = `Searching the meaning of "${word}"`

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(url).then((res) => res.json());



        //condition if user put word that doesnot have meaning 
        if (result.title) {
            // after result comes the searching text will disappear by display none
            infoTextEl.style.display = "none";


            //for meaning shown box
            meaningContainerEl.style.display = "block";


            titleEl.innerText = word;
            meaningEl.innerText = "N/A";

            audioEl.style.display = "none";
        }
        else {
            // after result comes the searching text will disappear by display none
            infoTextEl.style.display = "none";

            //for meaning shown box
            meaningContainerEl.style.display = "block";


            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;

            // for audio
            audioEl.src = result[0].phonetics[0].audio;
            //comes in center
            audioEl.style.display = "inline-flex"
        }





    } catch (error) {
        console.log(error);
        infoTextEl.innerText = `Error happened ! please try again later "${word}"`

    }


}


//adding eventlistener
// using arrow function and key up (for enter key press)
inputEl.addEventListener("keyup", (e) => {
    // condition
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value)
    }

});