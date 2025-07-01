import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
declare const validator: (schema: ObjectSchema<any>) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default validator;
//# sourceMappingURL=validator.middleware.d.ts.map