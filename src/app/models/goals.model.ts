export type ActiveModal = 'activityForm' | 'goalCompleted' | null

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
    userId: string,
    id: string,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    km: number,
    image?: string,
    activities: GoalActivity[]
}

export interface GoalWithExtraDetails extends Goal {
    daysToEnd: number;
    goalTotal: number;
    goalProgress: number;
    complete: boolean
}