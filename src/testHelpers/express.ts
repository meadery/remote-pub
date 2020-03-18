import { Request, Response } from "express";

export const mockRequest = (sessionData: any = null, body: any = null): Request => ({
    // @ts-ignore
    session: { data: sessionData },
    body
});

export const mockResponse = () => {
    // @ts-ignore
    const res: Response = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.render = jest.fn().mockReturnValue(res);
    return res;
};
