// src/components/settings/WellnessInfoForm.jsx
import React, { useState } from "react";
import { Trash2, Phone } from "lucide-react";

// Inline Button component for demo
const Button = ({ children, onClick, variant = "primary", className = "" }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        danger: "bg-red-500 hover:bg-red-600 text-white"
    };
    return (
        <button 
            onClick={onClick} 
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

// Import your LifePillarRingAllocator component
import LifePillarRingAllocator from "./LifePillarRingAllocator";

const WellnessInfoForm = ({ profile, setProfile }) => {
    const [newMedication, setNewMedication] = useState({ name: "", dosage: "", frequency: "" });
    const [newCondition, setNewCondition] = useState("");

    // ---- Medications ----
    const addMedication = () => {
        if (!newMedication.name.trim()) return;
        setProfile(prev => ({
            ...prev,
            medications: [...(prev.medications || []), { ...newMedication }]
        }));
        setNewMedication({ name: "", dosage: "", frequency: "" });
    };

    const removeMedication = (index) => {
        setProfile(prev => ({
            ...prev,
            medications: prev.medications.filter((_, i) => i !== index)
        }));
    };

    // ---- Health Conditions ----
    const addCondition = () => {
        if (!newCondition.trim()) return;
        setProfile(prev => ({
            ...prev,
            conditions: [...(prev.conditions || []), newCondition.trim()]
        }));
        setNewCondition("");
    };

    const removeCondition = (index) => {
        setProfile(prev => ({
            ...prev,
            conditions: prev.conditions.filter((_, i) => i !== index)
        }));
    };

    // ---- Life Pillar Weights Handler ----
    const handleLifePillarChange = (newValues) => {
        // Get the pillar names in the correct order
        const pillarKeys = Object.keys(profile.primary_pillar_weights || {});
        
        // Create updated weights object
        const updated = {};
        pillarKeys.forEach((key, index) => {
            updated[key] = newValues[index] ?? 0;
        });
        
        // Update profile with new weights
        setProfile(prev => ({
            ...prev,
            primary_pillar_weights: updated
        }));
    };

    // ---- Emergency Contact ----
    const handleCrisisContactChange = (value) => {
        setProfile(prev => ({ ...prev, crisis_contact: value }));
    };

    // Extract pillars and values for the ring allocator
    const pillarKeys = Object.keys(profile.primary_pillar_weights || {});
    const pillarValues = pillarKeys.map(key => profile.primary_pillar_weights[key] || 0);

    return (
        <div className="space-y-8 p-6">
            {/* Life Pillar Weights - Ring Allocator */}
            <div className="space-y-4">
                <LifePillarRingAllocator
                    pillars={pillarKeys}
                    values={pillarValues}
                    onChange={handleLifePillarChange}
                />
            </div>

            {/* Medications Section */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Current Medications</h3>
                
                {/* Add Medication Form */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                        type="text"
                        placeholder="Medication name"
                        value={newMedication.name}
                        onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                        className="px-3 py-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="Dosage (e.g., 10mg)"
                        value={newMedication.dosage}
                        onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                        className="px-3 py-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="Frequency (e.g., 2x daily)"
                        value={newMedication.frequency}
                        onChange={(e) => setNewMedication(prev => ({ ...prev, frequency: e.target.value }))}
                        className="px-3 py-2 border rounded-lg"
                    />
                    <Button onClick={addMedication}>Add</Button>
                </div>

                {/* Medications List */}
                {profile.medications && profile.medications.length > 0 && (
                    <div className="space-y-2">
                        {profile.medications.map((med, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div>
                                    <span className="font-medium">{med.name}</span>
                                    {med.dosage && <span className="text-gray-600 ml-2">• {med.dosage}</span>}
                                    {med.frequency && <span className="text-gray-600 ml-2">• {med.frequency}</span>}
                                </div>
                                <button
                                    onClick={() => removeMedication(idx)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Health Conditions Section */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Health Conditions</h3>
                
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Add a health condition"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addCondition()}
                        className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <Button onClick={addCondition}>Add</Button>
                </div>

                {profile.conditions && profile.conditions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {profile.conditions.map((condition, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full"
                            >
                                <span>{condition}</span>
                                <button
                                    onClick={() => removeCondition(idx)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Crisis Contact</h3>
                <div className="flex items-center gap-3">
                    <Phone size={20} className="text-gray-500" />
                    <input
                        type="tel"
                        placeholder="Emergency contact number"
                        value={profile.crisis_contact || ""}
                        onChange={(e) => handleCrisisContactChange(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default WellnessInfoForm;