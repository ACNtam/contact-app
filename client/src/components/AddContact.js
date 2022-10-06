import React from "react";
import { useState, useEffect } from "react";
import { useReducer } from "react";


// create useReducer for changing values
const reducer = (state, action) => {
    console.log(action, 'this is the action');
    switch (action.type) {
        case 'addName':
            return { ...state, name: action.payload };

        case 'addEmail':
            return { ...state, email: action.payload };

        case 'addPhone':
            return { ...state, phone: action.payload };

        case 'addNotes':
            return { ...state, notes: action.payload };
        case 'clearForm':
            return {  name: '', email: '',phone: '', contact_id: '', notes: '' };
        default:
            return state;
    }
};
const AddContact = () =>{

   
    const initialState = {
         name: '', email: '', phone: '', notes: ''
    };

    const[state, dispatch] = useReducer(reducer, initialState);
    const handleAddContact = async (e) =>{
        e.preventDefault();

        const newContact ={
             name: state.name, email: state.email, phone: state.phone, notes: state.notes, 
        }

        const response = await fetch('http://localhost:8080/contacts',{
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        });
        const content = await response.json();
        dispatch({type:'clearForm'});
    }
    return  (
        <>
<div className="addContact">
    <h2 className="title">Add a new Contact</h2>

    <form onSubmit={handleAddContact}>
        <br></br>
        <label>Name: </label>
        <input type="text" value={state.name} onChange={(e) => dispatch({type: 'addName', payload: e.target.value})}/>
        <br></br>
        <label>Email: </label>
        <input type="email" value={state.email} onChange={(e) => dispatch({type: 'addEmail', payload: e.target.value})}/>
        <br></br>
        <label>Phone Number: </label>
        <input type="text" value={state.phone} onChange={(e) => dispatch({type: 'addPhone', payload: e.target.value})}/>
        <br></br>
        <label>Notes: </label>
        <input type="text" value={state.notes} onChange={(e) => dispatch({type: 'addNotes', payload: e.target.value})}/>
        <br></br>
        <input type="submit"/>
    </form>
</div>
        </>
    )
}

export default AddContact;