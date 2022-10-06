import React, { useEffect } from "react";
import { useState } from "react";
import AddContact from "./AddContact";
import { useParams, useNavigate, Link } from "react-router-dom";


const ViewContact = () => {
    const [contact, setContact] = useState([]);
    let params = useParams()
    let navigate = useNavigate()

    const getContact = async () => {
        const response = await fetch(
            `http://localhost:8080/contacts/${params.id}`
        );
        const data = await response.json();
        console.log(data);
        setContact(data);
    }

    useEffect(() => {
        getContact();
    }, []);

    const deleteContact= async (id) => {
        const response = await fetch(
            `http://localhost:8080/contacts/${id}`, {
                method: "DELETE"
            }
        );
        navigate("/")
    }

    return (
        <>
            <div className="card">
                <div className="container">
                    <h1>Name: {contact.name}</h1>
                    <h3>Phone Number: {contact.phone}</h3>
                    <h3>Email:{contact.email}</h3>
                    <h3>Notes: {contact.notes}</h3>
                    <p>
                        <button onClick={()=>{
                            navigate("/edit", {state:contact})
                        }}>Edit</button>
                        <button onClick={()=>{deleteContact(contact.id)}}>Delete</button>
                    </p>
                </div>
            </div>
        </>
    );
}

export default ViewContact;