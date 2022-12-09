import axios from "axios";

export default function CheckAPI(props){

    let successfulAPI = "affenpinscher-airedale-akita-appenzeller-shepherd australian-Cattle dog australian-basenji-beagle-bluetick-borzoi-bouvier-boxer-briard-french bulldog-american bulldog-chihuahua-chow-clumber-border collie-bearded collie-coonhound-corgi-dachshund-dalmatian-scottish scottish deerhound-doberman-norwegian elkhound-entlebucher-eskimo-german shepherd-italian greyhound-havanese-afghan hound-basset hound-blood hound-ibizan hound-plott hound-husky-keeshond-kelpie-komondor-kuvasz-labrador-leonberg-lhasa-malamute-malinois-maltese-bull mastiff-tibetan mastiff-Bavarian mountain-bernese mountain-swiss mountain-newfoundland-otterhound-papillon-pembroke-miniature pinscher-german longhaired pointer-pomeranian-pug-pyrenees-redbone-chesapeake retriever-golden retriever-rhodesian rhodesian ridgeback-rottweiler-saluki-samoyed-schipperke-giant schnauzer-miniature schnauzer-italian segugio-english setter-gordon setter-irish setter-belgian sheepdog-english sheepdog-shetland sheepdog-shiba-cocker spaniel-sussex spaniel-english springer-airedale terrier-australian terrier-bedlington terrier-border terrier-cairn terrier-fox terrier-irish terrier-lakeland terrier-norfolk terrier-norwich terrier-russell terrier-scottish terrier-sealyham terrier-silky terrier-tibetan terrier-welsh terrier-wheaten terrier-yorkshire terrier-tervuren-vizsla-weimaraner-whippet-irish wolfhound"


    let breedList = {
        "affenpinscher": [''],

        "airedale": [''],
        "akita": [''],
        "appenzeller": [''],
        "australian": [
            "shepherd",
            "Cattle dog"
        ],
        "basenji": [''],
        "beagle": [''],
        "bluetick": [''],
        "borzoi": [''],
        "bouvier": [''],
        "boxer": [''],

        "briard": [''],
        "norwegian buhund": [],
        "bulldog": [
            "french",
            'american'
        ],

        "chihuahua": [''],
        "chow": [''],
        "clumber": [''],
        "collie": [
            "border",
            "bearded"
        ],
        "coonhound": [''],
        "corgi": [''],

        "dachshund": [''],
        "dalmatian": [''],
        "great dane": [
        ],
        "scottish deerhound": [
            "scottish"
        ],

        "doberman": [''],
        "elkhound": [
            "norwegian"
        ],
        "entlebucher": [''],
        "eskimo": [''],
        "finnish lapphund": [
        ],
        "bichon frise": [
        ],
        "german shepherd": [''],
        "greyhound": [
            "italian"
        ],

        "havanese": [''],
        "hound": [
            "afghan",
            "basset",
            "blood",

            "ibizan",
            "plott",
        ],
        "husky": [''],
        "keeshond": [''],
        "kelpie": [''],
        "komondor": [''],
        "kuvasz": [''],

        "labrador": [''],
        "leonberg": [''],
        "lhasa": [''],
        "malamute": [''],
        "malinois": [''],
        "maltese": [''],
        "mastiff": [
            "bull",

            "tibetan"
        ],
        "mountain": [
            'Bavarian',
            "bernese",
            "swiss"
        ],
        "newfoundland": [''],
        "otterhound": [''],
        "papillon": [''],

        "pembroke": [''],
        "pinscher": [
            "miniature"
        ],

        "german longhaired pointer": [

            ""
        ],
        "pomeranian": [''],
        "poodle": [


        ],
        "pug": [''],

        "pyrenees": [''],
        "redbone": [''],
        "retriever": [
            "chesapeake",
            "golden"
        ],
        "rhodesian ridgeback": [
            "rhodesian"
        ],
        "rottweiler": [''],
        "saluki": [''],
        "samoyed": [''],
        "schipperke": [''],
        "schnauzer": [
            "giant",
            "miniature"
        ],
        "segugio": [
            "italian"
        ],
        "setter": [
            "english",
            "gordon",
            "irish"
        ],
        "sheepdog": [
            "belgian",
            "english",
            "shetland"
        ],
        "shiba": [''],
        "spaniel": [
            "cocker",
            "sussex",
        ],
        "springer": [
            "english"
        ],
        "terrier": [
            "airedale",

            "australian",
            "bedlington",
            "border",
            "cairn",
            "fox",
            "irish",
            "lakeland",
            "norfolk",
            "norwich",
            "russell",
            "scottish",
            "sealyham",
            "silky",
            "tibetan",
            "welsh",

            "wheaten",
            "yorkshire"
        ],
        "tervuren": [''],
        "vizsla": [''],
        "weimaraner": [''],
        "whippet": [''],
        "wolfhound": [
            "irish"
        ]
        
    }
        let nameCombos = '';
        Object.entries(breedList).map( ([key, value]) =>{
            for(let subBreed of value){
                if(subBreed === '' || subBreed === undefined || subBreed === null){
                    nameCombos += key + '-';
                } else{
                    nameCombos += (subBreed +' '+key + '-');
                }
            }
        });
    console.log(nameCombos)
    localStorage.setItem('breeds', nameCombos)           
}