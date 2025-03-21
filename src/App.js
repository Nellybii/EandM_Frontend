import React, { useState, useEffect, useCallback } from "react";
import "../src/app.css";
import axios from "axios";
import PolicyForm from "../src/components/PolicyForm";
import PolicyList from "../src/components/PolicyList";
import FilterPolicy from "./components/FilterPolicy";

const API_URL = "http://localhost:3000/api/policies";

const App = () => {
    const [policies, setPolicies] = useState([]);
    const [filteredPolicies, setFilteredPolicies] = useState([]);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get(API_URL);
                setPolicies(response.data);
                setFilteredPolicies(response.data);
            } catch (error) {
                console.error("Error fetching policies:", error);
            }
        };
        fetchPolicies();
    }, []);

    const addPolicy = useCallback(async (policy) => {
        try {
            const response = await axios.post(API_URL, policy);
            setPolicies(prevPolicies => [...prevPolicies, response.data]);
            setFilteredPolicies(prevPolicies => [...prevPolicies, response.data]);
            alert('Policy added successfully');
        } catch (error) {
            console.error("Error adding policy:", error.response?.data || error.message);
        }
    }, []);

    const editPolicy = useCallback(async (id, updatedPolicy) => {
        if (!updatedPolicy || Object.keys(updatedPolicy).length === 0) {
            console.error("Error: updatedPolicy is empty or undefined");
            return;
        }

        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedPolicy);
            setPolicies(prevPolicies => prevPolicies.map(p => (p.id === id ? response.data : p)));
            setFilteredPolicies(prevPolicies => prevPolicies.map(p => (p.id === id ? response.data : p)));
            alert('Policy updated successfully');
        } catch (error) {
            console.error("Error updating policy:", error.response?.data || error.message);
        }
    }, []);

    const deletePolicy = useCallback(async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setPolicies(prevPolicies => prevPolicies.filter(p => p.id !== id));
            setFilteredPolicies(prevPolicies => prevPolicies.filter(p => p.id !== id));
            alert('Policy deleted successfully');
        } catch (error) {
            console.error("Error deleting policy:", error.response?.data || error.message);
        }
    }, []);

    const handleSearch = useCallback((searchTerm) => {
        if (!searchTerm) {
            setFilteredPolicies(policies);
            return;
        }

        const filtered = policies.filter(policy =>
            (policy.policyName && policy.policyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (policy.policyHolder && policy.policyHolder.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        setFilteredPolicies(filtered);
    }, [policies]);

    return (
        <div className="app-container">
            <h1>Insurance Dashboard</h1>
            <PolicyForm addPolicy={addPolicy} />
            <FilterPolicy onSearch={handleSearch} />
            <PolicyList policies={filteredPolicies} editPolicy={editPolicy} deletePolicy={deletePolicy} />
        </div>
    );
};

export default App;
