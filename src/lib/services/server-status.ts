/**
 * Server status data type
 */
export type ServerStatus = {
  cpuLoad: number;       // CPU load percentage (0-100)
  memoryUsage: number;   // Memory usage percentage (0-100)
  activeUsers: number;   // Number of active users
  queueLength: number;   // Length of application queue
  responseTime: number;  // Average response time in ms
  uptime: number;        // Server uptime in hours
  timestamp: string;     // Last updated timestamp
  status: 'normal' | 'high' | 'critical'; // Overall status
  maintenanceMode: boolean; // Whether server is in maintenance mode
};

/**
 * Server status history data
 */
export type ServerStatusHistory = {
  timestamps: string[];
  cpuLoads: number[];
  memoryUsages: number[];
  activeUsers: number[];
  responseTimeAvg: number[];
};

// Generate realistic random value between min and max with a tendency towards a target value
function generateWeightedRandom(min: number, max: number, target: number, weight: number = 0.7): number {
  const random = Math.random();
  const weighted = random * (1 - weight) + target / max * weight;
  return Math.min(max, Math.max(min, Math.round(weighted * (max - min) + min)));
}

// Generate server status data with some realistic fluctuations
function generateServerStatus(): ServerStatus {
  // Time of day affects load - busier during work hours
  const now = new Date();
  const hour = now.getHours();
  const isWorkHours = hour >= 9 && hour <= 17;
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  
  // Base values affected by time of day and weekday/weekend
  const baseLoad = isWorkHours ? (isWeekend ? 40 : 70) : 30;
  const baseUsers = isWorkHours ? (isWeekend ? 200 : 800) : 150;
  const baseQueue = isWorkHours ? (isWeekend ? 15 : 40) : 10;
  
  // Generate load with some randomness
  const cpuLoad = generateWeightedRandom(5, 95, baseLoad);
  const memoryUsage = generateWeightedRandom(20, 90, baseLoad * 0.8);
  const activeUsers = generateWeightedRandom(50, 2000, baseUsers);
  const queueLength = generateWeightedRandom(0, 100, baseQueue);
  
  // Response time increases with load
  const loadFactor = (cpuLoad + memoryUsage) / 200; // 0 to 1
  const responseTime = generateWeightedRandom(50, 500, 100 + 300 * loadFactor);
  
  // Determine overall status based on metrics
  let status: 'normal' | 'high' | 'critical' = 'normal';
  if (cpuLoad > 85 || memoryUsage > 80 || responseTime > 300) {
    status = 'critical';
  } else if (cpuLoad > 70 || memoryUsage > 65 || responseTime > 200) {
    status = 'high';
  }
  
  // Random uptime between 1 and 30 days (in hours)
  const uptime = Math.floor(24 * (1 + Math.random() * 29));
  
  // Very small chance of maintenance mode
  const maintenanceMode = Math.random() < 0.01;
  
  return {
    cpuLoad,
    memoryUsage,
    activeUsers,
    queueLength,
    responseTime,
    uptime,
    timestamp: now.toISOString(),
    status: maintenanceMode ? 'critical' : status,
    maintenanceMode
  };
}

// Store history data for charts
let statusHistory: ServerStatusHistory = {
  timestamps: [],
  cpuLoads: [],
  memoryUsages: [],
  activeUsers: [],
  responseTimeAvg: []
};

// Initialize with some historical data
function initializeHistory() {
  const now = new Date();
  const historyLength = 24; // 24 data points
  
  for (let i = historyLength - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000); // hourly data points
    const status = generateServerStatus();
    
    statusHistory.timestamps.push(time.toISOString());
    statusHistory.cpuLoads.push(status.cpuLoad);
    statusHistory.memoryUsages.push(status.memoryUsage);
    statusHistory.activeUsers.push(status.activeUsers);
    statusHistory.responseTimeAvg.push(status.responseTime);
  }
}

// Initialize history on module load
initializeHistory();

/**
 * Get current server status
 * @returns Current server status data
 */
export async function getServerStatus(): Promise<ServerStatus> {
  // In a real implementation, this would fetch data from a monitoring API
  // For demo purposes, we'll generate random data
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return generateServerStatus();
}

/**
 * Get server status history for charts
 * @returns Historical server status data
 */
export async function getServerStatusHistory(): Promise<ServerStatusHistory> {
  // In a real implementation, this would fetch historical data from a monitoring API
  // For demo purposes, we'll return our stored history
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return { ...statusHistory };
}

/**
 * Update server status history with new data point
 * @param status New status data
 */
export function updateStatusHistory(status: ServerStatus) {
  // Add new data point
  statusHistory.timestamps.push(status.timestamp);
  statusHistory.cpuLoads.push(status.cpuLoad);
  statusHistory.memoryUsages.push(status.memoryUsage);
  statusHistory.activeUsers.push(status.activeUsers);
  statusHistory.responseTimeAvg.push(status.responseTime);
  
  // Keep only last 24 data points
  if (statusHistory.timestamps.length > 24) {
    statusHistory.timestamps.shift();
    statusHistory.cpuLoads.shift();
    statusHistory.memoryUsages.shift();
    statusHistory.activeUsers.shift();
    statusHistory.responseTimeAvg.shift();
  }
}

/**
 * Check if the server is currently under high load
 * @returns True if server is under high load
 */
export function isServerUnderHighLoad(): boolean {
  const latestIndex = statusHistory.cpuLoads.length - 1;
  if (latestIndex < 0) return false;
  
  // Check recent average CPU load
  const recentLoads = statusHistory.cpuLoads.slice(-3);
  const avgLoad = recentLoads.reduce((sum, load) => sum + load, 0) / recentLoads.length;
  
  return avgLoad > 75;
} 