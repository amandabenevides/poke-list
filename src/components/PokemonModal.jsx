import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { usePokemon } from "../context/PokemonContext";

// Pokémon modal - shows stats per each Pokémon, once its clicked 

const PokemonModal = (props) => {
    const { className } = props;
    console.log("props", props)
    console.log("props", props.PokemonProfile)
    console.log(className);
    const mapping = props.selectedPokemon.abilities;
    console.log('mapping', mapping);

    const { clicked, setClicked } = usePokemon();
    const toggle = () => setClicked(!clicked);

    return (
        <div>
            <Modal isOpen={clicked} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>#{props.selectedPokemon.id} {props.selectedPokemon.name} | stats </ModalHeader>
                <ModalBody>
                    <ul>
                        <li>Base Experience: {props.selectedPokemon.base_experience}</li>
                        <li>Height: {props.selectedPokemon.height}</li>
                        <li>Weight: {props.selectedPokemon.weight}</li>
                    </ul>
                    {console.log('selected', props.selectedPokemon, 'name', 'acbilitiesss', props.selectedPokemon.abilities)}
                    {/* Abilities: {props.selectedPokemon.abilities[0].ability.name} */}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default PokemonModal;