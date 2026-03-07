"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SatelliteMapProps {
    lat: number;
    lng: number;
    zoom?: number;
    label?: string;
    className?: string;
}

export const SatelliteMap = ({
    lat,
    lng,
    zoom = 15,
    label = "Property Location",
    className = "",
}: SatelliteMapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Create map
        const map = L.map(mapRef.current, {
            center: [lat, lng],
            zoom,
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false,
            dragging: true,
        });

        // Esri World Imagery — free satellite tiles, no API key required
        L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
                maxZoom: 19,
            }
        ).addTo(map);

        // Custom marker icon (inline SVG data URI to avoid broken default icon)
        const markerIcon = L.divIcon({
            className: "custom-map-marker",
            html: `
                <div style="
                    width: 32px; height: 32px;
                    background: rgba(55, 91, 210, 0.9);
                    border: 3px solid white;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    box-shadow: 0 4px 20px rgba(55, 91, 210, 0.5);
                ">
                    <div style="
                        width: 100%; height: 100%;
                        display: flex; align-items: center; justify-content: center;
                        transform: rotate(45deg);
                    ">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                    </div>
                </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -36],
        });

        // Add marker
        const marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);
        marker.bindPopup(
            `<div style="font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 0;">
                ${label}<br/>
                <span style="color: #666; font-weight: normal; font-size: 10px;">
                    ${lat.toFixed(6)}, ${lng.toFixed(6)}
                </span>
            </div>`,
            { className: "satellite-map-popup" }
        );

        // Add zoom control top-right
        L.control.zoom({ position: "topright" }).addTo(map);

        mapInstanceRef.current = map;

        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, [lat, lng, zoom, label]);

    return (
        <div className={`relative rounded-xl overflow-hidden border border-white/10 shadow-2xl ${className}`}>
            <div ref={mapRef} className="w-full h-full min-h-[300px]" />

            {/* Overlay gradient bottom */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none flex items-end px-4 pb-3 z-[1000]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                    Satellite View: {label}
                </span>
            </div>

            {/* Corner badge */}
            <div className="absolute top-3 left-3 z-[1000] px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                <span className="text-[8px] font-mono font-bold text-white/60 uppercase tracking-widest">
                    ESRI World Imagery • Live
                </span>
            </div>
        </div>
    );
};
