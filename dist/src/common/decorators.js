"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPaginatedResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("./dto/pagination.dto");
const ApiPaginatedResponse = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(pagination_dto_1.PaginationDto, model), (0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(pagination_dto_1.PaginationDto) },
                {
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: (0, swagger_1.getSchemaPath)(model) },
                        },
                    },
                },
            ],
        },
    }));
};
exports.ApiPaginatedResponse = ApiPaginatedResponse;
//# sourceMappingURL=decorators.js.map