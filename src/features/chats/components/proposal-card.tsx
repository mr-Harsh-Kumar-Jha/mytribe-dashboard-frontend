import { IconCheck, IconFileSignature } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { toast } from '@/hooks/use-toast';

export function ProposalCard() {
  const navigate = useNavigate();

  const handleCreateMoU = () => {
    toast({
      title: "MoU Generation Started",
      description: "Routing to the MoU digital signature workflow...",
    });
    navigate({ to: '/mous' });
  };

  return (
    <div className='bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 rounded-xl shadow-lg overflow-hidden w-full'>
      {/* Card Header */}
      <div className='bg-rose-50 dark:bg-rose-950/30 p-4 border-b border-rose-100 dark:border-rose-900/50 flex justify-between items-center'>
        <div>
          <p className='text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1'>Custom Sponsorship Proposal</p>
          <h3 className='font-bold text-slate-800 dark:text-slate-100'>Tech Summit 2026</h3>
        </div>
        <div className='text-right'>
          <p className='text-[10px] text-muted-foreground font-semibold mb-1'>Proposed Value</p>
          <p className='font-bold text-rose-600'>₹60,000</p>
        </div>
      </div>
      
      {/* Card Body (Requested Edits) */}
      <div className='p-4'>
        <p className='text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3'>Requested Changes to Gold Package:</p>
        <ul className='space-y-2 mb-4'>
          <li className='flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400'>
            <IconCheck size={16} className='text-emerald-500 shrink-0 mt-0.5' />
            <span>Increased Event Passes from <strong>6</strong> to <strong>10</strong> <span className='text-[10px] text-muted-foreground ml-1'>(Milestone M1)</span></span>
          </li>
          <li className='flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400'>
            <IconCheck size={16} className='text-emerald-500 shrink-0 mt-0.5' />
            <span>Upgraded Booth Space to <strong>Premium (6x6m)</strong> <span className='text-[10px] text-muted-foreground ml-1'>(Milestone M1)</span></span>
          </li>
          <li className='flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400'>
            <IconCheck size={16} className='text-emerald-500 shrink-0 mt-0.5' />
            <span>Custom Request: <strong>VIP Dinner Access</strong> <span className='text-[10px] text-muted-foreground ml-1'>(Milestone M2)</span></span>
          </li>
        </ul>
        
        <div className='bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 text-xs text-muted-foreground mb-4'>
          Status: Pending Organizer Review
        </div>

        {/* Organizer Action Button (For Demo Purposes) */}
        <div className='pt-4 border-t border-slate-100 dark:border-slate-800'>
          <p className='text-[10px] text-center text-muted-foreground mb-2'>If conditions are agreed upon by the organizer:</p>
          <Button 
            onClick={handleCreateMoU} 
            className='w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 shadow-md gap-2 transition-transform hover:scale-[1.02]'
          >
            <IconFileSignature size={18} />
            Accept Proposal & Create MoU
          </Button>
        </div>
      </div>
    </div>
  );
}
