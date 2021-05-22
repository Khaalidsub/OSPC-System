import { registerEnumType } from "@nestjs/graphql";

export enum Sort {
    asc = 1,
    desc = -1,
}

registerEnumType(Sort,{ name: 'Sort'})