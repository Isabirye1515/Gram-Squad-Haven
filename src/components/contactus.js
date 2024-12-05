import { Email, MessageQueue, Phone } from '@carbon/icons-react';
import { Button, Column, Form, Grid, TextArea, TextInput } from '@carbon/react';
import React, { useState } from 'react';

const Contactus = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        contact: "",
        company: "",
        subject: "",
        comment: ""
    });
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        setData([...data, input]);  // Append new input data to data state
        await postData();  // Call postData after submitting the form
        setInput({
            name: "",
            email: "",
            contact: "",
            company: "",
            subject: "",
            comment: ""
        });  // Reset input fields
    };

    const handleClear = () => {
        setInput({
            name: "",
            email: "",
            contact: "",
            company: "",
            subject: "",
            comment: ""
        });  // Reset the input fields
    };

    const postData = async () => {
        // Check if all required fields are filled
        if (!input.name || !input.email || !input.contact || !input.company || !input.subject || !input.comment) {
            setMessage("Please fill in all fields.");
            return;
        }
    
        try {
            const response = await fetch("https://glam-server.vercel.app/send-email", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name: input.name,
                    email: input.email,
                    contact: input.contact,
                    company: input.company,
                    subject: input.subject,
                    comment: input.comment
                })
            });
    
            if (response.ok) {
                setMessage("Email was sent successfully");
            } else {
                const errorData = await response.json();
                setMessage(`Error sending email: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Network error');
        }
    };
    

    return (
        <div>
            <div className="m-4 p-5 shadow">
                <Grid className="m-2">
                    <Column lg={16} md={8} sm={4}>
                        <div className="bg-white p-2">
                            <h1>Contact Us</h1>
                        </div>
                        <h2 className="m-2 text-black fw-light">
                            Contact us about anything related to our company or services.
                            We'll do our best to get back to you as soon as possible.
                        </h2>
                    </Column>

                    <Column lg={10} md={5} sm={4}>
                        <Form className="mb-4" onSubmit={handleSubmit}>
                            <TextInput
                                id="name"
                                labelText="Name"
                                placeholder="Name"
                                onChange={handleChange}
                                name="name"
                                value={input.name}
                            />
                            <TextInput
                                id="email"
                                labelText="Email"
                                placeholder="Email"
                                type="email"
                                onChange={handleChange}
                                name="email"
                                value={input.email}
                            />
                            <TextInput
                                id="number"
                                labelText="Phone Number"
                                placeholder="Phone Number"
                                type="tel"
                                onChange={handleChange}
                                name="contact"
                                value={input.contact}
                            />
                            <TextInput
                                id="company"
                                labelText="Company"
                                placeholder="Company"
                                type="text"
                                onChange={handleChange}
                                name="company"
                                value={input.company}
                            />
                            <TextInput
                                id="subject"
                                labelText="Subject"
                                placeholder="Subject"
                                type="text"
                                onChange={handleChange}
                                name="subject"
                                value={input.subject}
                            />
                            <TextArea
                                id="text"
                                labelText="Question"
                                placeholder="Question"
                                onChange={handleChange}
                                name="comment"
                                value={input.comment}
                            />
                            <div>
                                <Button type="submit">Submit</Button>
                                <Button type="button" onClick={handleClear}>Clear</Button>
                            </div>
                        </Form>
                    </Column>

                    <Column lg={4} md={3} sm={4}>
                        <div className="text-info">
                            <h2 className="text-dark">Connect with us</h2>
                            <MessageQueue size={40} /> Contact us <br />
                            <Email size={40} /> info@yourcompany.example.com<br />
                            <Phone size={40} /> +1 555-555-5556<br />
                        </div>
                    </Column>
                </Grid>
            </div>

           
        </div>
    );
};

export default Contactus;
