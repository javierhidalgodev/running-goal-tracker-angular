import { Goal } from "@models/goals.model";

export const mockGoals: Goal[] = [
    {
        id: "1",
        userId: "101",
        name: 'Run 1000 km',
        description: 'Complete 1000 km by the end of the year',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        km: 1000,
        completed: false
    },
    {
        id: "2",
        userId: "101",
        name: 'Run 5 marathons',
        description: 'Participate in 5 marathons this year',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-12-31'),
        km: 210,
        image: 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg',
        completed: false
    },
    {
        id: "3",
        userId: "102",
        name: 'Run 500 km',
        description: 'Achieve 500 km by mid-year',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-06-30'),
        km: 500,
        image: 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg',
        completed: false
    },
    {
        id: "4",
        userId: "103",
        name: 'Run 10k every week',
        description: 'Maintain a weekly running habit',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        km: 520, // 10 km * 52 weeks
        image: 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg',
        completed: false
    },
    {
        id: "5",
        userId: "104",
        name: 'Trail Running Challenge',
        description: 'Participate in 3 trail running events',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-11-01'),
        km: 120,
        image: 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg',
        completed: false
    },
    {
        id: "6",
        userId: "105",
        name: 'Run a Half Marathon',
        description: 'Prepare for and run a half marathon',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-04-15'),
        km: 21,
        image: 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg',
        completed: false
    },
    {
        id: "7",
        userId: "106",
        name: 'Run 300 km',
        description: 'Cover 300 km in 3 months',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-06-30'),
        km: 300,
        image: 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg',
        completed: false
    },
    {
        id: "8",
        userId: "107",
        name: 'Run a 10k race',
        description: 'Participate in a local 10k race',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-04-01'),
        km: 10,
        image: 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg',
        completed: false
    },
    {
        id: "9",
        userId: "101",
        name: 'Complete a marathon',
        description: 'Run a full marathon within the year',
        startDate: new Date('2024-05-01'),
        endDate: new Date('2024-12-01'),
        km: 42,
        image: 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg',
        completed: false
    },
    {
        id: "10",
        userId: "108",
        name: 'Run a 5k with family',
        description: 'Encourage family members to run a 5k together',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-06-15'),
        km: 5,
        image: 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg',
        completed: false
    }
];
