import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TagDocument = HydratedDocument<Tag>;

@Schema()
export class Tag {
    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: Date,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        type: Date,
    })
    updatedAt: Date;

    @Prop({
        type: Types.ObjectId,
        ref: "app",
    })
    appId: string;

    @Prop({
        type: [{ type: Types.ObjectId, ref: "analytics" }],
        default: [],
    })
    analytics: [string];
}

export const TagSchema = SchemaFactory.createForClass(Tag);
