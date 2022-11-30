
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
                        <li key={dog.id + dog.breed}>{breedString(dog.breed)}</li>
                        <li key={dog.id + dog.gender}>{dog.gender}</li>
                        <li key={dog.id + dog.weight + dog.height}>W: {dog.weight}  H: {dog.height}</li>
                    </ul>
                ))}
            </div>
        )
    }
}