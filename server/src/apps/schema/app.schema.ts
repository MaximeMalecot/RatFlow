import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type AppDocument = HydratedDocument<App>;

@Schema()
export class App {
    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        default: function genUUID() {
            return uuidv4();
        },
        unique: true,
    })
    appSecret: string;

    @Prop({
        type: Array<String>,
        default: [],
    })
    origins: string[];

    @Prop({
        type: Types.ObjectId,
        ref: "owner",
    })
    owner: string;

    @Prop({
        type: [{ type: Types.ObjectId, ref: "users" }],
        default: [],
    })
    users: [string];
}

export const AppSchema = SchemaFactory.createForClass(App);
