// async function setPlayerActive(
//   roomId: string,
//   userId: string,
//   active: boolean
// ) {
//   return redis.hSet(`room:${roomId}:players`, {
//     [`${userId}:active`]: active ? 1 : 0,
//   });
// }

// async function expirePlayerFields(roomId: string, userId: string, ttl: number) {
//   return redis.expire(`room:${roomId}:players`, ttl);
// }

// async function deletePlayer(roomId: string, userId: string) {
//   return redis.hDel(`room:${roomId}:players`, [
//     `${userId}:id`,
//     `${userId}:active`,
//     `${userId}:name`,
//     `${userId}:verified`,
//   ]);
// }

export function unflatten(flat: Record<string, string>) {
  const result: any = {};
  for (const key in flat) {
    const value = flat[key];
    const keys = key.split(":");
    let current = result;
    while (keys.length > 1) {
      const part = keys.shift()!;
      current[part] ??= {};
      current = current[part];
    }
    current[keys[0]] = isNaN(Number(value)) ? value : Number(value);
  }
  return result;
}
