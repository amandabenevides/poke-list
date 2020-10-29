import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { usePokemon } from "../context/PokemonContext";

const PokemonModal = (props) => {
    const {
        className
    } = props;
    console.log("props", props)
    console.log("props", props.PokemonProfile )

    const { clicked, setClicked } = usePokemon();
    const toggle = () => setClicked(!clicked);

    return (
        <div>
            <Modal isOpen={clicked} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>bulbasaur</ModalHeader>
                <ModalBody>
                    Pokemon abilities!
        </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default PokemonModal;