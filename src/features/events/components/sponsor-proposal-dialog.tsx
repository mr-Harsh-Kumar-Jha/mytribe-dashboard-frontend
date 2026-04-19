import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from '@tanstack/react-router';
import { toast } from '@/hooks/use-toast';
import { CheckCircle2, ShieldCheck, MonitorPlay, MessageSquare, Tent, Mic2, Database, Ticket, Flag, FileText, MapPin, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const TIERS = [
  { id: 'platinum', name: 'Platinum', price: '75,000' },
  { id: 'gold', name: 'Gold', price: '55,000' },
  { id: 'silver', name: 'Silver', price: '45,000' },
  { id: 'bronze', name: 'Bronze', price: '35,000' },
];

type BenefitValue = string | boolean;

export type Benefit = {
  id: string;
  icon: any;
  label: string;
  values: {
    platinum: BenefitValue;
    gold: BenefitValue;
    silver: BenefitValue;
    bronze: BenefitValue;
  };
  milestoneId: string;
};

const INITIAL_BENEFITS: Benefit[] = [
  { id: '1', icon: MonitorPlay, label: 'Logo on Main Banner', values: { platinum: true, gold: true, silver: true, bronze: true }, milestoneId: 'M1' },
  { id: '2', icon: MessageSquare, label: 'Social Media Mentions', values: { platinum: '10 Posts', gold: '6 Posts', silver: '3 Posts', bronze: '1 Post' }, milestoneId: 'M2' },
  { id: '3', icon: Tent, label: 'Booth Space', values: { platinum: 'Premium (6x6m)', gold: 'Standard (3x3m)', silver: 'Basic (2x2m)', bronze: 'Shared' }, milestoneId: 'M1' },
  { id: '4', icon: Mic2, label: 'Stage Opportunity', values: { platinum: '10 Minutes', gold: '5 Minutes', silver: '-', bronze: '-' }, milestoneId: 'M3' },
  { id: '5', icon: Database, label: 'Database Access', values: { platinum: '2000 Leads', gold: '1000 Leads', silver: '500 Leads', bronze: '100 Leads' }, milestoneId: 'M2' },
  { id: '6', icon: Ticket, label: 'Event Passes', values: { platinum: '10', gold: '6', silver: '4', bronze: '2' }, milestoneId: 'M1' },
  { id: '7', icon: Flag, label: 'Branding at Venue', values: { platinum: true, gold: true, silver: true, bronze: '-' }, milestoneId: 'M3' },
  { id: '8', icon: FileText, label: 'Press Release Mention', values: { platinum: true, gold: true, silver: '-', bronze: '-' }, milestoneId: 'M2' },
  { id: '9', icon: MapPin, label: 'On-ground Activation', values: { platinum: true, gold: true, silver: '-', bronze: '-' }, milestoneId: 'M3' },
];

const MILESTONES = [
  { id: 'M1', title: 'Milestone 1', subtitle: 'On Agreement', desc: 'Upon signing agreement & initial deliverables', percent: '45%', amount: 'Payable Before Event' },
  { id: 'M2', title: 'Milestone 2', subtitle: 'Pre-Event Deliverables', desc: 'Upon completion of pre-event promotions, branding & setup confirmation', percent: '30%', amount: 'Payable Before Event' },
  { id: 'M3', title: 'Milestone 3', subtitle: 'Final Confirmation', desc: 'Upon final verification of all deliverables & event readiness confirmation', percent: '25%', amount: 'Payable Before Event' },
];

export function SponsorProposalDialog({ 
  children, 
  eventName 
}: { 
  children: React.ReactNode;
  eventName: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('platinum');
  const [isEditing, setIsEditing] = useState(false);
  const [isCustomized, setIsCustomized] = useState(false);
  const [benefits, setBenefits] = useState(INITIAL_BENEFITS);
  const [proposedPrice, setProposedPrice] = useState('75,000');
  
  const navigate = useNavigate();

  // Update proposed price when tier changes (only if not actively editing a custom price)
  useEffect(() => {
    if (!isEditing && !isCustomized) {
      const tier = TIERS.find(t => t.id === selectedTier);
      if (tier) setProposedPrice(tier.price);
    }
  }, [selectedTier, isEditing, isCustomized]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setIsEditing(false);
      setIsCustomized(false);
      setBenefits(INITIAL_BENEFITS);
    }
  }, [open]);

  const handleProceed = () => {
    setOpen(false);
    if (isCustomized) {
      toast({
        title: "Proposal Sent to Chat",
        description: `Your custom proposal for ${eventName} has been forwarded to the Organizer for negotiation.`,
      });
      navigate({ to: '/chats' });
    } else {
      toast({
        title: "Sponsorship Request Sent",
        description: `Your request to sponsor ${eventName} under standard terms has been sent to the Organizer.`,
      });
    }
  };

  const updateBenefitValue = (id: string, tierId: keyof Benefit['values'], newValue: string | boolean) => {
    setBenefits(prev => prev.map(b => 
      b.id === id ? { ...b, values: { ...b.values, [tierId]: newValue } } : b
    ));
  };

  const updateBenefitLabel = (id: string, newLabel: string) => {
    setBenefits(prev => prev.map(b => 
      b.id === id ? { ...b, label: newLabel } : b
    ));
  };

  const updateBenefitMilestone = (id: string, newMilestoneId: string) => {
    setBenefits(prev => prev.map(b => 
      b.id === id ? { ...b, milestoneId: newMilestoneId } : b
    ));
  };

  const deleteBenefit = (id: string) => {
    setBenefits(prev => prev.filter(b => b.id !== id));
  };

  const addCustomBenefit = () => {
    const newId = `custom-${Date.now()}`;
    setBenefits(prev => [...prev, {
      id: newId,
      icon: Plus, // Generic icon for custom benefits
      label: 'New Custom Request',
      values: { platinum: '-', gold: '-', silver: '-', bronze: '-' },
      milestoneId: 'M1'
    }]);
  };

  const renderValue = (benefit: Benefit, tierId: keyof Benefit['values']) => {
    const val = benefit.values[tierId as keyof typeof benefit.values];
    const isSelected = selectedTier === tierId;

    if (isEditing && isSelected) {
      // Editable input for the selected tier
      const stringVal = val === true ? 'Yes' : (val === '-' ? '' : String(val));
      return (
        <Input 
          className="h-8 text-center text-sm font-medium border-rose-200 focus-visible:ring-rose-500 max-w-[120px]"
          value={stringVal}
          onChange={(e) => {
            const v = e.target.value;
            updateBenefitValue(benefit.id, tierId, v === '' ? '-' : (v.toLowerCase() === 'yes' ? true : v));
          }}
          placeholder="e.g. 5 Posts"
        />
      );
    }

    if (val === true) return <CheckCircle2 className="w-5 h-5 text-rose-500 mx-auto" />;
    if (val === '-') return <span className="text-muted-foreground">-</span>;
    return <span className={cn("text-sm", isSelected ? "font-semibold text-rose-700 dark:text-rose-400" : "text-slate-700 dark:text-slate-300")}>{val}</span>;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] lg:max-w-[1200px] p-0 overflow-hidden bg-slate-50 dark:bg-slate-950 border-none rounded-2xl shadow-2xl">
        
        {/* Main Layout Container */}
        <div className="flex flex-col lg:flex-row w-full h-[85vh] lg:h-[750px]">
          
          {/* LEFT: Pricing Table (flex-1) */}
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-y-auto relative">
            {/* Table Header */}
            <div className="sticky top-0 z-30 flex bg-white dark:bg-slate-900 border-b shadow-sm">
              <div className="w-[35%] p-6 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Overview</h2>
                    <p className="text-sm text-muted-foreground">Sponsorship Benefits</p>
                  </div>
                  {isEditing && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded text-[10px] font-bold uppercase tracking-wider animate-pulse">Edit Mode</span>
                  )}
                </div>
              </div>
              <div className="w-[65%] flex">
                {TIERS.map(tier => (
                  <button 
                    key={tier.id}
                    onClick={() => !isEditing && setSelectedTier(tier.id)}
                    disabled={isEditing}
                    className={cn(
                      "flex-1 p-4 flex flex-col items-center justify-center transition-all relative",
                      !isEditing && "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50",
                      selectedTier === tier.id 
                        ? "bg-rose-50 dark:bg-rose-950/30" 
                        : ""
                    )}
                  >
                    <span className={cn("font-semibold", selectedTier === tier.id ? "text-rose-600 dark:text-rose-400" : "text-slate-800 dark:text-slate-200")}>{tier.name}</span>
                    <span className="text-sm text-muted-foreground font-medium">₹{tier.price}</span>
                    
                    {/* Active state styling borders */}
                    {selectedTier === tier.id && (
                      <div className="absolute inset-0 border-x-2 border-t-2 border-rose-400 dark:border-rose-600 rounded-t-xl z-10 pointer-events-none shadow-[inset_0_4px_10px_-5px_rgba(225,29,72,0.3)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Body */}
            <div className="flex-1 pb-24">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.id} className="flex border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                    <div className="w-[35%] p-3 flex items-center gap-3">
                      {isEditing && (
                        <select 
                          className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none rounded py-1 px-1 cursor-pointer focus:ring-1 focus:ring-rose-500"
                          value={benefit.milestoneId}
                          onChange={(e) => updateBenefitMilestone(benefit.id, e.target.value)}
                        >
                          <option value="M1">M1</option>
                          <option value="M2">M2</option>
                          <option value="M3">M3</option>
                        </select>
                      )}
                      
                      {!isEditing && (
                        <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-rose-500" />
                        </div>
                      )}

                      {isEditing ? (
                        <Input 
                          value={benefit.label} 
                          onChange={(e) => updateBenefitLabel(benefit.id, e.target.value)}
                          className="h-8 text-sm font-medium border-transparent hover:border-slate-200 focus-visible:border-rose-300 focus-visible:ring-rose-500 px-2"
                        />
                      ) : (
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{benefit.label}</span>
                      )}
                    </div>
                    
                    <div className="w-[65%] flex relative">
                      {TIERS.map(tier => (
                        <div 
                          key={tier.id} 
                          className={cn(
                            "flex-1 p-3 flex items-center justify-center text-center relative transition-colors",
                            selectedTier === tier.id ? (isEditing ? "bg-rose-100/50 dark:bg-rose-900/20" : "bg-rose-50 dark:bg-rose-950/30") : ""
                          )}
                        >
                          {renderValue(benefit, tier.id as keyof typeof benefit.values)}
                          {selectedTier === tier.id && (
                            <div className={cn(
                              "absolute inset-x-0 border-x-2 border-rose-400 dark:border-rose-600 z-10 pointer-events-none",
                              i === benefits.length - 1 ? "border-b-2 rounded-b-xl bottom-0 top-0" : "inset-y-0"
                            )} />
                          )}
                        </div>
                      ))}
                      
                      {/* Delete Button (Only visible in Edit Mode on hover) */}
                      {isEditing && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                          <Button variant="destructive" size="icon" className="h-7 w-7 rounded-full shadow-md" onClick={() => deleteBenefit(benefit.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Add Custom Request Button */}
              {isEditing && (
                <div className="p-6 flex justify-center">
                  <Button variant="outline" className="border-dashed border-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 gap-2 rounded-xl" onClick={addCustomBenefit}>
                    <Plus className="w-4 h-4" /> Add Custom Request
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Timeline (w-96) */}
          <div className="w-full lg:w-96 bg-white dark:bg-slate-900 border-l p-8 flex flex-col overflow-y-auto">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-8 text-center flex items-center justify-center gap-2">
              Milestone Schedule
            </h3>
            
            <div className="flex-1 relative">
              {/* Vertical line connecting milestones */}
              <div className="absolute left-4 top-4 bottom-12 w-px bg-slate-200 dark:bg-slate-700" />
              
              <div className="flex flex-col gap-10">
                {MILESTONES.map((milestone, idx) => {
                  // Find benefits mapped to this milestone that are included in the selected tier
                  const milestoneTasks = benefits.filter(b => b.milestoneId === milestone.id && b.values[selectedTier as keyof typeof b.values] !== '-');

                  return (
                    <div key={milestone.id} className="relative flex gap-4">
                      {/* Circle */}
                      <div className="w-8 h-8 rounded bg-rose-500 text-white flex items-center justify-center text-xs font-bold shrink-0 relative z-10 shadow-sm">
                        {milestone.id}
                      </div>
                      
                      <div className="flex-1 pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h4 className="font-semibold text-rose-500 text-sm">{milestone.title}</h4>
                            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{milestone.subtitle}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-rose-500">{milestone.percent}</span>
                          </div>
                        </div>
                        
                        <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 italic">
                          {milestone.desc}
                        </p>
                        
                        {/* Mapped Tasks */}
                        {milestoneTasks.length > 0 ? (
                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Deliverables:</p>
                            <ul className="space-y-1.5">
                              {milestoneTasks.map(task => (
                                <li key={task.id} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                                  <div className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                                  <span className="font-medium">{task.label}</span>
                                  {typeof task.values[selectedTier as keyof typeof task.values] === 'string' && task.values[selectedTier as keyof typeof task.values] !== 'true' && (
                                    <span className="text-muted-foreground ml-1">({task.values[selectedTier as keyof typeof task.values]})</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-800 border-dashed">
                            <p className="text-xs text-slate-500 text-center italic">No deliverables assigned</p>
                          </div>
                        )}
                      </div>

                      {/* Dotted horizontal separator */}
                      {idx < MILESTONES.length - 1 && (
                        <div className="absolute -bottom-5 left-8 right-0 border-b border-dashed border-slate-200 dark:border-slate-800" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: Summary Bar */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-slate-50 dark:bg-slate-950 border-t flex flex-col md:flex-row items-center justify-between gap-4 z-40">
          
          <div className="flex items-center gap-8 pl-4 w-full">
            {/* Secure Payment Box */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-12 bg-rose-500 rounded-lg flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-rose-500">100% Secure Payments</p>
                <p className="text-[10px] text-muted-foreground max-w-[180px] leading-tight">All payments are secure and 100% refundable.</p>
              </div>
            </div>
            
            <div className="hidden lg:block w-px h-10 bg-slate-200 dark:bg-slate-700 mx-2" />
            
            <div className="hidden md:block">
              <p className="text-xs text-muted-foreground mb-1">Total Package Value</p>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-rose-500">₹</span>
                {isEditing ? (
                  <Input 
                    value={proposedPrice}
                    onChange={(e) => setProposedPrice(e.target.value)}
                    className="w-24 h-8 text-lg font-bold text-rose-500 border-rose-200 focus-visible:ring-rose-500 px-2 bg-white"
                  />
                ) : (
                  <span className="text-xl font-bold text-rose-500">{proposedPrice}</span>
                )}
              </div>
            </div>
            
            <div className="hidden lg:block w-px h-10 bg-slate-200 dark:bg-slate-700 mx-2" />
            
            <div className="hidden xl:block">
              <p className="text-xs text-muted-foreground mb-1">All Payments</p>
              <p className="text-sm font-medium text-rose-500">To be completed before the event</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pr-4 shrink-0">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-full px-6 border-slate-300">Cancel</Button>
                <Button onClick={() => { setIsEditing(false); setIsCustomized(true); }} className="rounded-full px-8 bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20">Save Edits</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditing(true)} className="rounded-full px-6">Edit Package</Button>
                <Button onClick={handleProceed} className="rounded-full px-8 bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20">{isCustomized ? "Proceed to Chat" : "Request to Sponsor"}</Button>
              </>
            )}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
