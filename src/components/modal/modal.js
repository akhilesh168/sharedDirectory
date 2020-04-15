import React, { useState } from 'react';
import Autocomplete from '../áutocomplete/autocomplete';
import { Modal, Button } from 'react-bootstrap';
import data from '../modal/user.json';

export default function ShareModal(props) {
    let isOwner = [];
    let [members, setMembers] = useState([]);
    const newlist = data;
    isOwner = newlist ? newlist.filter(x => x.isOwner === true) : null;
    function handleChanges(member) {
        setMembers([...new Set(member)]);
    }
   
    function deleteHandler(index) {
        let newArray = [...members];
        newArray.splice(index,1);
        setMembers([...newArray]);
    }
    const filterList = members.length > 0 ? newlist.filter(x => members.indexOf(x.email) === -1).map(x => x.email) : newlist.map(x => x.email);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sharing  Settings
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Add Members</h4>
                <Autocomplete suggestions={filterList} setMembers={handleChanges} mem={members.length>0?members:[]}/>
                <hr />
                <div>
                    {isOwner.length ? <p>{isOwner[0].first_name + isOwner[0].last_name}</p> : null}
                </div>
                <div>
                    <p>Members</p>
                    <ul>
                        {members.length > 0 ? members.map((x,index) => <li key={x}>{x} <Button onClick={()=>deleteHandler(index)}>X</Button></li>) : null}
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Done</Button>
            </Modal.Footer>
        </Modal>
    );
}