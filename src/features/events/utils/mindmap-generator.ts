import { MarkerType, Edge, Node } from '@xyflow/react';

export function generateMindmapData(event: any, expandedNodes: Set<string>) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const addEdge = (source: string, target: string, sourceHandle: string, targetHandle: string, color = '#94a3b8') => {
    edges.push({
      id: `e-${source}-${target}`,
      source,
      target,
      sourceHandle,
      targetHandle,
      type: 'smoothstep',
      animated: true,
      style: { strokeWidth: 2, stroke: color },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: color,
      },
    });
  };

  const addNode = (
    id: string, 
    label: string, 
    type: string, 
    x: number, 
    y: number, 
    icon: string = '', 
    value?: string | number,
    hasChildren: boolean = false,
    isExpanded: boolean = false
  ) => {
    nodes.push({
      id,
      type: 'mindmapNode',
      position: { x, y },
      data: { label, type, icon, value, hasChildren, isExpanded }
    });
  };

  // Root Node
  const rootLabel = `${event['Event Name'] || 'Event Name'}\n${event['Organizer'] || 'Organizer'}`;
  const isRootExpanded = expandedNodes.has('root');
  addNode('root', rootLabel, 'root', 0, 0, 'root', undefined, true, isRootExpanded);

  if (!isRootExpanded) {
    return { nodes, edges }; // Only show root if it's collapsed
  }

  // Categories definition
  const categories = [
    {
      id: 'history', title: 'HISTORY', side: 'left', icon: 'history', color: '#6366f1',
      children: [
        { id: 'h-insta', label: 'Insta Reach', value: event['Insta Reach'] ? `${event['Insta Reach']}` : 'TBD' },
        { id: 'h-linkedin', label: 'LinkedIn', value: event['LinkedIn'] || 'TBD' },
        { id: 'h-fb', label: 'Facebook', value: event['Facebook Reach'] ? `${event['Facebook Reach']}` : 'TBD' },
        { id: 'h-years', label: 'Years Active', value: event['Years Active'] ? `${event['Years Active']}` : 'TBD' },
        { id: 'h-past', label: 'Past Events', value: event['Past Events'] ? `${event['Past Events']}` : 'TBD' },
        { id: 'h-cred', label: 'Team Credibility', value: event['Team Credibility'] || 'TBD' },
      ]
    },
    {
      id: 'persona', title: 'PERSONA', side: 'left', icon: 'persona', color: '#8b5cf6',
      children: [
        { id: 'p-demo', label: 'Demographic', value: event['Demographic'] || 'TBD' },
        { id: 'p-psycho', label: 'Psychographic', value: event['Psychographic'] || 'TBD' },
        { id: 'p-age', label: 'Age Group', value: '18-35' }, // Dummy
        { id: 'p-income', label: 'Income Level', value: event['Income Level'] || 'TBD' },
        { id: 'p-interests', label: 'Interests', value: event['Psychographic'] || 'TBD' },
        { id: 'p-buying', label: 'Buying Power', value: event['Buying Power'] || 'TBD' },
      ]
    },
    {
      id: 'sponsorfit', title: 'SPONSOR FIT', side: 'left', icon: 'star', color: '#10b981',
      children: [
        { id: 'sf-match', label: 'Brand Match %', value: event['Brand Match %'] ? `${event['Brand Match %']}%` : 'TBD' },
        { id: 'sf-overlap', label: 'Audience Overlap', value: 'High' }, // Dummy
        { id: 'sf-comp', label: 'Competitor Presence', value: 'Low' }, // Dummy
        { id: 'sf-relev', label: 'Category Relevance', value: 'Very High' }, // Dummy
      ]
    },
    {
      id: 'socialbuzz', title: 'SOCIAL BUZZ', side: 'left', icon: 'instagram', color: '#ec4899',
      children: [
        { id: 'sb-reg', label: 'Registration Trend', value: '+12% WoW' }, // Dummy
        { id: 'sb-viral', label: 'Viral Potential', value: event['Viral Potential'] || 'TBD' },
        { id: 'sb-influencer', label: 'Influencer Presence', value: '10+ Confirmed' }, // Dummy
        { id: 'sb-mentions', label: 'Social Mentions', value: '4.5k/week' }, // Dummy
      ]
    },
    {
      id: 'details', title: 'EVENT DETAILS', side: 'right', icon: 'details', color: '#3b82f6',
      children: [
        { id: 'd-loc', label: 'Location', value: event['Location'] || 'TBD' },
        { id: 'd-date', label: 'Date / Duration', value: `${event['Date'] || ''} (${event['Duration'] || ''})` },
        { id: 'd-venue', label: 'Venue Quality', value: 'Premium' }, // Dummy
        { id: 'd-footfall', label: 'Footfall Expected', value: event['Expected Footfall'] ? `${event['Expected Footfall']}` : 'TBD' },
        { id: 'd-ticket', label: 'Ticket Price', value: event['Ticket Price'] ? `₹${event['Ticket Price']}` : 'TBD' },
        { id: 'd-cat', label: 'Event Category', value: event['Category'] || 'TBD' },
      ]
    },
    {
      id: 'lastsponsor', title: 'LAST SPONSOR', side: 'right', icon: 'history', color: '#f59e0b',
      children: [
        { id: 'ls-sat', label: 'Satisfaction', value: event['Last Sponsor Satisfaction'] ? `${event['Last Sponsor Satisfaction']}/10` : 'TBD' },
        { id: 'ls-roi', label: 'ROI Delivered', value: '3.2x' }, // Dummy
        { id: 'ls-rating', label: 'Rating', value: event['Last Sponsor Satisfaction'] ? `${event['Last Sponsor Satisfaction']}/10` : 'TBD' },
        { id: 'ls-ren', label: 'Renewal %', value: event['Renewal %'] ? `${event['Renewal %']}%` : 'TBD' },
        { id: 'ls-test', label: 'Testimonial', value: 'Positive' }, // Dummy
        { id: 'ls-brands', label: 'Brand Names', value: 'RedBull, Monster' }, // Dummy
      ]
    },
    {
      id: 'roiforecast', title: 'ROI FORECAST', side: 'right', icon: 'trendingup', color: '#06b6d4',
      children: [
        { id: 'rf-cost', label: 'Cost per Reach', value: event['Cost per Reach'] ? `₹${event['Cost per Reach']}` : 'TBD' },
        { id: 'rf-leads', label: 'Leads Expected', value: event['Leads Expected'] ? `${event['Leads Expected']}` : 'TBD' },
        { id: 'rf-booth', label: 'Booth Footfall', value: event['Booth Footfall'] ? `${event['Booth Footfall']}` : 'TBD' },
        { id: 'rf-sales', label: 'Sales Potential', value: 'High' }, // Dummy
      ]
    },
    {
      id: 'riskscore', title: 'RISK SCORE', side: 'right', icon: 'info', color: '#ef4444',
      children: [
        { id: 'rs-weather', label: 'Weather Risk', value: 'Low' }, // Dummy
        { id: 'rs-att', label: 'Low Attendance', value: 'Low' }, // Dummy
        { id: 'rs-org', label: 'Organizer Risk', value: 'Low' }, // Dummy
        { id: 'rs-rep', label: 'Reputation Risk', value: 'Low' }, // Dummy
        { id: 'rs-overall', label: 'Overall Risk', value: event['Risk'] || 'TBD' },
      ]
    },
    {
      id: 'recommendation', title: 'FINAL RECOMMENDATION', side: 'bottom', icon: 'star', color: '#22c55e',
      children: [
        { id: 'fr-rec', label: 'Recommendation', value: event['Recommendation'] || 'TBD' },
        { id: 'fr-budget', label: 'Suggested Budget', value: event['Suggested Budget'] ? `₹${event['Suggested Budget']}` : 'TBD' },
        { id: 'fr-type', label: 'Best Sponsorship Type', value: event['Best Sponsorship Type'] || 'TBD' },
      ]
    }
  ];

  const leftCategories = categories.filter(c => c.side === 'left');
  const rightCategories = categories.filter(c => c.side === 'right');
  const bottomCategories = categories.filter(c => c.side === 'bottom');

  const hOffsetCategory = 400;
  const hOffsetChildren = 750;
  const childSpacing = 75;
  const categorySpacing = 80;
  const categoryBaseHeight = 60;
  
  // Helper to layout a side column of categories
  const layoutColumn = (cats: any[], xDir: number) => {
    // Calculate required height for each category subtree
    const catHeights = cats.map(cat => {
      if (!expandedNodes.has(cat.id)) {
        return categoryBaseHeight;
      }
      return Math.max(categoryBaseHeight, cat.children.length * childSpacing);
    });

    const totalHeight = catHeights.reduce((a, b) => a + b, 0) + (cats.length - 1) * categorySpacing;
    let currentY = -totalHeight / 2;

    cats.forEach((cat, index) => {
      const subtreeHeight = catHeights[index];
      const catCenterY = currentY + subtreeHeight / 2;
      
      const catX = xDir * hOffsetCategory;
      const isCatExpanded = expandedNodes.has(cat.id);
      
      addNode(cat.id, cat.title, 'category', catX, catCenterY, cat.icon, undefined, true, isCatExpanded);
      
      const rootSource = xDir < 0 ? 'left-source' : 'right-source';
      const catTarget = xDir < 0 ? 'right-target' : 'left-target';
      addEdge('root', cat.id, rootSource, catTarget, cat.color);

      // Children layout
      if (isCatExpanded) {
        const numChildren = cat.children.length;
        const childrenTotalHeight = (numChildren - 1) * childSpacing;
        const startChildY = catCenterY - childrenTotalHeight / 2;

        cat.children.forEach((child: any, cIndex: number) => {
          const childY = startChildY + cIndex * childSpacing;
          const childX = xDir * hOffsetChildren;
          addNode(child.id, child.label, 'leaf', childX, childY, '', child.value, false, false);
          
          const catSource = xDir < 0 ? 'left-source' : 'right-source';
          const childTarget = xDir < 0 ? 'right-target' : 'left-target';
          addEdge(cat.id, child.id, catSource, childTarget, cat.color);
        });
      }

      currentY += subtreeHeight + categorySpacing;
    });
  };

  layoutColumn(leftCategories, -1);
  layoutColumn(rightCategories, 1);

  // Layout bottom category
  bottomCategories.forEach((cat) => {
    const isCatExpanded = expandedNodes.has(cat.id);
    const catY = 300;
    const catX = 0;
    
    addNode(cat.id, cat.title, 'category', catX, catY, cat.icon, undefined, true, isCatExpanded);
    addEdge('root', cat.id, 'bottom-source', 'top-target', cat.color);

    if (isCatExpanded) {
      const bChildSpacing = 300;
      const childStartX = -((cat.children.length - 1) * bChildSpacing) / 2;
      cat.children.forEach((child: any, cIndex: number) => {
        const childY = catY + 150;
        const childX = childStartX + cIndex * bChildSpacing;
        addNode(child.id, child.label, 'leaf', childX, childY, '', child.value, false, false);
        addEdge(cat.id, child.id, 'bottom-source', 'top-target', cat.color);
      });
    }
  });

  return { nodes, edges };
}
