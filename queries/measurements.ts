import { useQuery } from "@tanstack/react-query";

import { getMeasurements } from "@/actions/measurements";

export const useMeasurement = (
  deviceId: string,
  unit: string,
  channel: number,
  period: number
) => {
  const { data: measurements, error } = useQuery({
    queryKey: ["measurements", { deviceId, unit, channel }],
    queryFn: async () =>
      await getMeasurements({
        device_id: deviceId,
        unit: unit,
        channel: channel,
        period: period,
      }),
    refetchInterval: 5000,
  });

  return {
    measurement: measurements?.data || null,
    error: error,
    loading: !measurements && !error,
  };
};
