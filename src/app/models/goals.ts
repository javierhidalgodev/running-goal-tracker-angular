import { Goal } from "../services/goal.service"

export type ActiveModal = 'activityForm' | 'goalCompleted' | null

export interface GoalWithExtraDetails extends Goal {
    daysToEnd: number;
    goalTotal: number;
    goalProgress: number;
    complete: boolean
}