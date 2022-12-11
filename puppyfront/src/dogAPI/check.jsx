import axios from "axios";
import request from "../services/api.requests";
import { BREED_URL, BREED_KEY } from "../services/auth.constants";

//Keeping this file in to showcase that I can pull data from an external API.
// I have already seeded my database with the information about the breeds I like. 
export default function CheckAPI(props){

    let successfulAPI = "affenpinscher-airedale-akita-appenzeller-shepherd australian-Cattle dog australian-basenji-beagle-bluetick-borzoi-bouvier-boxer-briard-french bulldog-american bulldog-chihuahua-chow-clumber-border collie-bearded collie-coonhound-corgi-dachshund-dalmatian-scottish scottish deerhound-doberman-norwegian elkhound-entlebucher-eskimo-german shepherd-italian greyhound-havanese-afghan hound-basset hound-blood hound-ibizan hound-plott hound-husky-keeshond-kelpie-komondor-kuvasz-labrador-leonberg-lhasa-malamute-malinois-maltese-bull mastiff-tibetan mastiff-Bavarian mountain-bernese mountain-swiss mountain-newfoundland-otterhound-papillon-pembroke-miniature pinscher-german longhaired pointer-pomeranian-pug-pyrenees-redbone-chesapeake retriever-golden retriever-rhodesian rhodesian ridgeback-rottweiler-saluki-samoyed-schipperke-giant schnauzer-miniature schnauzer-italian segugio-english setter-gordon setter-irish setter-belgian sheepdog-english sheepdog-shetland sheepdog-shiba-cocker spaniel-sussex spaniel-english springer-airedale terrier-australian terrier-bedlington terrier-border terrier-cairn terrier-fox terrier-irish terrier-lakeland terrier-norfolk terrier-norwich terrier-russell terrier-scottish terrier-sealyham terrier-silky terrier-tibetan terrier-welsh terrier-wheaten terrier-yorkshire terrier-tervuren-vizsla-weimaraner-whippet-irish wolfhound"

    let breedFields = [
        "max_height_male", 
        "max_height_female", 
        "min_height_female",
        "min_height_male",
        "min_weight_male", 
        "min_weight_female",
        "max_weight_female",
        "max_weight_male",
    ]
    async function sendData(resp, breedName) {
        let namePlaceholder = breedName.split('');
        namePlaceholder[0] = namePlaceholder[0].toUpperCase();
        breedName = namePlaceholder.join('');
        let breedObj={};
        for(let field of breedFields){
            console.log(resp.data[0][field]);
            breedObj[field] = resp.data[0][field]
        }
        breedObj['name'] = breedName;
        console.log(breedObj);
        let options = {
        url: "breed/",
        method: "POST",
        data: {
            ...breedObj
        }
        };
        await request(options);
    }

    let nameRequests = successfulAPI.split('-');
    console.log(nameRequests);
    for(let dogBreed of nameRequests ){
        axios({
            method: "GET",
            url: BREED_URL + dogBreed,
            headers: {'X-Api-Key': BREED_KEY},
            contentType: 'application'
        }).then( (resp) => sendData(resp, dogBreed));
    }
         // Form for the breed api
// method: 'GET',
//     url: 'https://api.api-ninjas.com/v1/dogs?name=' + name,
//     headers: { 'X-Api-Key': 'YOUR_API_KEY'},
//     contentType: 'application/json',
}