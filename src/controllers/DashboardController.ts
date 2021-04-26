import { Request, Response } from 'express';
import { HttpStatusCodesEnum } from '@enums/HttpStatusCodesEnum';
import { DashboardData } from '@models/dashboard/DashboardData';
import DashboardService from '@services/DashboardService';

class DashboardController {
  async getData(req: Request, res: Response): Promise<Response<DashboardData>> {
    try {
      const data: DashboardData = await DashboardService.getData();
      return res.status(HttpStatusCodesEnum.OK).json(data);
    } catch (error) {
      console.error(error);
      return res.status(error?.httpStatusCode).json(error);
    }
  }
}

export default new DashboardController();