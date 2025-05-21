export declare class AppService {
    getHello(): string;
    handleFileUpload(file: Express.Multer.File): {
        message: string;
        filePath: string;
    };
}
