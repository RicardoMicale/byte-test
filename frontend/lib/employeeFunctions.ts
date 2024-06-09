export const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return 'Disponible';
    case 1:
      return 'Vacaciones';
    case 2:
      return 'No disponible';
    case 3:
      return 'Enfermo';
    default:
      break;
  }
};
