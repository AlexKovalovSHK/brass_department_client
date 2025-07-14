export function getDefaultRoute(roles: string[]): string {
  if (roles.includes('SUPER_ADMINISTRATOR')) {
    return '/super';
  }
  if (roles.includes('ADMINISTRATOR')) {
    return '/cabinet';
  }
  if (roles.includes('USER')) {
    return '/user';
  }
  // Запасной вариант, если у пользователя нет ожидаемых ролей
  return '/';
}