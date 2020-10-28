import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { usePokemon } from "../context/PokemonContext";

const PokemonModal = (props) => {
    const {
        className
    } = props;

    const { clicked, setClicked } = usePokemon();

    const toggle = () => setClicked(!clicked);

    return (
        <div>
            <Modal isOpen={clicked} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, ,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia
                    m, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla p
                    ariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deser
                    unt mollit anim id est laborum.
        </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default PokemonModal;