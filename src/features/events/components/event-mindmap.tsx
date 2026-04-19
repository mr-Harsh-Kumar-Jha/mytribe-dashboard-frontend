import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { MindmapNode } from './mindmap-node';
import { generateMindmapData } from '../utils/mindmap-generator';
import { dummyEventsData } from '../data/dummy-data';

export function EventMindmap({ eventId }: { eventId: string }) {
  // We keep track of which nodes are expanded. Root is always expanded initially.
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  // Find event data or fallback to first one
  const eventData = useMemo(() => {
    const index = parseInt(eventId) - 1;
    return dummyEventsData[index] || dummyEventsData[0];
  }, [eventId]);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    return generateMindmapData(eventData, expandedNodes);
  }, [eventData, expandedNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // When eventData or expandedNodes change, update the nodes and edges
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateMindmapData(eventData, expandedNodes);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [eventData, expandedNodes, setNodes, setEdges]);
  
  // Custom node types
  const nodeTypes = useMemo(() => ({ mindmapNode: MindmapNode }), []);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      // Toggle expand/collapse if the node has children
      if (node.data?.hasChildren) {
        setExpandedNodes((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(node.id)) {
            newSet.delete(node.id);
          } else {
            newSet.add(node.id);
          }
          return newSet;
        });
      }
    },
    []
  );

  return (
    <div className="w-full h-[80vh] rounded-xl border bg-background overflow-hidden relative shadow-inner">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, duration: 800 }}
        minZoom={0.1}
        maxZoom={1.5}
        className="bg-slate-50 dark:bg-slate-900/50 transition-all"
        proOptions={{ hideAttribution: true }}
      >
        <Controls className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm" />
        <MiniMap 
          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg shadow-sm" 
          maskColor="rgba(0,0,0,0.1)"
          nodeColor={(node) => {
            if (node.data?.type === 'root') return '#2563eb';
            if (node.data?.type === 'category') return '#475569';
            return '#cbd5e1';
          }}
        />
        <Background gap={16} size={1} color="#e2e8f0" />
      </ReactFlow>
    </div>
  );
}
