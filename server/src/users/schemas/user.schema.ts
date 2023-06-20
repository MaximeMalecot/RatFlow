import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}

@Schema()
export class User {
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        select: false,
    })
    password: string;

    @Prop({
        type: Date,
        required: true,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        type: Date,
    })
    updatedAt: Date;

    @Prop({
        default: [Role.USER],
    })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
