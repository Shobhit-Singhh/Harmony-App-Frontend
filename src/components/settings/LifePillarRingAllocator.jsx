import React, { useEffect, useRef, useState } from "react";

const COLORS = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Amber
    "#8B5CF6"  // Purple
];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const LifePillarRingAllocator = ({ pillars = ["Work", "Health", "Relationships", "Growth"], values = [0.25, 0.25, 0.25, 0.25], onChange }) => {
    const svgRef = useRef(null);
    const centerX = 150;
    const centerY = 150;
    const outerRadius = 120;
    const innerRadius = 75;

    const initializeValues = () => {
        if (!values || values.length !== pillars.length) {
            return new Array(pillars.length).fill(1 / Math.max(1, pillars.length));
        }

        const sum = values.reduce((s, v) => s + v, 0);
        if (Math.abs(sum - 1) < 0.01) {
            return values;
        }
        return values.map(v => v / (sum || 1));
    };

    const valuesSafe = initializeValues();

    const initialPositions = valuesSafe
        .reduce((acc, v) => {
            const prev = acc.length ? acc[acc.length - 1] : 0;
            acc.push(prev + v);
            return acc;
        }, [])
        .slice(0, -1);

    const [positions, setPositions] = useState(initialPositions);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const newSafe = initializeValues();
        const newPositions = newSafe
            .reduce((acc, v) => {
                const prev = acc.length ? acc[acc.length - 1] : 0;
                acc.push(prev + v);
                return acc;
            }, [])
            .slice(0, -1);
        setPositions(newPositions);
    }, [JSON.stringify(values), pillars.length]);

    const computeSegments = (pos) => {
        if (pillars.length === 0) return [];
        const segs = [];
        let prev = 0;
        for (let i = 0; i < pillars.length - 1; i++) {
            segs.push(clamp(pos[i] - prev, 0, 1));
            prev = pos[i];
        }
        segs.push(clamp(1 - prev, 0, 1));
        return segs;
    };

    const fireChange = (pos) => {
        const segs = computeSegments(pos);
        const total = segs.reduce((s, x) => s + x, 0) || 1;
        const normalized = segs.map((s) => s / total);
        onChange?.(normalized);
    };

    const positionToAngle = (x, y) => {
        const dx = x - centerX;
        const dy = y - centerY;
        let angle = Math.atan2(dy, dx);
        let normalized = (angle + Math.PI / 2) / (2 * Math.PI);
        if (normalized < 0) normalized += 1;
        return normalized;
    };

    const createArcPath = (startAngle, endAngle) => {
        const start = startAngle * 2 * Math.PI - Math.PI / 2;
        const end = endAngle * 2 * Math.PI - Math.PI / 2;

        const x1 = centerX + Math.cos(start) * outerRadius;
        const y1 = centerY + Math.sin(start) * outerRadius;
        const x2 = centerX + Math.cos(end) * outerRadius;
        const y2 = centerY + Math.sin(end) * outerRadius;
        const x3 = centerX + Math.cos(end) * innerRadius;
        const y3 = centerY + Math.sin(end) * innerRadius;
        const x4 = centerX + Math.cos(start) * innerRadius;
        const y4 = centerY + Math.sin(start) * innerRadius;

        const largeArc = (endAngle - startAngle) > 0.5 ? 1 : 0;

        return `
            M ${x1} ${y1}
            A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
            L ${x3} ${y3}
            A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
            Z
        `;
    };

    const startDrag = (i, clientX, clientY) => {
        setDraggingIndex(i);
        const svg = svgRef.current;
        if (!svg) return;

        const move = (mx, my) => {
            const rect = svg.getBoundingClientRect();
            const x = mx - rect.left;
            const y = my - rect.top;

            let newPos = positionToAngle(x, y);

            const leftBound = i === 0 ? 0 : positions[i - 1];
            const rightBound = i === positions.length - 1 ? 1 : positions[i + 1];
            newPos = clamp(newPos, leftBound, rightBound);

            const next = positions.slice();
            next[i] = newPos;
            setPositions(next);
            fireChange(next);
        };

        const onMouseMove = (e) => move(e.clientX, e.clientY);
        const onTouchMove = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            move(touch.clientX, touch.clientY);
        };
        const onMouseUp = () => {
            setDraggingIndex(null);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onMouseUp);

        move(clientX, clientY);
    };

    const segments = computeSegments(positions);

    const segmentData = [];
    let currentAngle = 0;
    for (let i = 0; i < pillars.length; i++) {
        const segmentSize = segments[i];
        segmentData.push({
            name: pillars[i],
            startAngle: currentAngle,
            endAngle: currentAngle + segmentSize,
            percentage: Math.round(segmentSize * 100),
            color: COLORS[i % COLORS.length]
        });
        currentAngle += segmentSize;
    }

    if (pillars.length === 0) {
        return (
            <div className="text-center text-gray-400 py-8">
                No life pillars configured
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Life Priority Balance</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Ring Allocator */}
                    <div className="flex-shrink-0">
                        <svg
                            ref={svgRef}
                            width="300"
                            height="300"
                            style={{ userSelect: "none", touchAction: "none" }}
                        >
                            {/* Segments */}
                            {segmentData.map((seg, i) => (
                                <path
                                    key={i}
                                    d={createArcPath(seg.startAngle, seg.endAngle)}
                                    fill={seg.color}
                                    stroke="white"
                                    strokeWidth="3"
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.4,
                                        transition: "opacity 200ms ease",
                                        cursor: "pointer",
                                    }}
                                />
                            ))}

                            {/* Center Circle */}
                            <circle
                                cx={centerX}
                                cy={centerY}
                                r={innerRadius}
                                fill="white"
                                stroke="#E5E7EB"
                                strokeWidth="2"
                            />
                            
                            <text
                                x={centerX}
                                y={centerY - 5}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="14"
                                fontWeight="600"
                                fill="#374151"
                            >
                                Balance
                            </text>
                            <text
                                x={centerX}
                                y={centerY + 12}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="11"
                                fill="#9CA3AF"
                            >
                                Drag to adjust
                            </text>

                            {/* Draggable Handles */}
                            {positions.map((p, i) => {
                                const angle = p * 2 * Math.PI - Math.PI / 2;
                                const handleRadius = (outerRadius + innerRadius) / 2;
                                const x = centerX + Math.cos(angle) * handleRadius;
                                const y = centerY + Math.sin(angle) * handleRadius;

                                return (
                                    <g
                                        key={i}
                                        onMouseDown={(e) => startDrag(i, e.clientX, e.clientY)}
                                        onTouchStart={(e) => {
                                            e.preventDefault();
                                            const touch = e.touches[0];
                                            startDrag(i, touch.clientX, touch.clientY);
                                        }}
                                        style={{ cursor: "grab" }}
                                    >
                                        <circle
                                            cx={x}
                                            cy={y}
                                            r="10"
                                            fill="white"
                                            stroke="#6B7280"
                                            strokeWidth="2"
                                            style={{
                                                filter: draggingIndex === i
                                                    ? "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                                                    : "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                                            }}
                                        />
                                        <circle cx={x} cy={y} r="3" fill="#374151" />
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Legend */}
                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {segmentData.map((seg, i) => (
                                <div
                                    key={seg.name}
                                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.5,
                                        transition: "opacity 200ms ease",
                                        cursor: "pointer"
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            style={{
                                                width: 12,
                                                height: 12,
                                                background: seg.color,
                                                borderRadius: "3px",
                                            }}
                                        />
                                        <span className="font-medium text-gray-700 capitalize">
                                            {seg.name}
                                        </span>
                                    </div>
                                    <span className="text-lg font-semibold text-gray-800 tabular-nums">
                                        {seg.percentage}%
                                    </span>
                                </div>
                            ))}
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-4">
                            Adjust the ring segments to reflect how you want to prioritize different areas of your life.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LifePillarRingAllocator;