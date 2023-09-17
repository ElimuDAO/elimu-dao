export function generateUniqueId(): string {
  const timestamp: number = Date.now();
  const random: number = Math.floor(Math.random() * 10000);
  const uniqueId: string = `${timestamp}-${random}`;
  return uniqueId;
}
