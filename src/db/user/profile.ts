
interface UserStoryProps {
    userId: string;
    tags: string[];
    details: string;
}

export class UserStory {
    id!: string;  // To be generated during save
    userId: string;
    tags: string[];
    details: string;
    date!: Date  // To be generated during save

    constructor({ userId, tags, details }: UserStoryProps) {
        this.userId = userId
        this.tags = tags
        this.details = details
    }
}

export interface UserActivity {
    label: string;
    duration: number;  // Duration in seconds
    timestamp: Date;  // The date and time this activity took place
}

export class UserProfile {
    id!: string;  // To be generated during save
    username: string;
    profession?: string;
    hobbies?: string[];
    recentStories?: UserStory[]
    recentActivities?: UserActivity[]
    frequentActivities?: UserActivity[]

    constructor({ username }: { username: string }) {
        this.username = username
    }
}