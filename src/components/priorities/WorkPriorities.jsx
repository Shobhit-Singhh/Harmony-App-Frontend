import React from "react";
import { Briefcase } from "lucide-react";
import PillarSetup from "./PillarSetup";

const WorkPriorities = ({ formData, setFormData }) => {
    return (
        <PillarSetup
            pillar="work"
            icon={<Briefcase size={32} />}
            color="from-blue-500 to-cyan-500"
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default WorkPriorities;