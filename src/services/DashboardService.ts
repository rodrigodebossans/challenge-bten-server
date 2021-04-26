import { DashboardData } from '@models/dashboard/DashboardData';

class DashboardService {
  async getData(): Promise<DashboardData> {
    return {
      unresolved: 125,
      overdue: 230,
      open: 600,
      onHold: 350,
      trends: {
        updatedAt: new Date(),
        resolved: 600,
        received: 426,
        avgFirstResponseTime: '33m',
        avgResponseTime: '3h 8m',
        resolutionWithinSLA: 0.94,
        graph: {
          data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
              {
                label: 'First Dataset',
                data: [1500, 1200, 1400, 1300],
                fill: true,
                borderColor: '#007a7c',
                backgroundColor: '#007a7c8e',
              },
            ],
          },
        },
      },
    };
  }
}

export default new DashboardService();