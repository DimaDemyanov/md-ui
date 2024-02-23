import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Define the item structure
interface Item {
    id: number;
    name: string;
    description: string;
    price: string;
}

// Mock data for items
const itemsData: Item[] = [
    { id: 1, name: 'Used Bicycle', description: 'A well-maintained mountain bike.', price: '$150' },
    { id: 2, name: 'Old Camera', description: 'Vintage camera, still works perfectly.', price: '$100' },
    { id: 3, name: 'Book Collection', description: 'A collection of classic literature books.', price: '$50' },
    // Add more items as needed
];

const MainPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Item[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const filteredItems = itemsData.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredItems);
    };

    return (
        <Box sx={{ flexGrow: 1, m: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Find Used Things
            </Typography>
            <Box component="form" onSubmit={handleSearchSubmit} noValidate sx={{ mb: 2 }}>
                <TextField
                    label="Search for items"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ mr: 1 }}
                />
                <Button type="submit" variant="contained" color="primary" startIcon={<SearchIcon />}>
                    Search
                </Button>
            </Box>
            <Box>
                {searchResults.length > 0 ? (
                    searchResults.map(item => (
                        <Card key={item.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">{item.name}</Typography>
                                <Typography color="text.secondary">{item.description}</Typography>
                                <Typography color="primary">{item.price}</Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>No results found.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default MainPage;
