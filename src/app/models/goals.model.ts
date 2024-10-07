export type ActiveModal = 'activityForm' | 'goalCompleted' | 'deleteGoal' | null

export interface NewGoal {
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    km: number,
    image?: string
}

export interface GoalActivity {
    date: Date,
    km: number
}

export interface Goal {
    id: string,
    userId: string,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    km: number,
    image?: string,
    completed: boolean,
}

export interface GoalWithExtraDetails extends Goal {
    daysToEnd: number;
    goalTotal: number;
    goalProgress: number;
}