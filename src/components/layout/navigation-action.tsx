import { Plus } from 'lucide-react'
import { ActionTooltip } from '../ui/action-tootip'

export const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a Server">
        <button className="group flex h-12 w-12 rounded-full hover:rounded-2xl overflow-hidden items-center justify-center bg-background border border-input hover:border-0 hover:bg-primary transition-all">
          <Plus className="group-hover:text-primary-foreground" />
        </button>
      </ActionTooltip>
    </div>
  )
}
