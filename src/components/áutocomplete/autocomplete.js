import React, { forwardRef, useRef, useState, useImperativeHandle, useEffect } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const Autocomplete = forwardRef((props, ref) => {

    let suggestionsListComponent;
    const classes = useStyles();
    const childref = useRef();
    const [members, setMembers] = useState([...props.mem]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setfilteredSuggestion] = useState([]);
    const [showSuggestions, setshowSuggestions] = useState(false);
    const [userInput, setuserInput] = useState('');

    useEffect(() => {

        let b = childref.current ? childref.current.childNodes[1].innerHTML : null;

    }
    )

    useImperativeHandle(ref, () => ({

        updateStateAfterDelete(newmembers) {
            const tt = [];
            setMembers([...tt]);
            setMembers([...newmembers]);
        }

    }));

    function onChange(e) {
        // e.preventDefault();
        const { suggestions } = props;
        const userInput = e.currentTarget.value;
        const filteredSuggestions = suggestions.map(item => item.email).filter(suggestion =>
            !(suggestion.toLowerCase().indexOf(userInput.toLowerCase()))
        )
        const filteredListOfObjects = suggestions.filter((item) => filteredSuggestions.indexOf(item.email) !== -1);

        setActiveSuggestion(0);
        setfilteredSuggestion(filteredListOfObjects);
        setshowSuggestions(true);
        setuserInput(e.currentTarget.value);
    }

    function onClick(e) {
        let dummyArray = [];
        dummyArray = members;
        setActiveSuggestion(0);
        setfilteredSuggestion([]);
        setshowSuggestions(false);
        setuserInput(e.currentTarget.childNodes[1].innerHTML);
        dummyArray.push(e.currentTarget.childNodes[1].innerHTML);
        setMembers(dummyArray.sort());
        props.setMembers(members);
        setuserInput("");
    }

    function onKeyDown(e) {
        let dummyArray = [];
        dummyArray = members;
        // User pressed the enter key, update the input and close the
        // suggestions

        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setshowSuggestions(false);
            setuserInput(filteredSuggestions[activeSuggestion].email);
            dummyArray.push(filteredSuggestions[activeSuggestion].email);
            setMembers(dummyArray.sort());
            props.setMembers(members);
            setuserInput("");

        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
        }
    }


    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (

                <div className="suggestion">
                    {filteredSuggestions.map((suggestion, index) => {
                        let classNames;

                        // Flag the active suggestion with a class
                        if (index === activeSuggestion) {
                            classNames = "suggestion-active";

                        }
                        return (
                            <Paper key={suggestion.email} style={{ maxHeight: 200, overflow: 'auto' }} className={classes.root}>
                            <List >
                                <ListItem   className={"row" + " " + classNames}>
                                    <ListItemAvatar>
                                        <Avatar src={suggestion.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={suggestion.first_name + suggestion.last_name} secondary={suggestion.email} ref={childref} onClick={onClick} />

                                </ListItem>
                            </List>
                            </Paper>


                        );
                    })}

                
</div>
            );
        } else {
            suggestionsListComponent = (
                <div className="no-suggestions">
                    <em>No suggestions, you're on your own!</em>
                </div>
            );
        }
    }
    return (
        <>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
                placeholder="Enter name or registered email id"
                className="form-control"

            />
            {suggestionsListComponent}
        </>
    );
})

export default Autocomplete;