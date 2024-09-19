interface ChatHistoryProps {
    user: string;
    bot: string;
    tags?: string[];
    userReaction?: "Like" | "Unlike";
}

export class ChatHistory {
    id!: string; // To be generated during save
    user: string;
    bot: string;
    tags?: string[];
    userReaction?: "Like" | "Unlike";
    date!: Date; // To be generated during save

    constructor({ user, bot, tags, userReaction }: ChatHistoryProps) {
        this.user = user;
        this.bot = bot;
        this.tags = tags;
        this.userReaction = userReaction;
    }
}
