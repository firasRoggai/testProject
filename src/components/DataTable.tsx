"use client";

import { Button, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "~/components/ui/table";

type Person = {
    first_name: string,
    last_name: string,
    company: string,
    adress: string,
    city: string,
    state: string,
    zip_phone: string,
}

const DataTable = () => {
    const [personTable, setPersonTable] = useState<Person[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [pageNumber, setPageNumber] = useState<number>(1)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`/api/person/search?query=${searchQuery}&page=${pageNumber}`);
                const data = await response.json();
                setPersonTable(data.personTable);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [pageNumber]);

    if (isLoading) {
        return <div className="min-h-[30vh] flex justify-center items-center">
            <p className="text-lg">Loading...</p>
        </div>;
    }

    const handleSearch = async () => {
        const response = await fetch(`/api/person/search?query=${searchQuery}&page=${pageNumber}`);
        const data = await response.json();
        setPersonTable(data.personTable);
    }

    return (
        <div className="grid justify-center py-8">
            <div className="flex gap-3 py-6">
                <TextField.Root className="w-full" placeholder="Search for people" onChange={(e) => {
                    setSearchQuery(e.target.value)
                }} />
                <Button onClick={handleSearch} className="w-[10rem]">
                    Search
                </Button>
            </div>
            <Table className="w-[80vw]">
                <TableHeader>
                    <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>ZIP Phone</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {personTable && personTable.length > 0 ? (
                        personTable.map(person => (
                            <TableRow key={person.first_name}>
                                <TableCell>{person.first_name}</TableCell>
                                <TableCell>{person.last_name}</TableCell>
                                <TableCell>{person.company}</TableCell>
                                <TableCell>{person.adress}</TableCell>
                                <TableCell>{person.city}</TableCell>
                                <TableCell>{person.state}</TableCell>
                                <TableCell>{person.zip_phone}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>No data</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex justify-center gap-3 py-4">
                <Button onClick={() => {
                    if (pageNumber >= 2) {
                        setPageNumber(pageNumber - 1)
                    }
                }} className="cursor-pointer w-[6rem]">
                    {'<'} Previous
                </Button>
                <Button onClick={() => {
                    setPageNumber(pageNumber + 1)
                    console.log(pageNumber);
                }} className="cursor-pointer w-[6rem]">
                    Next {'>'}
                </Button>
            </div>

            <Button onClick={() => {
                const requestData = personTable ? personTable[0] : null;
                
                fetch("/api/person/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestData)
                })
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'mailLabel.pdf';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => console.error('Error:', error));
                
            }}>
                Click
            </Button>
        </div>

    );
};

export default DataTable;
