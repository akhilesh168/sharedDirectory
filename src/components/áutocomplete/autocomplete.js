import React, { useState } from 'react';

export default function Autocomplete(props) {

    const [members, setMembers] = useState([...props.mem]);

    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setfilteredSuggestion] = useState([]);
    const [showSuggestions, setshowSuggestions] = useState(false);
    const [userInput, setuserInput] = useState('');

    function onChange(e) {
        // e.preventDefault();
        const { suggestions } = props;
        const userInput = e.currentTarget.value;
        const filteredSuggestions = suggestions.filter(suggestion =>
            !(suggestion.toLowerCase().indexOf(userInput.toLowerCase()))
        )
        setActiveSuggestion(0);
        setfilteredSuggestion(filteredSuggestions);
        setshowSuggestions(true);
        setuserInput(e.currentTarget.value);
    }

    function onClick(e) {
        let dummyArray = members;
        setActiveSuggestion(0);
        setfilteredSuggestion([]);
        setshowSuggestions(false);
        setuserInput(e.currentTarget.innerText);
        dummyArray.push(e.currentTarget.innerText);
        setMembers(dummyArray);
        props.setMembers(members);


    }

    function onKeyDown(e) {
        let dummyArray = members;
        // User pressed the enter key, update the input and close the
        // suggestions

        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setshowSuggestions(false);
            setuserInput(filteredSuggestions[activeSuggestion]);
            dummyArray.push(filteredSuggestions[activeSuggestion]);
            setMembers(dummyArray);

            props.setMembers(members);

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
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        let className;

                        // Flag the active suggestion with a class
                        if (index === activeSuggestion) {
                            className = "suggestion-active";
                        }
                        return (
                            <li
                                className={className}
                                key={suggestion}
                                onClick={onClick}>
                                {suggestion}
                            </li>
                        );
                    })}
                </ul>
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

            />
            {suggestionsListComponent}
        </>
    );
}