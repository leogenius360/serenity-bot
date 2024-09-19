interface ResourceProps {
    tags: string[];
    type: "text" | "document" | "audio" | "video" | "other";
    fileUrl: string;
    description: string;
}

export class Resource {
    id!: string;
    tags: string[];
    type: "text" | "document" | "audio" | "video" | "other";
    fileUrl?: string;
    description?: string;
    date!: Date;

    constructor({ tags, type, fileUrl, description }: ResourceProps) {
        this._validate({ tags, type, fileUrl, description });
        this.tags = tags;
        this.type = type;
        this.fileUrl = fileUrl;
        this.description = description;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _validate({ tags, type, fileUrl, description }: ResourceProps) {
        if (type === "text" && !description) {
            throw Error("A resource of type `text` must provide a description");
        }
        if (type !== "text" && !fileUrl) {
            throw Error(`A resource of type '${type}' must provide a fileUrl`);
        }
    }
}
