import React, { useState } from "react";

const FilterPolicy = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); 
    };

    return (
        <div>
            <h2>Filter Policies By Name</h2>
            <input 
                type="text" 
                placeholder="Search policies..." 
                value={searchTerm} 
                onChange={handleChange} 
            />
        </div>
    );
};

export default FilterPolicy;
