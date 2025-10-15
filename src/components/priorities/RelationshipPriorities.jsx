import React from "react";
import { Users } from "lucide-react";
import PillarSetup from "./PillarSetup";

const RelationshipPriorities = ({ formData, setFormData }) => {
    return (
        <PillarSetup
            pillar="relationships"
            icon={<Users size={32} />}
            color="from-pink-500 to-rose-500"
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default RelationshipPriorities;