export default function DogDisplay(props){
    if(!props.data){
        return;
    }
    else{
        props.data.map( (dog) => {
            dog.breed.map( (breed) => {
                console.log(breed.name);
            });
        });
        return (
            <div>
                {props.data.map( (dog) => (
                    <ul key={dog.id}className='App'> {dog.name}
                        <DogBreed breeds={dog.breed} />
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
            {props.breeds.map( (breed) => (
                <li>{breed.name}</li>
            ))}
        </div>
    )
}