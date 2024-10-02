export interface NewActivity {
    km: number,
    date: Date
}

export interface Activity extends NewActivity {
    goalId: string,
    added: Date
}

export interface ActivityFromDBJSON extends Activity {
    id: string
}