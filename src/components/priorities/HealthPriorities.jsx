import React from "react";
import { Heart } from "lucide-react";
import PillarSetup from "./PillarSetup";

const HealthPriorities = ({ formData, setFormData }) => {
    return (
        <PillarSetup
            pillar="health"
            icon={<Heart size={32} />}
            color="from-red-500 to-pink-500"
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default HealthPriorities;