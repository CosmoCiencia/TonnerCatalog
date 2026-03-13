// src/modules/distributors/DistributorsMap.tsx

import { useEffect, useMemo, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, type ZoomBehavior } from 'd3-zoom';
import type { FeatureCollection, Feature, Geometry } from 'geojson';
import type { Distributor } from './types';

import colombiaGeo from './colombia.geo.json';

type DeptFeature = Feature<Geometry, any>;

function getDeptName(f: DeptFeature): string {
  const p = f.properties || {};
  return p.NOMBRE_DPT || p.NOMBRE || p.name || p.NAME_1 || p.DEPARTAMEN || 'Departamento';
}

interface Props {
  distributors: Distributor[];
  onSelect: (d: Distributor) => void;
  selectedId?: string | null;
  onDepartmentFocus?: (name: string | null) => void;
}

export default function DistributorsMap({
  distributors,
  onSelect,
  selectedId,
  onDepartmentFocus,
}: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // “Canvas” interno del svg
  const width = 1200;
  const height = 720;

  const projection = useMemo(() => {
    return geoMercator()
      .center([-74, 4])
      .scale(3100)
      .translate([width / 2, height / 2]);
  }, []);

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  const features = useMemo(() => {
    const fc = colombiaGeo as FeatureCollection;
    return (fc.features || []) as DeptFeature[];
  }, []);

  // Hover / Tooltip
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  // Mount zoom
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;

    const svg = select(svgRef.current);
    const g = select(gRef.current);

    const zb = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 10])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    zoomRef.current = zb;
    svg.call(zb as any);
    svg.call(zb.transform as any, zoomIdentity);

    return () => {
      svg.on('.zoom', null);
    };
  }, []);

  // Zoom a feature (departamento)
  const zoomToFeature = (f: DeptFeature) => {
    if (!svgRef.current || !zoomRef.current) return;

    const svg = select(svgRef.current);
    const zb = zoomRef.current;

    const b = pathGenerator.bounds(f);
    const [[x0, y0], [x1, y1]] = b;

    const dx = x1 - x0;
    const dy = y1 - y0;

    if (!isFinite(dx) || !isFinite(dy) || dx <= 0 || dy <= 0) return;

    const pad = 0.12;
    const scale = Math.max(1, Math.min(10, (1 - pad) / Math.max(dx / width, dy / height)));

    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;

    const t = zoomIdentity
      .translate(width / 2, height / 2)
      .scale(scale)
      .translate(-cx, -cy);

    svg
      .transition()
      .duration(650)
      .call(zb.transform as any, t);
  };

  // Center / zoom to distributor (cuando seleccionas tarjeta)
  const focusDistributor = (d: Distributor) => {
    if (!svgRef.current || !zoomRef.current) return;

    const svg = select(svgRef.current);
    const zb = zoomRef.current;

    const pt = projection([d.lng, d.lat]);
    if (!pt) return;

    const [x, y] = pt;
    const scale = 2.7;

    const t = zoomIdentity
      .translate(width / 2, height / 2)
      .scale(scale)
      .translate(-x, -y);

    svg
      .transition()
      .duration(650)
      .call(zb.transform as any, t);
  };

  // Cuando cambia el selectedId → centra el mapa a ese pin
  useEffect(() => {
    if (!selectedId) return;
    const d = distributors.find((x) => x.id === selectedId);
    if (!d) return;
    focusDistributor(d);
  }, [selectedId, distributors]);

  const resetZoom = () => {
    if (!svgRef.current || !zoomRef.current) return;
    const svg = select(svgRef.current);
    svg
      .transition()
      .duration(600)
      .call(zoomRef.current.transform as any, zoomIdentity);
    onDepartmentFocus?.(null);
  };

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="
          w-full
          h-[72vh] md:h-[80vh]
          rounded-3xl
          border
          bg-gradient-to-br from-slate-50 to-slate-100
          shadow-[0_20px_60px_rgba(15,23,42,0.12)]
          cursor-grab
          select-none
        "
        onDoubleClick={resetZoom}
      >
        <defs>
          <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g ref={gRef}>
          {/* Departamentos */}
          {features.map((feature, i) => {
            const name = getDeptName(feature);
            const isHover = hoveredDept === name;

            return (
              <path
                key={i}
                d={pathGenerator(feature) || ''}
                fill={isHover ? '#cfe3ff' : '#e5e7eb'}
                stroke={isHover ? '#2563eb' : '#cbd5e1'}
                strokeWidth={isHover ? 1.4 : 0.9}
                style={{ transition: 'all 120ms ease' }}
                onMouseEnter={(e) => {
                  setHoveredDept(name);
                  onDepartmentFocus?.(name);

                  const rect = (svgRef.current as SVGSVGElement).getBoundingClientRect();
                  setTooltip({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                    text: name,
                  });
                }}
                onMouseMove={(e) => {
                  if (!svgRef.current) return;
                  const rect = svgRef.current.getBoundingClientRect();
                  setTooltip({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                    text: name,
                  });
                }}
                onMouseLeave={() => {
                  setHoveredDept(null);
                  setTooltip(null);
                  onDepartmentFocus?.(null);
                }}
                onClick={() => zoomToFeature(feature)}
              />
            );
          })}

          {/* Pins */}
          {distributors.map((d) => {
            const pt = projection([d.lng, d.lat]);
            if (!pt) return null;
            const [x, y] = pt;

            const active = selectedId === d.id;

            return (
              <g
                key={d.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer"
                onClick={() => onSelect(d)}
              >
                {/* halo */}
                <circle r={active ? 22 : 16} fill="#f97316" opacity={active ? 0.22 : 0.14} />
                {/* pin */}
                <circle
                  r={active ? 9 : 7}
                  fill="#f97316"
                  stroke="#ffffff"
                  strokeWidth={2}
                  filter="url(#pinGlow)"
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Tooltip depto */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-20 -translate-y-2"
          style={{ left: tooltip.x + 10, top: tooltip.y - 10 }}
        >
          <div className="bg-slate-900 text-white text-xs px-3 py-1 rounded-full shadow">
            {tooltip.text}
          </div>
        </div>
      )}

      {/* Hint */}
      <div className="absolute left-4 bottom-4 z-10">
        <div className="text-xs text-slate-600 bg-white/80 backdrop-blur px-3 py-1 rounded-full shadow">
          Scroll = zoom · Arrastra = mover · Click depto = enfocar · Doble click vacío = reset
        </div>
      </div>
    </div>
  );
}
