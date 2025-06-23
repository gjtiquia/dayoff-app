import { Hono } from "hono";

export interface TimeBlock {
    hr: number;
    min: number;
}

export interface HourBlock {
    start: TimeBlock;
    end: TimeBlock;
}

export interface DaySchedule {
    day: string;
    hourBlocks: HourBlock[];
}

export interface WeeklySchedule {
    schedule: DaySchedule[];
}

const app = new Hono()
    .get("/schedule", (c) => {

        // Mock schedule data - in a real app, this would come from a database
        const scheduleData: WeeklySchedule = {
            schedule: [
                { day: 'Mon', hourBlocks: [{ start: { hr: 11, min: 0 }, end: { hr: 18, min: 0 } }] },
                { day: 'Wed', hourBlocks: [{ start: { hr: 10, min: 0 }, end: { hr: 18, min: 0 } }] },
                { day: 'Thu', hourBlocks: [{ start: { hr: 10, min: 0 }, end: { hr: 18, min: 0 } }] },
                { day: 'Fri', hourBlocks: [{ start: { hr: 9, min: 0 }, end: { hr: 18, min: 0 } }] },
                { day: 'Sat', hourBlocks: [{ start: { hr: 9, min: 0 }, end: { hr: 16, min: 30 } }] }
            ]
        };

        return c.json(scheduleData);
    });


export default app; 