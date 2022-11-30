
function breedString(breeds){
    let breedStr = "";
    breeds.map( (breed) => {
        breedStr += breed + ' ';
        return;
    })
    return breedStr;
}

export default function DogDisplay(props){
    if(!props.data){
        return;
    }
    else{
        return (
            <div>
                {props.data.map( (dog) => (
                    <ul key={new Date() + dog.id} className='App'> {dog.name}
                        <li>{breedString(dog.breed)}</li>
                        <li>{dog.gender}</li>
                        <li>{dog.weight}</li>
                    </ul>
                ))}
            </div>
        )
    }
}



function DogBreed(props){
    return (
        <div>
            {props.breeds.map( (breed, index) => (
                <li key={new Date() + index}>{breed}</li>
            ))}
        </div>
    )
}