import React, { useEffect } from "react";
import { useState } from "react";
import AddContact from "./AddContact.js";
import { Link } from "react-router-dom";

const ContactList = () =>{

    const[contacts, setContacts]= useState([]);
    
    const getContacts = async () =>{
        const response = await fetch(
            `http://localhost:8080/contacts`
        );
        const contact = await response.json();
        console.log(contact);
        setContacts(contact);
    }

    useEffect(() =>{
        getContacts();
    }, []);

    return(
<>
<h2 className="title">Contact List</h2>
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {contacts.map((contact, index) =>{
            return(
                <tr key={index}>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.email}</td>
                    <td>
                        <Link to={`/view/${contact.id}`}>View</Link>
                    </td>
                </tr>
            )
        })}
    </tbody>
</table>
</>
    );
}
export default ContactList;