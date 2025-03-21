import React, { useState } from "react";

const PolicyForm = ({ addPolicy }) => {
    const [policy, setPolicy] = useState({
        policyName: "",
        policyHolder: "",
        coverageAmount: "",
        premium: ""
    });

    const handleChange = (e) => {
        setPolicy({ ...policy, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPolicy(policy);
        setPolicy({ policyName: "", policyHolder: "", coverageAmount: "", premium: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="policyName" placeholder="Policy Name" onChange={handleChange} value={policy.policyName} required />
            <input type="text" name="policyHolder" placeholder="Policy Holder" onChange={handleChange} value={policy.policyHolder} required />
            <input type="number" name="coverageAmount" placeholder="Coverage Amount" onChange={handleChange} value={policy.coverageAmount} required />
            <input type="number" name="premium" placeholder="Premium" onChange={handleChange} value={policy.premium} required />
            <button type="submit">Add Policy</button>
        </form>
    );
};

export default PolicyForm;
