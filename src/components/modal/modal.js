import React, { useState, useRef } from 'react';
import Autocomplete from '../áutocomplete/autocomplete';
import { Modal, Button } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import data from '../modal/user.json';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


export default function ShareModal(props) {
    let isOwner = [];
    let [members, setMembers] = useState([]);
    const newlist = data;
    const newref = useRef();
    isOwner = newlist ? newlist.filter(x => x.isOwner === true) : null;

    function handleChanges(member) {
        setMembers([...new Set(member)]);

    }

    function deleteHandler(index) {
        let newArray = [...members];
        newArray.splice(index, 1);
        setMembers([...newArray].sort());
        newref.current.updateStateAfterDelete(newArray);
    }

    const filterList = members.length > 0 ? newlist.filter(x => members.indexOf(x.email) === -1).sort(compare) : newlist;
    const dummyList = members.length > 0 ? newlist.filter(item => members.indexOf(item.email) !== -1).sort(compare) : null;

    function compare(a, b) {
        const emailA = a.email.toUpperCase();
        const emailB = b.email.toUpperCase();

        let comparison = 0;
        if (emailA > emailB) {
            comparison = 1;
        } else if (emailA < emailB) {
            comparison = -1;
        }
        return comparison;
    }
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
                <Autocomplete ref={newref} suggestions={filterList} setMembers={handleChanges} mem={members.length > 0 ? members : []} />
                <hr />
                <div className="row">
                    <div className="col">
                        <strong>Owner</strong>
                    </div>
                </div>
                <div key={isOwner[0].email}>
                <List>
                    <ListItem >
                        <ListItemAvatar>
                            <Avatar src={isOwner[0].avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={isOwner[0].first_name + isOwner[0].last_name} secondary={isOwner[0].email} />
                    </ListItem>
                </List>
                </div>
               

                <div>
                    <strong>Members</strong>
                    <Paper className="suggestion" style={{maxHeight: 200, overflow: 'auto'}}>
                        {members.length > 0 ? dummyList.map((x, index) =>
                        <div key={x.email}>
                            <List>
                                <ListItem >
                                    <ListItemAvatar>
                                        <Avatar src={x.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={x.first_name + x.last_name} secondary={x.email} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon onClick={() => deleteHandler(index)} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                            </div>
                        ) : null}
                  
                     </Paper>
               </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Done</Button>
            </Modal.Footer>
        </Modal>
    );
}