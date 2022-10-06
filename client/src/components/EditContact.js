import React from "react";
import { useState, useEffect } from "react";
import { useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";


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
const EditContact = () =>{
const location = useLocation()
const navigate = useNavigate()
   
    const initialState = {
         name: '', email: '', phone: '', notes: ''
    };

    const[state, dispatch] = useReducer(reducer, initialState);
    const handleEditContact = async (e) =>{
        e.preventDefault();

        const newContact ={
             name: state.name || location.state.name, 
             email: state.email || location.state.email, 
             phone: state.phone || location.state.phone, 
             notes: state.notes || location.state.notes, 
        }

        const response = await fetch('http://localhost:8080/contacts/'+location.state.id,{
            method: 'PUT',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        });
        const content = await response.json();
        dispatch({type:'clearForm'});
        navigate("/view/"+location.state.id)
    }
    return  (
        <>
<div className="Contact">
    <h2 className="title">Edit a new contact</h2>

    <form onSubmit={handleEditContact}>
        <br></br>
        <label>Name: </label>
        <input type="text" defaultValue={location.state.name} onChange={(e) => dispatch({type: 'addName', payload: e.target.value})}/>
        <br></br>
        <label>Email: </label>
        <input type="email" defaultValue={location.state.email} onChange={(e) => dispatch({type: 'addEmail', payload: e.target.value})}/>
        <br></br>
        <label>Phone Number: </label>
        <input type="text" defaultValue={location.state.phone} onChange={(e) => dispatch({type: 'addPhone', payload: e.target.value})}/>
        <br></br>
        <label>Notes: </label>
        <input type="text" defaultValue={location.state.notes} onChange={(e) => dispatch({type: 'addNotes', payload: e.target.value})}/>
        <br></br>
        <input type="submit" value="Update"/>
    </form>
</div>
        </>
    )
}

export default EditContact;