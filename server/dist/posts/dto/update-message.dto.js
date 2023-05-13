"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_post_dto_1 = require("./create-post.dto");
class UpdateMessageDto extends (0, swagger_1.PickType)(create_post_dto_1.CreateMessageDto, [
    "content",
    "filterId",
]) {
}
exports.UpdateMessageDto = UpdateMessageDto;
//# sourceMappingURL=update-message.dto.js.map