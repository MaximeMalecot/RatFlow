import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type AnalyticDocument = HydratedDocument<Analytic>;

@Schema()
export class Analytic {
    @Prop({
        type: String,
    })
    clientId?: string;

    @Prop({
        type: String,
    })
    sessionId?: string;

    @Prop({
        type: String,
    })
    service?: string;

    @Prop({
        type: String,
        required: true,
    })
    eventName: string;

    @Prop({
        type: String,
        required: true,
    })
    url: string;

    @Prop({
        type: String,
    })
    userAgent?: string;

    @Prop({
        type: String,
    })
    ip?: string;

    @Prop({
        type: Date,
    })
    date: Date;

    @Prop({
        type: Object,
    })
    customData?: object;

    @Prop({
        type: Types.ObjectId,
        ref: "app",
    })
    appId: string;

    @Prop({
        type: Types.ObjectId,
        ref: "user",
    })
    tagId: string;
}

export const AnalyticSchema = SchemaFactory.createForClass(Analytic);
