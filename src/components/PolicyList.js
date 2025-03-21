import React, { useState } from "react";

const PolicyList = ({ policies, editPolicy, deletePolicy }) => {
    const [editing, setEditing] = useState(null);
    const [updatedPolicy, setUpdatedPolicy] = useState({});

    const handleEditClick = (policy) => {
        setEditing(policy.id);
        setUpdatedPolicy({...policy});
    };

    const handleChange = (e) => {
        setUpdatedPolicy({ ...updatedPolicy, [e.target.name]: e.target.value });
    };

    const handleUpdate = (id, updatedPolicy) => {
        if (!updatedPolicy || Object.keys(updatedPolicy).length === 0) {
            console.error("Error: updatedPolicy is undefined or empty");
            return;
        }
    
        editPolicy(id, updatedPolicy);
        setEditing(null);
    };
    

    return (
        <div>
            <h2>Insurance Policies</h2>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Policy Name</th>
                        <th>Policy Holder</th>
                        <th>Coverage Amount</th>
                        <th>Premium</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy) => (
                        <tr key={policy.id}>
                            {editing === policy.id ? (
                                <>
                                    <td><input type="text" name="policyname" value={updatedPolicy.policyname} onChange={handleChange} /></td>
                                    <td><input type="text" name="policyholder" value={updatedPolicy.policyholder} onChange={handleChange} /></td>
                                    <td><input type="number" name="coverageamount" value={updatedPolicy.coverageamount} onChange={handleChange} /></td>
                                    <td><input type="number" name="premium" value={updatedPolicy.premium} onChange={handleChange} /></td>
                                    <td>
                                        <button onClick={() => handleUpdate(policy.id)}>Save</button>
                                        <button onClick={() => setEditing(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{policy.policyname}</td>
                                    <td>{policy.policyholder}</td>
                                    <td>${policy.coverageamount}</td>
                                    <td>${policy.premium}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(policy)}>Edit</button>
                                        <button onClick={() => deletePolicy(policy.id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PolicyList;
