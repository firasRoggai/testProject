'use client';

import { ChangeEvent, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Button } from '@radix-ui/themes';

const Page = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        company: '',
        address: '',
        city: '',
        state: '',
        zip_phone: '',
    });

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit  = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/person/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // Handle success (e.g., clear the form, show a success message)
            console.log('Person added successfully');
        } else {
            // Handle error
            console.error('Error adding person');
        }
    };

    return (
        <div className='p-5'>
            <Form.Root className='space-y-3' onSubmit={handleSubmit}>
                <Form.Field name="first_name">
                    <Form.Label className='text-lg mr-5'>First Name</Form.Label>
                    <Form.Control className='border-1' asChild>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name="last_name">
                    <Form.Label className='text-lg mr-5'>Last Name</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name="company">
                    <Form.Label className='text-lg mr-5'>Company</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name="address">
                    <Form.Label className='text-lg mr-5'>Address</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name="city">
                    <Form.Label className='text-lg mr-5'>City</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name="state">
                    <Form.Label className='text-lg mr-5'>State</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name="zip_phone">
                    <Form.Label className='text-lg mr-5'>ZIP Phone</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="text"
                            name="zip_phone"
                            value={formData.zip_phone}
                            onChange={handleChange}
                            required
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <Button type="submit">Add Person</Button>
                </Form.Submit>
            </Form.Root>
        </div>
    );
};

export default Page;
