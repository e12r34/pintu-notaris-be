import { DtoKonditeFindAllRequest } from "./kondite.dto";

export function generateCacheKey(userId: string, id?: string, body?:DtoKonditeFindAllRequest): string {
    var output
    id ? output=`data:${userId}:${id}` : output=`data:${userId}`;
    if (body) {
        output+=`:pageIndex${body.pageIndex}:pageSize${body.pageSize}`
        body.stringPencarian? output+=`:${body.stringPencarian}`:null
        body.sortBy? output+=`:${body.sortBy}`:null        
    }
    return output
}

export function generateCacheKeyCuti(userId: string, id?: string, body?:DtoKonditeFindAllRequest): string {
    var output
    id ? output=`cuti:${userId}:${id}` : output=`data:${userId}`;
    if (body) {
        output+=`:pageIndex${body.pageIndex}:pageSize${body.pageSize}`
        body.stringPencarian? output+=`:${body.stringPencarian}`:null
        body.sortBy? output+=`:${body.sortBy}`:null        
    }
    return output
}