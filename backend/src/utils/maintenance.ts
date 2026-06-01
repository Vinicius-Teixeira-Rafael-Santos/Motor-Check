export function calculateNextMaintenance(
  currentKm: number,
  usageType: string,
  type: any
) {
  let intervalKm = 0;

  if (usageType === 'leve') {
    intervalKm = type.recommendedKmLight;
  }

  if (usageType === 'moderado') {
    intervalKm = type.recommendedKmModerate;
  }

  if (usageType === 'intenso') {
    intervalKm = type.recommendedKmHeavy;
  }

  const nextKm = currentKm + intervalKm;

  const nextDate = new Date();

  nextDate.setDate(
    nextDate.getDate() + type.recommendedDays
  );

  return {
    nextKm,
    nextDate,
  };
}