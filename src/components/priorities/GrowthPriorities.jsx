import React from "react";
import { TrendingUp } from "lucide-react";
import PillarSetup from "./PillarSetup";

const GrowthPriorities = ({ formData, setFormData }) => {
    return (
        <PillarSetup
            pillar="growth"
            icon={<TrendingUp size={32} />}
            color="from-purple-500 to-indigo-500"
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default GrowthPriorities;